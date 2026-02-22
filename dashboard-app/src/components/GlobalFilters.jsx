import { Calendar, Briefcase, Filter, X, ChevronDown, CheckCircle2 } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import CampaignList from './CampaignList';

const GlobalFilters = ({ filters, setFilters, campaigns, selectedCampaignIds, onSelectionChange }) => {
    const [expanded, setExpanded] = useState(false);

    const handleProjectChange = (e) => {
        setFilters(prev => ({ ...prev, project: e.target.value }));
    };

    const handleStatusChange = (e) => {
        setFilters(prev => ({ ...prev, status: e.target.value }));
    };

    const handleDateChange = (update) => {
        const [startDate, endDate] = update;
        setFilters(prev => ({ ...prev, startDate, endDate }));
    };

    const clearDateFilter = () => {
        setFilters(prev => ({ ...prev, startDate: null, endDate: null }));
    };

    return (
        <div className="bento-card mb-6 flex flex-col transition-all duration-300">
            {/* Top Bar for Global Filters */}
            <div className="p-3 bg-[var(--color-glass-bg)] flex flex-wrap items-center gap-4 border-b border-[var(--color-bento-border)]">
                <div className="flex items-center gap-2 px-3 text-[var(--color-text-secondary)] border-r border-[var(--color-glass-border)]">
                    <Filter className="w-5 h-5" />
                    <span className="text-sm font-semibold uppercase tracking-wider">Filtry Globalne</span>
                </div>
                
                {/* Projekt Filter */}
                <div className="relative group min-w-[200px]">
                    <select 
                        value={filters.project}
                        onChange={handleProjectChange}
                        className="w-full appearance-none bg-[var(--color-glass-bg)] hover:bg-[var(--color-bento-card)] pl-10 pr-8 py-2.5 rounded-lg text-sm font-medium text-[var(--color-text-primary)] cursor-pointer outline-none transition-colors border border-[var(--color-glass-border)] hover:border-[var(--color-spark-gold)]"
                    >
                        <option value="All" className="bg-[var(--color-bento-bg)]">Wszystkie Projekty</option>
                        <option value="SPARK" className="bg-[var(--color-bento-bg)]">SPARK</option>
                        <option value="GLG" className="bg-[var(--color-bento-bg)]">Golden Lead Gen</option>
                        <option value="MIND" className="bg-[var(--color-bento-bg)]">MIND</option>
                        <option value="SEBASTIAN_WONS" className="bg-[var(--color-bento-bg)]">S. Wons</option>
                        <option value="PPB" className="bg-[var(--color-bento-bg)]">PPB</option>
                        <option value="DIRECTO" className="bg-[var(--color-bento-bg)]">Directo</option>
                        <option value="Inne" className="bg-[var(--color-bento-bg)]">Inne Kampanie</option>
                    </select>
                    <Briefcase className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-spark-gold)] pointer-events-none" />
                </div>

                {/* Status Filter */}
                <div className="relative group min-w-[200px]">
                    <select 
                        value={filters.status || 'finished,running'}
                        onChange={handleStatusChange}
                        className="w-full appearance-none bg-[var(--color-glass-bg)] hover:bg-[var(--color-bento-card)] pl-10 pr-8 py-2.5 rounded-lg text-sm font-medium text-[var(--color-text-primary)] cursor-pointer outline-none transition-colors border border-[var(--color-glass-border)] hover:border-[var(--color-spark-gold)]"
                    >
                        <option value="All" className="bg-[var(--color-bento-bg)]">Wszystkie Statusy</option>
                        <option value="finished,running" className="bg-[var(--color-bento-bg)]">Aktywne (Domyślne)</option>
                        <option value="finished" className="bg-[var(--color-bento-bg)]">Zakończone (Finished)</option>
                        <option value="running" className="bg-[var(--color-bento-bg)]">W Trakcie (Running)</option>
                        <option value="draft" className="bg-[var(--color-bento-bg)]">Szkice (Draft)</option>
                        <option value="paused" className="bg-[var(--color-bento-bg)]">Zatrzymane (Paused)</option>
                    </select>
                    <CheckCircle2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-accent-green)] pointer-events-none" />
                </div>

                {/* Zakres Dat Filter (React Datepicker) */}
                <div className="relative group min-w-[280px] flex items-center">
                    <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-accent-blue)] z-10 pointer-events-none" />
                    <DatePicker
                        selectsRange={true}
                        startDate={filters.startDate}
                        endDate={filters.endDate}
                        onChange={handleDateChange}
                        isClearable={false}
                        placeholderText="Wybierz zakres dat..."
                        className="w-full bg-[var(--color-glass-bg)] hover:bg-[var(--color-bento-card)] pl-10 pr-10 py-2.5 rounded-lg text-sm font-medium text-[var(--color-text-primary)] cursor-pointer outline-none transition-colors border border-[var(--color-glass-border)] hover:border-[var(--color-accent-blue)]"
                        dateFormat="dd.MM.yyyy"
                    />
                    {(filters.startDate || filters.endDate) && (
                        <button 
                            onClick={clearDateFilter}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
                
                {/* Opcjonalny przycisk resetu i pokazania szczegółów */}
                <div className="ml-auto flex items-center gap-4">
                    <button 
                        onClick={() => setExpanded(!expanded)}
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--color-glass-bg)] hover:bg-[var(--color-bento-card)] border border-[var(--color-glass-border)] hover:border-[var(--color-spark-gold)] rounded-lg transition-colors text-sm font-medium text-[var(--color-text-primary)]"
                    >
                        Pokaż szczegóły i kampanie
                        <span className="text-xs px-2 py-0.5 bg-[var(--color-accent-purple)]/10 text-[var(--color-accent-purple)] rounded-full">
                            {selectedCampaignIds?.size || 0}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-[var(--color-text-secondary)] transition-transform ${expanded ? 'rotate-180' : ''}`} />
                    </button>

                    <button 
                        onClick={() => setFilters({ project: 'All', status: 'finished,running', startDate: null, endDate: null })}
                        className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors underline"
                    >
                        Resetuj
                    </button>
                </div>
            </div>

            {/* Expandable Campaign Filter Panel */}
            {expanded && (
                <div className="border-t border-[var(--color-glass-border)] bg-[var(--color-glass-bg)]">
                    <CampaignList 
                        campaigns={campaigns} 
                        selectedCampaignIds={selectedCampaignIds}
                        onSelectionChange={onSelectionChange}
                        currentStatusFilter={filters.status}
                    />
                </div>
            )}
            
            
            <style>{`
                .react-datepicker {
                    background-color: var(--color-bento-card) !important;
                    border: 1px solid rgba(255,255,255,0.1) !important;
                    color: white !important;
                    font-family: inherit !important;
                }
                .react-datepicker__header {
                    background-color: rgba(0,0,0,0.3) !important;
                    border-bottom: 1px solid rgba(255,255,255,0.1) !important;
                }
                .react-datepicker__current-month, .react-datepicker-time__header, .react-datepicker-year-header, .react-datepicker__day-name {
                    color: white !important;
                }
                .react-datepicker__day {
                    color: #e5e7eb !important;
                }
                .react-datepicker__day:hover {
                    background-color: rgba(255,255,255,0.1) !important;
                }
                .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range, .react-datepicker__month-text--selected, .react-datepicker__month-text--in-selecting-range, .react-datepicker__month-text--in-range {
                    background-color: var(--color-spark-gold) !important;
                    color: black !important;
                }
                .react-datepicker__triangle {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default GlobalFilters;
