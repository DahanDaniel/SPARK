import { Star, PieChart as PieChartIcon, ExternalLink } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[var(--color-bento-card)] border border-[var(--color-glass-border)] p-2 rounded-lg shadow-xl text-sm">
                <p className="text-[var(--color-text-primary)] font-semibold">{payload[0].name}: <span className="text-[var(--color-spark-gold)]">{payload[0].value}</span></p>
            </div>
        );
    }
    return null;
};

const GoogleSheetsHub = ({ leadsData }) => {
    if (!leadsData) return null;

    // Convert object to array for Recharts
    const statusData = Object.entries(leadsData.statusBreakdown).map(([name, value]) => ({ name, value }));
    const COLORS = ['#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#06B6D4', '#EAB308', '#EF4444'];

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Ostatnie Golden Leady Feed */}
            <div className="bento-card p-6 h-[450px] flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-spark-gold" />
                        <h3 className="text-lg font-serif text-[var(--color-text-primary)]">Najnowsze Sukcesy</h3>
                    </div>
                    <button className="text-xs text-text-secondary hover:text-[var(--color-text-primary)] flex items-center gap-1 transition-colors">
                        Otwórz arkusz <ExternalLink className="w-3 h-3" />
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                    {leadsData.recentGolden.map((lead, idx) => (
                        <div key={idx} className="p-4 bg-gray-900/40 rounded-xl border border-[var(--color-glass-border)] hover:border-spark-gold/30 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-[var(--color-text-primary)] text-md">{lead.company}</h4>
                                <span className="text-xs text-text-secondary">{lead.date}</span>
                            </div>
                            <p className="text-sm text-gray-300 mb-2 font-medium">{lead.person} <span className="text-gray-500 font-normal">({lead.project})</span></p>
                            <p className="text-xs text-gray-400 italic">"{lead.details}"</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Status Breakdown Pie Chart */}
            <div className="bento-card p-6 h-[450px] flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                    <PieChartIcon className="w-5 h-5 text-accent-green" />
                    <h3 className="text-lg font-serif text-[var(--color-text-primary)]">Rozkład Statusów Leadów</h3>
                </div>
                <p className="text-xs text-text-secondary mb-6 pl-7">Na podstawie wszystkich agregowanych arkuszy.</p>
                
                <div className="flex-1 w-full min-h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={statusData}
                                cx="50%"
                                cy="45%"
                                innerRadius={70}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {statusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#9CA3AF' }}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default GoogleSheetsHub;
