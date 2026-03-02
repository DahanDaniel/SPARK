import { Calendar, Briefcase, Filter, X, ChevronDown, CheckCircle2 } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import CampaignList from './CampaignList';

const GlobalFilters = ({ filters, setFilters, campaigns, selectedCampaignIds, onSelectionChange, isExpanded, setIsExpanded, onReset }) => {

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
        <div className="bento-card mb-6 transition-all duration-300 py-4 sm:p-4 lg:p-6">
            {/* Top Bar for Global Filters */}
            <div className="flex flex-wrap items-center gap-2 lg:gap-3 px-3 sm:px-0">
                <div className="hidden xl:flex items-center gap-2 pr-4 text-[var(--color-text-secondary)] border-r border-[var(--color-glass-border)]">
                    <Filter className="w-5 h-5" />
                    <span className="text-sm font-semibold uppercase tracking-wider whitespace-nowrap">Filtry</span>
                </div>
                
                {/* Projekt Filter */}
                <div className="relative group flex-auto sm:flex-1 min-w-[120px] max-w-[200px]">
                    <select 
                        value={filters.project}
                        onChange={handleProjectChange}
                        className="w-full appearance-none bg-[var(--color-glass-bg)] hover:bg-[var(--color-glass-bg)] pl-7 pr-7 py-2 rounded-lg text-xs font-medium text-[var(--color-text-primary)] cursor-pointer outline-none transition-colors border border-[var(--color-glass-border)] hover:border-[var(--color-spark-gold)]"
                    >
                        <option value="All" className="bg-[var(--color-bento-bg)] text-[var(--color-text-primary)]">Wszystkie Projekty</option>
                        <option value="SPARK" className="bg-[var(--color-bento-bg)] text-[var(--color-text-primary)]">SPARK</option>
                        <option value="GLG" className="bg-[var(--color-bento-bg)] text-[var(--color-text-primary)]">GLG</option>
                        <option value="MIND" className="bg-[var(--color-bento-bg)] text-[var(--color-text-primary)]">MIND</option>
                        <option value="CRAZY CRM" className="bg-[var(--color-bento-bg)] text-[var(--color-text-primary)]">CRAZY CRM</option>
                        <option value="VIRAL STUDIO" className="bg-[var(--color-bento-bg)] text-[var(--color-text-primary)]">VIRAL STUDIO</option>
                        <option value="DIRECTO" className="bg-[var(--color-bento-bg)] text-[var(--color-text-primary)]">DIRECTO</option>
                        <option value="SEBASTIAN_WONS" className="bg-[var(--color-bento-bg)] text-[var(--color-text-primary)]">S. WONS</option>
                        <option value="PPB" className="bg-[var(--color-bento-bg)] text-[var(--color-text-primary)]">PPB</option>
                        <option value="TTPI" className="bg-[var(--color-bento-bg)] text-[var(--color-text-primary)]">TTPI</option>
                        <option value="RONI" className="bg-[var(--color-bento-bg)] text-[var(--color-text-primary)]">RONI</option>
                        <option value="Inne" className="bg-[var(--color-bento-bg)] text-[var(--color-text-primary)]">Inne Kampanie</option>
                    </select>
                    <Briefcase className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-[var(--color-spark-gold)] pointer-events-none" />
                    <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Status Filter */}
                <div className="relative group flex-auto sm:flex-1 min-w-[120px] max-w-[200px]">
                    <select 
                        value={filters.status || 'finished,running'}
                        onChange={handleStatusChange}
                        className="w-full appearance-none bg-[var(--color-glass-bg)] hover:bg-[var(--color-glass-bg)] pl-7 pr-7 py-2 rounded-lg text-xs font-medium text-[var(--color-text-primary)] cursor-pointer outline-none transition-colors border border-[var(--color-glass-border)] hover:border-[var(--color-spark-gold)]"
                    >
                        <option value="All" className="bg-[var(--color-bento-bg)] text-[var(--color-text-primary)]">Wszystkie Statusy</option>
                        <option value="finished,running" className="bg-[var(--color-bento-bg)] text-[var(--color-text-primary)]">Aktywne (Domyślne)</option>
                        <option value="finished" className="bg-[var(--color-bento-bg)] text-[var(--color-text-primary)]">Zakończone</option>
                        <option value="running" className="bg-[var(--color-bento-bg)] text-[var(--color-text-primary)]">W Trakcie</option>
                        <option value="draft" className="bg-[var(--color-bento-bg)] text-[var(--color-text-primary)]">Szkice</option>
                        <option value="paused" className="bg-[var(--color-bento-bg)] text-[var(--color-text-primary)]">Zatrzymane</option>
                    </select>
                    <CheckCircle2 className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-[var(--color-accent-green)] pointer-events-none" />
                    <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Zakres Dat Filter (React Datepicker) */}
                <div className="relative group flex-auto sm:flex-1 min-w-[150px] max-w-[200px] flex items-center z-50">
                    <Calendar className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-[var(--color-accent-blue)] z-10 pointer-events-none" />
                    <DatePicker
                        selectsRange={true}
                        startDate={filters.startDate}
                        endDate={filters.endDate}
                        onChange={handleDateChange}
                        isClearable={false}
                        placeholderText="Wybierz zakres dat..."
                        className="w-full bg-[var(--color-glass-bg)] hover:bg-[var(--color-glass-bg)] pl-7 pr-7 py-2 rounded-lg text-xs font-medium text-[var(--color-text-primary)] cursor-pointer outline-none transition-colors border border-[var(--color-glass-border)] hover:border-[var(--color-accent-blue)]"
                        dateFormat="dd.MM.yyyy"
                    />
                    {(filters.startDate || filters.endDate) && (
                        <button 
                            onClick={clearDateFilter}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>
                
                {/* Opcjonalny przycisk resetu i pokazania szczegółów */}
                <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2 sm:ml-auto w-full sm:w-auto mt-1 sm:mt-0 pt-1 sm:pt-0 sm:border-0 border-t border-[var(--color-glass-border)]">
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center flex-1 sm:flex-none justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[var(--color-glass-bg)] hover:bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] hover:border-[var(--color-spark-gold)] rounded-lg transition-colors text-xs font-medium text-[var(--color-text-primary)] whitespace-nowrap"
                    >
                        Wszystkie kampanie
                        <span className="text-[10px] px-1.5 py-0.5 bg-[var(--color-accent-purple)]/10 text-[var(--color-accent-purple)] rounded-full">
                            {selectedCampaignIds?.size || 0}
                        </span>
                        <ChevronDown className={`w-3.5 h-3.5 text-[var(--color-text-secondary)] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>

                    <button 
                        onClick={onReset}
                        className="text-xs font-medium px-2 py-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors whitespace-nowrap"
                    >
                        Resetuj
                    </button>
                </div>
            </div>

            {/* Expandable Campaign Filter Panel */}
            {isExpanded && (
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[var(--color-glass-border)] w-full block">
                    <CampaignList 
                        campaigns={campaigns} 
                        selectedCampaignIds={selectedCampaignIds}
                        onSelectionChange={onSelectionChange}
                        filters={filters}
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
