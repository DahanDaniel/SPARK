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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, idx) => {
                const Icon = card.icon;
                return (
                    <div key={idx} className={`bento-card p-6 group transition-all duration-300 ${card.border}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.bg}`}>
                                <Icon className={`w-6 h-6 ${card.color}`} />
                            </div>
                        </div>
                        <div>
                            <p className="data-label mb-1">{card.title}</p>
                            <h3 className="data-value">{card.value}</h3>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ExecutiveSummary;
