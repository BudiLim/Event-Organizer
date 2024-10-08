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
    pointsToRedeem,
  }: {
    userId: number;
    eventId: number;
    quantity: number;
    price: number;
    discountCode?: string;
    pointsToRedeem?: number;
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

    // Total ticket price
    const priceBeforeDiscount = price * quantity;
    const discountUnit = (priceBeforeDiscount * discountAmount) / 100;
    let priceAfterDiscount = priceBeforeDiscount - discountUnit;

    // Ticket satuan
    const singleDiscountPrice = (price * discountAmount) / 100;
    const pricePerTicketAfterDiscount = price - singleDiscountPrice;

    // Apply points redemption if provided
    if (pointsToRedeem) {
      const pointsValue = pointsToRedeem;
      priceAfterDiscount -= pointsValue;

      // Ensure the final price is not negative
      priceAfterDiscount = Math.max(priceAfterDiscount, 0);
    }

    // Create tickets
    const ticketData = Array.from({ length: quantity }, () => ({
      eventId,
      userId,
      price: pricePerTicketAfterDiscount,
      status: Status.Active,
      purchaseDate: new Date(),
      quantity: 1,
      totalPrice: priceAfterDiscount,
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
