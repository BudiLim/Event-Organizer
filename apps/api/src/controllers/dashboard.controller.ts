import prisma from '@/prisma';
import { Request, Response } from 'express';

export class DashboardController {
  async getOrganizerDashboardData(req: Request, res: Response) {
    const organizerIdParam = req.params.organizerId;
    const organizerId = parseInt(organizerIdParam, 10);

    if (isNaN(organizerId)) {
      console.error('Invalid organizer ID:', organizerIdParam);
      return res
        .status(400)
        .json({ status: 'error', message: 'Invalid organizer ID' });
    }

    try {
      // Fetch organizer's name
      const organizer = await prisma.user.findUnique({
        where: { id: organizerId },
        select: { firstName: true, lastName: true },
      });

      if (!organizer) {
        return res
          .status(404)
          .json({ status: 'error', message: 'Organizer not found' });
      }

      const fullName = `${organizer.firstName} ${organizer.lastName}`;

      // Fetch events organized by the user
      const events = await prisma.event.findMany({
        where: { organizerId },
      });

      // Fetch transactions for the year 2024
      const transactions = await prisma.transaction.findMany({
        where: {
          event: { organizerId },
          transactionDate: {
            gte: new Date('2024-01-01'),
            lte: new Date('2024-12-31'),
          },
        },
        select: { amount: true, transactionDate: true },
      });

      // Calculate total revenue and orders for the year 2024
      const totalRevenue = transactions.reduce(
        (sum: number, transaction: { amount: number }) => sum + transaction.amount,
        0,
      );
      const totalOrders = transactions.length;

      // Count total tickets sold for events organized by the user
      const totalTicketsSold = await prisma.ticket.count({
        where: {
          event: { organizerId },
          purchaseDate: {
            gte: new Date('2024-01-01'),
            lte: new Date('2024-12-31'),
          },
        },
      });

      // Fetch previous week data for comparison
      const previousWeekStart = new Date();
      previousWeekStart.setDate(previousWeekStart.getDate() - 14);
      const previousWeekEnd = new Date();
      previousWeekEnd.setDate(previousWeekEnd.getDate() - 8);

      const previousWeekRevenueData = await prisma.transaction.findMany({
        where: {
          event: { organizerId },
          transactionDate: { gte: previousWeekStart, lte: previousWeekEnd },
        },
        select: { amount: true },
      });

      const previousWeekRevenue = previousWeekRevenueData.reduce(
        (sum: number, transaction: { amount: number }) => sum + transaction.amount,
        0,
      );
      const previousWeekTicketsSold = await prisma.ticket.count({
        where: {
          event: { organizerId },
          purchaseDate: {
            gte: previousWeekStart,
            lte: previousWeekEnd,
          },
        },
      });

      // Aggregate monthly revenue
      const monthlyRevenueMap: Record<number, number> = {};

      transactions.forEach(transaction => {
        const month = transaction.transactionDate.getMonth() + 1; // 1-12 for Jan-Dec
        if (!monthlyRevenueMap[month]) {
          monthlyRevenueMap[month] = 0;
        }
        monthlyRevenueMap[month] += transaction.amount;
      });

      // Convert the map to an array for the frontend
      const monthlyRevenueArray = Object.keys(monthlyRevenueMap).map(month => ({
        month: parseInt(month),
        revenue: monthlyRevenueMap[parseInt(month)], // Use parseInt to index correctly
      }));

      // Ensure to fill in missing months with 0 revenue
      for (let month = 1; month <= 12; month++) {
        if (!monthlyRevenueMap[month]) {
          monthlyRevenueArray.push({ month, revenue: 0 });
        }
      }

      // Sort by month
      monthlyRevenueArray.sort((a, b) => a.month - b.month);

      return res.status(200).json({
        status: 'success',
        data: {
          fullName,
          totalRevenue,
          totalOrders,
          totalTicketsSold,
          events,
          previousWeekRevenue,
          previousWeekTicketsSold,
          previousWeekOrders: previousWeekTicketsSold,
          monthlyRevenue: monthlyRevenueArray,
        },
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Unable to fetch dashboard data',
        details: error instanceof Error ? error.message : String(error),
      });
    }
  }
}