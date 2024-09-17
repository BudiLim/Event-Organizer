// ticket.service.ts
import prisma from '@/prisma';
import { Status } from '@prisma/client';

export class TicketService {
  static async validateDiscountCode(discountCode: string, eventId: number) {
    try {
      const promotion = await prisma.promotion.findFirst({
        where: {
          eventId,
          discountCode,
          validUntil: {
            gte: new Date(),
          },
        },
      });

      if (!promotion) {
        throw new Error('Invalid or expired discount code');
      }

      return { amount: promotion.amount };
    } catch (error) {
      console.error('Error validating discount code:', error);
      throw new Error('Failed to validate discount code');
    }
  }

  static async purchaseTicket({
    userId,
    eventId,
    quantity,
    price,
    discountCode,
  }: {
    userId: number;
    eventId: number;
    quantity: number;
    price: number;
    discountCode?: string;
  }) {
    let discountAmount = 0;
    if (discountCode) {
      const discount = await this.validateDiscountCode(discountCode, eventId);
      if (discount) {
        discountAmount = discount.amount;
      }
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { tickets: true },
    });

    if (!event || event.availableSeats < quantity) {
      throw new Error('Not enough available seats');
    }

    // Create tickets
    const ticketData = Array.from({ length: quantity }, () => ({
      eventId,
      userId,
      price: event.price - discountAmount,
      status: Status.Active,
      purchaseDate: new Date(),
      quantity: 1, // assuming each ticket has a quantity of 1
      totalPrice: event.price - discountAmount, // calculate the total price
    }));

    // Create tickets individually if createMany is not working
    const createdTickets = [];
    for (const ticket of ticketData) {
      const createdTicket = await prisma.ticket.create({
        data: ticket,
      });
      createdTickets.push(createdTicket);
    }

    await prisma.event.update({
      where: { id: eventId },
      data: { availableSeats: event.availableSeats - quantity },
    });

    return createdTickets;
  }
}
