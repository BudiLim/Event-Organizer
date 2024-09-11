import prisma from '@/prisma';
import { Request, Response } from 'express';

export class DashboardController {
  async getOrganizerDashboardData(req: Request, res: Response) {
    const organizerIdParam = req.params.organizerId;
    console.log('Organizer ID Param:', organizerIdParam);

    const organizerId = parseInt(organizerIdParam, 10);

    if (isNaN(organizerId)) {
      return res.status(400).json({ error: 'Invalid organizer ID' });
    }

    try {
      // Fetch organizer details
      const organizer = await prisma.user.findUnique({
        where: { id: organizerId },
        select: { firstName: true, lastName: true },
      });

      // Check if organizer exists
      if (!organizer) {
        return res.status(404).json({ error: 'Organizer not found' });
      }

      const fullName = `${organizer.firstName} ${organizer.lastName}`;

      // Fetch all events organized by the user
      const events = await prisma.event.findMany({
        where: { organizerId },
        select: { id: true, name: true, location: true, availableSeats: true },
      });

      // Fetch transactions (orders) for all events organized by this user
      const transactions = await prisma.transaction.findMany({
        where: { event: { organizerId } },
        select: { amount: true },
      });

      // Calculate total revenue, tickets sold, and total orders
      const totalRevenue = transactions.reduce(
        (sum: number, transaction: { amount: number }) =>
          sum + transaction.amount,
        0,
      );
      const totalOrders = transactions.length;

      // Send the response with the calculated data
      res.json({
        fullName,
        totalRevenue,
        totalOrders,
        events,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      res.status(500).json({ error: 'Unable to fetch dashboard data', details: error as string });
    }
  }
}
