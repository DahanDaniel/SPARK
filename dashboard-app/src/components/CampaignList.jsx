import { Mail, Search, CheckSquare, Square } from 'lucide-react';
import { useState } from 'react';

const CampaignList = ({ campaigns, selectedCampaignIds, onSelectionChange, currentStatusFilter }) => {
    const [searchQuery, setSearchQuery] = useState('');

    if (!campaigns || campaigns.length === 0) return null;

    const filtered = campaigns.filter(c => {
        const searchMatch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            c.project.toLowerCase().includes(searchQuery.toLowerCase());
        
        let statusMatch = true;
        if (currentStatusFilter && currentStatusFilter !== 'All') {
            if (currentStatusFilter === 'finished,running') {
                statusMatch = c.status === 'finished' || c.status === 'running';
            } else {
                statusMatch = c.status === currentStatusFilter;
            }
        }
        
        return searchMatch && statusMatch;
    });

    const handleSelectAll = () => {
        const newSet = new Set(selectedCampaignIds);
        filtered.forEach(c => newSet.add(c.id));
        onSelectionChange(newSet);
    };

    const handleDeselectAll = () => {
        const newSet = new Set(selectedCampaignIds);
        filtered.forEach(c => newSet.delete(c.id));
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
        <div className="bento-card p-6 flex flex-col h-[600px]">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
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
                            <th className="px-4 py-3 rounded-tl-lg w-[100px] text-center">
                                <div className="mb-2">Zaznacz</div>
                                <div className="flex justify-center gap-2">
                                    <button onClick={handleSelectAll} className="p-1 hover:text-[var(--color-text-primary)] transition-colors" title="Zaznacz widoczne"><CheckSquare className="w-4 h-4" /></button>
                                    <button onClick={handleDeselectAll} className="p-1 hover:text-[var(--color-text-primary)] transition-colors" title="Odznacz widoczne"><Square className="w-4 h-4" /></button>
                                </div>
                            </th>
                            <th className="px-4 py-3">Projekt</th>
                            <th className="px-4 py-3">Nazwa Kampanii</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Data</th>
                            <th className="px-4 py-3 text-right">Wysłano</th>
                            <th className="px-4 py-3 text-right text-accent-purple">OR</th>
                            <th className="px-4 py-3 text-right text-accent-blue">CTR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((camp) => {
                            const isChecked = selectedCampaignIds.has(camp.id);
                            const isInactive = camp.clicked === 0 && camp.clickRate === 0 && camp.opened === 0 && camp.openRate === 0;
                            return (
                                <tr 
                                    key={camp.id} 
                                    onClick={() => toggleCampaign(camp.id)}
                                    className={`border-b border-[var(--color-glass-border)] cursor-pointer transition-colors ${
                                        isChecked ? 'bg-[var(--color-glass-bg)] hover:bg-[var(--color-glass-bg)]' : 'hover:bg-[var(--color-glass-bg)] opacity-80 hover:opacity-100'
                                    } ${isInactive ? 'opacity-40 grayscale hover:opacity-60' : ''}`}
                                >
                                    <td className="px-4 py-3 text-center">
                                        <input 
                                            type="checkbox" 
                                            checked={isChecked}
                                            readOnly
                                            className="w-4 h-4 accent-accent-purple cursor-pointer"
                                        />
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-1 bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] rounded font-medium text-xs text-spark-gold">
                                            {camp.project}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 font-medium text-[var(--color-text-primary)] max-w-[200px] truncate" title={camp.name}>
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
                                    <td className="px-4 py-3 text-text-secondary">
                                        {new Date(camp.date).toLocaleDateString('pl-PL')}
                                    </td>
                                    <td className="px-4 py-3 text-right text-text-secondary">
                                        {camp.sent.toLocaleString('pl-PL')}
                                    </td>
                                    <td className="px-4 py-3 text-right font-semibold text-accent-purple">
                                        {Number(camp.openRate).toFixed(1)}%
                                    </td>
                                    <td className="px-4 py-3 text-right font-semibold text-accent-blue">
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
