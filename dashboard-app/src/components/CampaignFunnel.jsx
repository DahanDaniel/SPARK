import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Filter } from 'lucide-react';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[var(--color-bento-card)] border border-[var(--color-glass-border)] p-3 rounded-lg shadow-xl">
                <p className="text-[var(--color-text-primary)] font-semibold mb-1">{payload[0].payload.name}</p>
                <p className="text-[var(--color-spark-gold)] font-bold text-lg">{payload[0].value.toLocaleString('pl-PL')}</p>
            </div>
        );
    }
    return null;
};

const CampaignFunnel = ({ funnelData }) => {
    if (!funnelData) return null;

    const data = [
        { name: 'Wysłane', value: funnelData.sent, color: '#3B82F6' },
        { name: 'Otwarte', value: funnelData.opened, color: '#6366F1' },
        { name: 'Kliknięte', value: funnelData.clicked, color: '#8B5CF6' },
        { name: 'Leady', value: funnelData.leads, color: '#10B981' },
        { name: 'Golden Leady', value: funnelData.goldenLeads, color: '#D4AF37' }
    ];

    return (
        <div className="bento-card p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-accent-purple" />
                <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Lejek Konwersji</h3>
            </div>
            
            <div className="w-full" style={{ height: '260px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 40, bottom: 20 }}
                    >
                        <defs>
                            <linearGradient id="colorFunnel" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8}/>
                                <stop offset="100%" stopColor="#8B5CF6" stopOpacity={1}/>
                            </linearGradient>
                        </defs>
                        <XAxis type="number" hide />
                        <YAxis 
                            dataKey="name" 
                            type="category" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }}
                            width={100}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{fill: 'var(--color-glass-bg)'}} />
                        <Bar dataKey="value" minPointSize={5} radius={[4, 4, 4, 4]} barSize={24}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CampaignFunnel;
