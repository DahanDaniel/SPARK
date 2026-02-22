const express = require('express');
const { requireAuth } = require('../middleware/auth');
const googleSheetsService = require('../services/googleSheets');
const listmonkService = require('../services/listmonk');

const router = express.Router();

router.use(requireAuth);

router.get('/dashboard-data', async (req, res) => {
    try {
        const listmonkData = await listmonkService.getDashboardMetrics();
        const sheetsData = await googleSheetsService.getLeadMetrics();

        // Calculate trends and final payload (simplified for MVP)
        const dashboardPayload = {
            summary: {
                totalSent: listmonkData.funnel.sent || 0,
                sentTrend: 0, // Would need historical DB comparison
                averageOpenRate: listmonkData.averages.openRate || 0,
                averageClickRate: listmonkData.averages.clickRate || 0,
                totalLeads: sheetsData.totalLeads || 0,
                goldenLeads: sheetsData.goldenLeads || 0
            },
            funnel: {
                sent: listmonkData.funnel.sent || 0,
                opened: listmonkData.funnel.opened || 0,
                clicked: listmonkData.funnel.clicked || 0,
                leads: sheetsData.totalLeads || 0,
                goldenLeads: sheetsData.goldenLeads || 0,
                dealsWon: sheetsData.statusBreakdown['Won'] || 0
            },
            listmonk: {
                recentCampaigns: listmonkData.recent || [],
                allCampaigns: listmonkData.allCampaigns || [],
                bounceRate: listmonkData.bounceRate || 0
            },
            leads: {
                recentGolden: sheetsData.recentGolden || [],
                allLeads: sheetsData.allLeads || [],
                statusBreakdown: sheetsData.statusBreakdown || {}
            }
        };

        res.json(dashboardPayload);
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }
});

module.exports = router;
