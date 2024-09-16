import prisma from '@/prisma';
import { Request, Response } from 'express';

export class DashboardController {
  async getOrganizerDashboardData(req: Request, res: Response) {
    const organizerIdParam = req.params.organizerId;
    const organizerId = parseInt(organizerIdParam, 10);

    if (isNaN(organizerId)) {
      console.error('Invalid organizer ID:', organizerIdParam);
      return res.status(400).json({ status: 'error', message: 'Invalid organizer ID' });
    }

    const { startDate, endDate } = req.query;
    const start = new Date(startDate as string);
    const end = new Date(endDate as string);

    if (!start || !end) {
      return res.status(400).json({ status: 'error', message: 'Invalid date range' });
    }

    try {
      // Fetch organizer's name
      const organizer = await prisma.user.findUnique({
        where: { id: organizerId },
        select: { firstName: true, lastName: true },
      });

      if (!organizer) {
        return res.status(404).json({ status: 'error', message: 'Organizer not found' });
      }

      const fullName = `${organizer.firstName} ${organizer.lastName}`;

      // Fetch events organized by the user
      const events = await prisma.event.findMany({
        where: { organizerId },
        // select: { id: true, name: true, location: true, isPaidEvent: true, price: true, availableSeats: true },
      });

      // Calculate total revenue and orders
      const transactions = await prisma.transaction.findMany({
        where: { event: { organizerId } },
        select: { amount: true },
      });

      const totalRevenue = transactions.reduce(
        (sum: number, transaction: { amount: number }) => sum + transaction.amount,
        0
      );
      const totalOrders = transactions.length;

      // Count total tickets sold for events organized by the user
      const totalTicketsSold = await prisma.ticket.count({
        where: { event: { organizerId } }
      });

      // Fetch previous week data for comparison
      const previousWeekStart = new Date(start);
      previousWeekStart.setDate(start.getDate() - 7);
      const previousWeekEnd = new Date(end);
      previousWeekEnd.setDate(end.getDate() - 7);

      const previousWeekRevenueData = await prisma.transaction.findMany({
        where: { event: { organizerId }, transactionDate: { gte: previousWeekStart, lte: previousWeekEnd } },
        select: { amount: true },
      });

      const previousWeekRevenue = previousWeekRevenueData.reduce(
        (sum: number, transaction: { amount: number }) => sum + transaction.amount,
        0
      );
      const previousWeekTicketsSold = await prisma.ticket.count({
        where: { event: { organizerId }, purchaseDate: { gte: previousWeekStart, lte: previousWeekEnd } },
      });

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
