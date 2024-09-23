import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getDashboardData = async (organizerId: number) => {
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-12-31');

  // Fetch events organized by the user
  const events = await prisma.event.findMany({
    where: {
      organizerId,
    },
  });

  // Calculate total revenue for 2024
  const totalRevenue = await prisma.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      event: {
        organizerId,
      },
      transactionDate: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  // Calculate total orders (tickets sold) for 2024
  const totalOrders = await prisma.ticket.count({
    where: {
      event: {
        organizerId,
      },
      purchaseDate: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  // Calculate previous week data for comparison
  const startOfLastWeek = new Date(startDate);
  startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);
  const endOfLastWeek = new Date(endDate);
  endOfLastWeek.setDate(endOfLastWeek.getDate() - 7);

  const previousWeekRevenue = await prisma.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      event: {
        organizerId,
      },
      transactionDate: {
        gte: startOfLastWeek,
        lte: endOfLastWeek,
      },
    },
  });

  const previousWeekTicketsSold = await prisma.ticket.count({
    where: {
      event: {
        organizerId,
      },
      purchaseDate: {
        gte: startOfLastWeek,
        lte: endOfLastWeek,
      },
    },
  });

  // Count total tickets sold for each event
  const eventsWithTicketCounts = await Promise.all(
    events.map(async (event) => {
      const ticketsSold = await prisma.ticket.count({
        where: {
          eventId: event.id,
          purchaseDate: {
            gte: startDate,
            lte: endDate,
          },
        },
      });
      return {
        ...event,
        ticketsSold,
      };
    })
  );

  // Calculate monthly revenue for 2024
  const monthlyRevenue = await prisma.transaction.groupBy({
    by: ['transactionDate'],
    _sum: {
      amount: true,
    },
    where: {
      event: {
        organizerId,
      },
      transactionDate: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: {
      transactionDate: 'asc',
    },
  });

  const monthlyRevenueArray = monthlyRevenue.map(({ transactionDate, _sum }) => ({
    month: transactionDate.getMonth() + 1, // Get the month number (1-12)
    revenue: _sum.amount || 0,             // Sum the revenue for that month
  }));

  return {
    events: eventsWithTicketCounts,
    totalRevenue: totalRevenue._sum.amount || 0,
    totalOrders,
    previousWeekRevenue: previousWeekRevenue._sum.amount || 0,
    previousWeekTicketsSold,
    monthlyRevenue: monthlyRevenueArray,
  };
};
