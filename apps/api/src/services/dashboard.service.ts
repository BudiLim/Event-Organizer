import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getDashboardData = async (organizerId: number, startDate: Date, endDate: Date) => {
  // Fetch events within the date range
  const events = await prisma.event.findMany({
    where: {
      organizerId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  // Calculate total revenue
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

  // Calculate total orders (total tickets sold)
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

  // Calculate previous week data
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

  // Count total tickets sold per event
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

  return {
    events: eventsWithTicketCounts,
    totalRevenue: totalRevenue._sum.amount || 0,
    totalOrders,
    previousWeekRevenue: previousWeekRevenue._sum.amount || 0,
    previousWeekTicketsSold,
  };
};
