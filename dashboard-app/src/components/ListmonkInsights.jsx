import { Activity, AlertTriangle } from 'lucide-react';

const ListmonkInsights = ({ listmonkData }) => {
    if (!listmonkData) return null;

    return (
        <div className="bento-card p-6 h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-accent-blue" />
                    <h3 className="text-lg font-serif text-[var(--color-text-primary)]">Live Tracker</h3>
                </div>
                {/* Alert widget inside the corner */}
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border 
                    ${listmonkData.bounceRate > 3 ? 'bg-red-500/10 text-red-500 border-red-500/30' : 'bg-green-500/10 text-green-400 border-green-500/30'}`}>
                    <AlertTriangle className="w-3 h-3" />
                    Obicia (Bounces): {listmonkData.bounceRate}%
                </div>
            </div>

            <div className="overflow-x-auto flex-1">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-text-secondary uppercase bg-[var(--color-glass-bg)]">
                        <tr>
                            <th className="px-4 py-3 rounded-tl-lg">Kampania</th>
                            <th className="px-4 py-3">Baza</th>
                            <th className="px-4 py-3 text-accent-purple">OR</th>
                            <th className="px-4 py-3 text-accent-blue">CTR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listmonkData.recentCampaigns.map((camp) => (
                            <tr key={camp.id} className="border-b border-[var(--color-glass-border)] hover:bg-[var(--color-glass-bg)] transition-colors">
                                <td className="px-4 py-4 font-medium text-[var(--color-text-primary)]">{camp.name}</td>
                                <td className="px-4 py-4 text-text-secondary">{(camp.sent || 0).toLocaleString('pl-PL')}</td>
                                <td className="px-4 py-4 font-semibold text-accent-purple">{camp.openRate}%</td>
                                <td className="px-4 py-4 font-semibold text-accent-blue">{camp.clickRate}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {listmonkData.recentCampaigns.length === 0 && (
                <div className="flex-1 flex items-center justify-center text-text-secondary">Brak danych o najnowszych kampaniach</div>
            )}
        </div>
    );
};

export default ListmonkInsights;
