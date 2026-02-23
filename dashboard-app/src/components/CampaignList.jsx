import { Mail, Search, CheckSquare, Square } from 'lucide-react';
import { useState } from 'react';

const CampaignList = ({ campaigns, selectedCampaignIds, onSelectionChange, filters }) => {
    const [searchQuery, setSearchQuery] = useState('');

    if (!campaigns || campaigns.length === 0) return null;

    const filtered = campaigns.filter(c => {
        // 1. Local Search Filter
        const searchMatch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            c.project.toLowerCase().includes(searchQuery.toLowerCase());
        
        // 2. Global Filters (Project, Status, Date)
        const { project, status, startDate, endDate } = filters || {};
        
        const projectMatch = !project || project === 'All' || c.project === project;
        
        let statusMatch = true;
        if (status && status !== 'All') {
            if (status === 'finished,running') {
                statusMatch = c.status === 'finished' || c.status === 'running';
            } else {
                statusMatch = c.status === status;
            }
        }
        
        const sTime = startDate ? startDate.setHours(0,0,0,0) : null;
        const eTime = endDate ? endDate.setHours(23,59,59,999) : null;
        const dateMatch = (!sTime || c.timestamp >= sTime) && (!eTime || c.timestamp <= eTime);
        
        return searchMatch && projectMatch && statusMatch && dateMatch;
    });

    const allVisibleSelected = filtered.length > 0 && filtered.every(c => selectedCampaignIds.has(c.id));
    const someVisibleSelected = filtered.length > 0 && filtered.some(c => selectedCampaignIds.has(c.id));

    const handleMasterToggle = () => {
        const newSet = new Set(selectedCampaignIds);
        if (allVisibleSelected) {
            filtered.forEach(c => newSet.delete(c.id));
        } else {
            filtered.forEach(c => newSet.add(c.id));
        }
        onSelectionChange(newSet);
    };

    const handleClearEverything = () => {
        onSelectionChange(new Set());
    };

    const toggleCampaign = (id) => {
        const newSet = new Set(selectedCampaignIds);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        onSelectionChange(newSet);
    };

    return (
        <div className="bento-card p-4 sm:p-6 flex flex-col h-[600px] overflow-hidden">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 sm:mb-6 gap-4">
                <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-accent-purple" />
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Filtrowanie Kampanii</h3>
                    <span className="text-xs font-semibold px-2 py-1 bg-[var(--color-glass-bg)] rounded-full text-text-secondary ml-2">
                        {selectedCampaignIds.size} zaznaczonych
                    </span>
                </div>
                
                <div className="flex items-center gap-3 w-full lg:w-auto">
                    <button 
                        onClick={handleClearEverything}
                        className="text-xs text-[var(--color-text-secondary)] hover:text-red-400 transition-colors mr-2 hidden lg:block"
                    >
                        Wyczyść całe zaznaczenie
                    </button>
                    <div className="relative flex-1 lg:flex-none">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                        <input 
                            type="text" 
                            placeholder="Szukaj..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] hover:border-[var(--color-glass-border)] rounded-lg pl-9 pr-4 py-1.5 text-sm text-[var(--color-text-primary)] outline-none w-full lg:w-48 transition-colors"
                        />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto overflow-y-auto flex-1 pr-2 custom-scrollbar">
                <table className="w-full text-sm text-left min-w-[800px]">
                    <thead className="text-xs text-text-secondary uppercase bg-[var(--color-glass-bg)] sticky top-0 backdrop-blur-md z-10">
                        <tr>
                            <th className="px-4 py-3 rounded-tl-lg w-[80px] text-center">
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <span className="text-[10px] leading-tight">WSZYSTKIE</span>
                                    <input 
                                        type="checkbox"
                                        className="w-4 h-4 accent-accent-purple cursor-pointer"
                                        checked={allVisibleSelected}
                                        ref={input => {
                                          if (input) input.indeterminate = someVisibleSelected && !allVisibleSelected;
                                        }}
                                        onChange={handleMasterToggle}
                                        title="Zaznacz/odznacz widoczne"
                                    />
                                </div>
                            </th>
                            <th className="px-4 py-3 w-[160px]">Projekt</th>
                            <th className="px-4 py-3 min-w-[400px]">Nazwa Kampanii</th>
                            <th className="px-4 py-3 w-[100px]">Status</th>
                            <th className="px-4 py-3 w-[100px]">Data</th>
                            <th className="px-4 py-3 text-right w-[100px]">Wysłano</th>
                            <th className="px-4 py-3 text-right text-accent-purple w-[80px]">OR</th>
                            <th className="px-4 py-3 text-right text-accent-blue w-[80px]">CTR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((camp) => {
                            const isChecked = selectedCampaignIds.has(camp.id);
                            
                            return (
                                <tr 
                                    key={camp.id} 
                                    onClick={() => toggleCampaign(camp.id)}
                                    className={`border-b border-[var(--color-glass-border)] cursor-pointer transition-colors ${
                                        isChecked ? 'bg-[var(--color-glass-bg)] hover:bg-[var(--color-glass-bg)]' : 'hover:bg-[var(--color-glass-bg)] opacity-80 hover:opacity-100'
                                    } ${camp.status === 'draft' ? 'opacity-40 grayscale hover:opacity-60' : ''}`}
                                >
                                    <td className="px-4 py-3 text-center">
                                        <input 
                                            type="checkbox" 
                                            checked={isChecked}
                                            readOnly
                                            className="w-4 h-4 accent-accent-purple cursor-pointer"
                                        />
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <span className="px-2 py-1 bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] rounded font-medium text-xs text-spark-gold">
                                            {camp.project}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 font-medium text-[var(--color-text-primary)] truncate max-w-[500px]" title={camp.name}>
                                        {camp.name}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                            camp.status === 'finished' ? 'bg-green-500/10 text-green-400' :
                                            camp.status === 'running' ? 'bg-blue-500/10 text-blue-400' :
                                            'bg-gray-500/10 text-gray-400'
                                        }`}>
                                            {camp.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-text-secondary whitespace-nowrap">
                                        {new Date(camp.date).toLocaleDateString('pl-PL')}
                                    </td>
                                    <td className="px-4 py-3 text-right text-text-secondary">
                                        {camp.sent.toLocaleString('pl-PL')}
                                    </td>
                                    <td className={`px-4 py-3 text-right font-semibold ${camp.openRate > 0 ? 'text-accent-purple' : 'text-text-secondary opacity-40 font-normal'}`}>
                                        {Number(camp.openRate).toFixed(1)}%
                                    </td>
                                    <td className={`px-4 py-3 text-right font-semibold ${camp.clickRate > 0 ? 'text-accent-blue' : 'text-text-secondary opacity-40 font-normal'}`}>
                                        {Number(camp.clickRate).toFixed(1)}%
                                    </td>
                                </tr>
                            );
                        })}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan="8" className="px-4 py-8 text-center text-text-secondary">
                                    Brak kampanii spełniających kryteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
            `}</style>
        </div>
    );
};

export default CampaignList;
