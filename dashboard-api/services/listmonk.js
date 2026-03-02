const { Pool } = require('pg');

class ListmonkService {
    constructor() {
        // Setup PostgreSQL connection pool
        this.pool = new Pool({
            host: process.env.LISTMONK_DB_HOST,
            port: process.env.LISTMONK_DB_PORT,
            user: process.env.LISTMONK_DB_USER,
            password: process.env.LISTMONK_DB_PASS,
            database: process.env.LISTMONK_DB_NAME,
            max: 5, // Keep a small pool
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 5000,
        });

        this.cache = null;
        this.cacheTimestamp = 0;
        this.CACHE_TTL = 5 * 60 * 1000; // 5 minutes
    }

    async getDashboardMetrics() {
        if (this.cache && (Date.now() - this.cacheTimestamp < this.CACHE_TTL)) {
            return this.cache;
        }

        try {
            // Highly optimized PostgreSQL query aggregating views and clicks directly from the source
            const query = `
                SELECT 
                    c.id, c.name, c.status, c.created_at, c.from_email, c.tags, c.sent,
                    (SELECT COUNT(*) FROM campaign_views v WHERE v.campaign_id = c.id) as views,
                    (SELECT COUNT(*) FROM link_clicks l WHERE l.campaign_id = c.id) as clicks
                FROM campaigns c
                ORDER BY c.created_at DESC
                LIMIT 5000;
            `;

            const { rows: rawCampaigns } = await this.pool.query(query);
            
            let totalSent = 0;
            let totalOpened = 0;
            let totalClicked = 0;
            
            // Map ALL campaigns for the frontend Universal Filtering / Campaign List Widget
            const allCampaigns = rawCampaigns.map(camp => {
                const sent = parseInt(camp.sent) || 0;
                const opened = parseInt(camp.views) || 0; 
                const clicked = parseInt(camp.clicks) || 0;

                // Guess project name based on campaign name or tags
                let project = 'Inne';
                const lowerName = (camp.name || '').toLowerCase();
                const tagsDesc = (camp.tags || []).join(' ').toLowerCase();
                const fromEmail = (camp.from_email || '').toLowerCase();

                // Assign project groups based on string matching
                if (lowerName.includes('grzegorz kuca') || tagsDesc.includes('viral') || fromEmail.includes('g.kuca') || lowerName.includes('viral studio')) {
                    project = 'VIRAL STUDIO';
                } else if (lowerName.includes('crazy') || tagsDesc.includes('crazy') || lowerName.includes('szkic - mail 3 - m.') || lowerName.includes('szkic mail 1 - kukulka')) {
                    project = 'CRAZY CRM';
                } else if (lowerName.includes('ttpi') || tagsDesc.includes('ttpi') || lowerName.includes('sekewncja t')) {
                    project = 'TTPI';
                } else if (lowerName.includes('roni') || tagsDesc.includes('roni') || lowerName.includes('תמא') || lowerName.includes('tama')) {
                    project = 'RONI';
                } else if (lowerName.includes('spark') || tagsDesc.includes('spark') || lowerName.includes('uporzadkuj') || lowerName.includes('ai readiness') || lowerName.includes('spa dla biznesu') || lowerName.includes('sekewcja 1')) {
                    project = 'SPARK';
                } else if (lowerName.includes('glg') || tagsDesc.includes('glg') || lowerName.includes('golden') || lowerName.includes('lead gen')) {
                    project = 'GLG';
                } else if (lowerName.includes('mind') || tagsDesc.includes('mind') || lowerName.includes('new era')) {
                    project = 'MIND';
                } else if (lowerName.includes('ppb') || tagsDesc.includes('ppb')) {
                    project = 'PPB';
                } else if (lowerName.includes('wons') || tagsDesc.includes('wons') || lowerName.includes('sebastian')) {
                    project = 'SEBASTIAN_WONS';
                } else if (lowerName.includes('directo') || tagsDesc.includes('directo') || fromEmail.includes('dariusz') || lowerName.includes('dp-1')) {
                    project = 'DIRECTO';
                }

                // Add to global totals if running/finished (and not draft)
                if (camp.status === 'finished' || camp.status === 'running') {
                    totalSent += sent;
                    totalOpened += opened;
                    totalClicked += clicked;
                }

                return {
                    id: camp.id,
                    name: camp.name,
                    status: camp.status,
                    project: project,
                    date: camp.created_at,
                    timestamp: new Date(camp.created_at).getTime(),
                    sent,
                    opened,
                    clicked,
                    openRate: sent > 0 ? parseFloat(((opened / sent) * 100).toFixed(1)) : 0,
                    clickRate: sent > 0 ? parseFloat(((clicked / sent) * 100).toFixed(1)) : 0
                };
            });

            // Extract the 5 most recent active campaigns
            const recentCampaigns = allCampaigns
                .filter(c => c.status === 'finished' || c.status === 'running')
                .slice(0, 5) // Top 5 recent
                .map(camp => ({
                    id: camp.id,
                    name: camp.name,
                    tags: rawCampaigns.find(r => r.id === camp.id)?.tags || [],
                    audience: camp.sent, // Total sent to
                    progress: 100, // If finished
                    openRate: camp.openRate,
                    clickRate: camp.clickRate
                }));

            // Aggregate global rates based on the entire fetched page (approximate global performance)
            let globalOR = 0;
            let globalCTR = 0;
            
            if (totalSent > 0) {
                globalOR = ((totalOpened / totalSent) * 100).toFixed(1);
                globalCTR = ((totalClicked / totalSent) * 100).toFixed(1);
            }

            // Estimate bounce rate (Direct DB query could be: SELECT COUNT(*) FROM bounces WHERE created_at...)
            // Since this wasn't fully reliable via API either, keeping placeholder for now
            let bounceRate = 0.5;

            const result = {
                funnel: {
                    sent: totalSent,
                    opened: totalOpened,
                    clicked: totalClicked
                },
                averages: {
                    openRate: parseFloat(globalOR),
                    clickRate: parseFloat(globalCTR)
                },
                recent: recentCampaigns,
                allCampaigns: allCampaigns,
                bounceRate: bounceRate
            };

            this.cache = result;
            this.cacheTimestamp = Date.now();

            return result;

        } catch (error) {
            console.error('Listmonk Database PG Error:', error.message);
            // Return safe fallback if DB is down or credentials wrong
            return {
                funnel: { sent: 0, opened: 0, clicked: 0 },
                averages: { openRate: 0, clickRate: 0 },
                recent: [],
                bounceRate: 0,
                error: 'Listmonk DB disconnected'
            };
        }
    }
}

module.exports = new ListmonkService();
