import { Send, MousePointerClick, Star, Users } from 'lucide-react';

const ExecutiveSummary = ({ summary }) => {
    if (!summary) return null;

    const cards = [
        {
            title: "Zrealizowane Wysyłki",
            value: summary.totalSent.toLocaleString('pl-PL'),
            icon: Send,
            color: "text-accent-blue",
            bg: "bg-accent-blue/10",
            border: "group-hover:border-accent-blue/30"
        },
        {
            title: "Średni Open / Click Rate",
            value: `${summary.averageOpenRate}% / ${summary.averageClickRate}%`,
            icon: MousePointerClick,
            color: "text-accent-purple",
            bg: "bg-accent-purple/10",
            border: "group-hover:border-accent-purple/30"
        },
        {
            title: "Suma Leadów",
            value: summary.totalLeads.toLocaleString('pl-PL'),
            icon: Users,
            color: "text-[var(--color-text-primary)]",
            bg: "bg-[var(--color-glass-bg)]",
            border: "group-hover:border-[var(--color-glass-border)]"
        },
        {
            title: "Golden Leady",
            value: summary.goldenLeads.toLocaleString('pl-PL'),
            icon: Star,
            color: "text-spark-gold",
            bg: "bg-spark-gold/10",
            border: "group-hover:border-spark-gold/40"
        }
    ];

    return (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-3">
            {cards.map((card, idx) => {
                const Icon = card.icon;
                return (
                    <div key={idx} className={`bento-card p-2.5 sm:p-3 group transition-all duration-300 ${card.border} flex items-center gap-2.5 sm:gap-3`}>
                        <div className={`shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center ${card.bg}`}>
                            <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${card.color}`} />
                        </div>
                        <div className="flex flex-col min-w-0 justify-center">
                            <p className="text-[9px] sm:text-[10px] text-[var(--color-text-secondary)] font-bold uppercase tracking-wider mb-0.5 opacity-80 truncate" title={card.title}>{card.title}</p>
                            <h3 className="text-sm sm:text-base lg:text-lg font-bold tracking-tight text-[var(--color-text-primary)] truncate" title={card.value}>{card.value}</h3>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ExecutiveSummary;
