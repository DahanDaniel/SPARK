import { useState, useEffect, useMemo } from 'react';
import { LogOut, Sun, Moon } from 'lucide-react';
import api from '../api';
import GlobalFilters from './GlobalFilters';
import ExecutiveSummary from './ExecutiveSummary';
import CampaignFunnel from './CampaignFunnel';
import ListmonkInsights from './ListmonkInsights';
import GoogleSheetsHub from './GoogleSheetsHub';
import CampaignList from './CampaignList';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({ project: 'All', status: 'finished,running', startDate: null, endDate: null });
    const [selectedCampaignIds, setSelectedCampaignIds] = useState(new Set());
    const [isCampaignListExpanded, setIsCampaignListExpanded] = useState(false);
    const [isDark, setIsDark] = useState(true);

    // Apply dark class to document gracefully
    useEffect(() => {
        if (isDark) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [isDark]);

    // Master Sync: ONLY on initial data load, populate default checked campaigns
    useEffect(() => {
        if (!data?.listmonk?.allCampaigns || selectedCampaignIds.size > 0) return;
        
        const matchingIds = new Set();
        data.listmonk.allCampaigns.forEach(c => {
            if (c.status === 'finished' || c.status === 'running') {
                matchingIds.add(c.id);
            }
        });
        setSelectedCampaignIds(matchingIds);
    }, [data]);

    // Contextual Sync: Update selections when filters change, ONLY if the campaign list is closed
    useEffect(() => {
        if (!data?.listmonk?.allCampaigns || isCampaignListExpanded) return;
        
        const { project, status, startDate, endDate } = filters;
        const sTime = startDate ? startDate.setHours(0,0,0,0) : null;
        const eTime = endDate ? endDate.setHours(23,59,59,999) : null;

        const matchingIds = new Set();
        data.listmonk.allCampaigns.forEach(c => {
            const projectMatch = project === 'All' || c.project === project;
            const dateMatch = (!sTime || c.timestamp >= sTime) && (!eTime || c.timestamp <= eTime);
            
            let statusMatch = true;
            if (status === 'finished,running') {
                statusMatch = c.status === 'finished' || c.status === 'running';
            } else if (status !== 'All') {
                statusMatch = c.status === status;
            }

            if (projectMatch && dateMatch && statusMatch) {
                matchingIds.add(c.id);
            }
        });
        
        setSelectedCampaignIds(matchingIds);
    }, [filters, isCampaignListExpanded, data]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await api.get('/api/data/dashboard-data');
                setData(response.data);
            } catch {
                setError('Nie powiodło się pobieranie danych kokpitu.');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const handleLogout = async () => {
        try {
            await api.post('/api/auth/logout');
            window.location.reload();
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    // --- UNIVERSAL FILTERING LOGIC --- //
    const filteredData = useMemo(() => {
        if (!data) return null;

        const { project, startDate, endDate } = filters;
        const sTime = startDate ? startDate.setHours(0,0,0,0) : null;
        const eTime = endDate ? endDate.setHours(23,59,59,999) : null;

        // 1. Filter Campaigns (Determine what goes into the list, and what is active)
        const activeCampaigns = (data.listmonk.allCampaigns || []).filter(c => selectedCampaignIds.has(c.id));

        let totalSent = 0, totalOpened = 0, totalClicked = 0;
        let totalClickTrackedSent = 0;

        activeCampaigns.forEach(c => {
            totalSent += c.sent || 0;
            totalOpened += c.opened || 0;
            totalClicked += c.clicked || 0;
            if (c.clicked > 0 || c.clickRate > 0) {
                totalClickTrackedSent += c.sent || 0;
            }
        });

        // 2. Filter Leads based on active projects associated with the selected campaigns AND their timestamps
        const activeProjects = new Set(activeCampaigns.map(c => c.project));
        
        const filteredLeads = (data.leads.allLeads || []).filter(l => {
            if (activeProjects.size === 0) return false;
            
            const isProjectActive = activeProjects.has(l.project);
            
            // Apply global date filters if set
            const globalDateMatch = (!sTime || l.timestamp >= sTime) && (!eTime || l.timestamp <= eTime);

            return isProjectActive && globalDateMatch;
        });

        // 4. Aggregate Lead Metrics
        // Exclude junk tags from the count to get pure Potential + Golden leads
        let totalLeads = 0, goldenLeads = 0;
        const statusBreakdown = {};
        
        filteredLeads.forEach(l => {
            const lowStatus = (l.status || '').toLowerCase();
            const junkTokens = ['out of office', 'not relevant', 'rodo', 'not delivered', 'duplicate', 'not interested', 'blacklist'];
            const isJunk = junkTokens.some(token => lowStatus.includes(token));
            
            if (!isJunk) {
                totalLeads++;
                statusBreakdown[l.status] = (statusBreakdown[l.status] || 0) + 1;
                
                if (['Interested', 'Follow-up', 'Wycena', 'Negocjacje'].includes(l.status) || lowStatus.includes('interested')) {
                    goldenLeads++;
                }
            }
        });

        // 5. Build recent feeds based on filtered subsets
        const recentCampaigns = [...activeCampaigns].sort((a,b) => b.timestamp - a.timestamp).slice(0, 5);
        const recentGolden = [...filteredLeads]
            .filter(l => ['Interested', 'Follow-up', 'Wycena', 'Negocjacje'].includes(l.status))
            .sort((a,b) => b.timestamp - a.timestamp)
            .slice(0, 5)
            .map(l => ({
                company: 'Ukryte (Prywatność)',
                person: 'Klient',
                project: l.project,
                date: l.date,
                details: 'Lead został przechwycony...',
                timestamp: l.timestamp
            })); 
            // NOTE: the flat allLeads currently doesn't map detailed previews for security bounds,
            // so we map placeholders, or we should fetch it from original raw structure. Let's fallback to original if filter is all.
            const finalRecentGolden = (project === 'All' && !startDate && !endDate && data.leads.recentGolden) 
                 ? data.leads.recentGolden.slice(0, 5) 
                 : recentGolden;


        const rawOpenRate = totalSent > 0 ? (totalOpened / totalSent) * 100 : 0;
        const rawClickRate = totalClickTrackedSent > 0 ? (totalClicked / totalClickTrackedSent) * 100 : 0;
        
        const openRate = rawOpenRate.toFixed(1);
        const clickRate = rawClickRate.toFixed(1);

        return {
            summary: {
                totalSent,
                averageOpenRate: openRate,
                averageClickRate: clickRate,
                totalLeads,
                goldenLeads
            },
            funnel: {
                sent: totalSent,
                opened: totalOpened,
                clicked: totalClicked,
                leads: totalLeads,
                goldenLeads: goldenLeads
            },
            listmonk: {
                recentCampaigns,
                allCampaigns: data.listmonk.allCampaigns, // Pass full list down so the widget handles its own scope
                bounceRate: data?.listmonk?.bounceRate || 0
            },
            leads: {
                recentGolden: finalRecentGolden,
                statusBreakdown
            }
        };

    }, [data, filters, selectedCampaignIds]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--color-bento-bg)] text-[var(--color-text-primary)] font-sans">
                <div className="flex flex-col items-center gap-8">
                    <div className="relative">
                        {/* Outer rotating ring */}
                        <div className="w-16 h-16 rounded-full border-4 border-[var(--color-glass-border)] animate-spin border-t-[var(--color-spark-gold)] shadow-[0_0_15px_rgba(184,134,11,0.2)]"></div>
                        {/* Inner pulsing circle */}
                        <div className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-[var(--color-spark-gold)]/20 animate-pulse backdrop-blur-sm"></div>
                    </div>
                    <div className="text-center flex flex-col gap-2">
                        <h2 className="text-xl sm:text-2xl font-serif text-[var(--color-spark-gold)] tracking-wide">MIND CEO DASHBOARD</h2>
                        <p className="text-xs sm:text-sm text-text-secondary animate-pulse uppercase tracking-widest">Pobieranie Danych Operacyjnych...</p>
                    </div>
                </div>
            </div>
        );
    }
    
    if (error) return <div className="min-h-screen flex items-center justify-center bg-[var(--color-bento-bg)] text-red-500 font-medium">{error}</div>;

    const renderData = filteredData || data;

    return (
        <div className="min-h-screen bg-[var(--color-bento-bg)] text-[var(--color-text-primary)] font-sans">
            <div className="w-full mx-auto px-2 py-4 sm:p-4 lg:p-8 xl:px-12 2xl:px-16">
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8 px-2 sm:px-0">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-serif text-[var(--color-spark-gold)] tracking-wide">MIND CEO DASHBOARD</h1>
                        <p className="text-xs sm:text-sm text-text-secondary mt-1">Przegląd Operacyjny i Skuteczność Kampanii</p>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end">
                        <button 
                            onClick={() => setIsDark(!isDark)}
                            className="flex items-center gap-2 text-text-secondary hover:text-[var(--color-spark-gold)] transition-colors"
                            title="Zmień motyw"
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <button 
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-text-secondary hover:text-[var(--color-text-primary)] transition-colors text-sm font-medium"
                        >
                            <LogOut className="w-4 h-4" />
                            Wyloguj
                        </button>
                    </div>
                </header>

                <div className="space-y-4 mb-6">
                    <GlobalFilters 
                        filters={filters} 
                        setFilters={setFilters} 
                        campaigns={renderData?.listmonk?.allCampaigns}
                        selectedCampaignIds={selectedCampaignIds}
                        onSelectionChange={setSelectedCampaignIds}
                        isExpanded={isCampaignListExpanded}
                        setIsExpanded={setIsCampaignListExpanded}
                    />
                </div>
                
                <main className="space-y-4 sm:space-y-6">
                    <ExecutiveSummary summary={renderData?.summary} />

                    <CampaignFunnel funnelData={renderData?.funnel} />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
