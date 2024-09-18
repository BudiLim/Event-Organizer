import { TicketService } from '@/services/ticket.service';
import prisma from '@/prisma';
import { Request, Response } from 'express';

export class TicketController {
  async getMyTicketDetails(req: Request, res: Response) {
    const ticketParam = req.params.userId;
    const userId = parseInt(ticketParam, 10);

    if (isNaN(userId)) {
      return res.status(400).send({
        status: 'error',
        msg: 'Invalid user ID!',
      });
    }

    try {
      const ticketDetails = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          tickets: {
            select: {
              id: true,
              price: true,
              status: true,
              purchaseDate: true,
              event: {
                select: {
                  id: true,
                  image: true,
                  name: true,
                  eventDate: true,
                  eventTime: true,
                  sellEndDate: true,
                  sellEndTime: true,
                  availableSeats: true,
                  location: true,
                  isPaidEvent: true,
                  price: true,
                },
              },
            },
          },
        },
      });

      if (!ticketDetails) {
        return res.status(404).send({
          status: 'error',
          msg: 'User not found!',
        });
      }

      return res.status(200).json({
        status: 'success',
        data: ticketDetails,
      });
    } catch (error) {
      console.error('Error fetching ticket details:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Unable to fetch ticket details',
        details: error instanceof Error ? error.message : String(error),
      });
    }
  }

  async getTicketId(req: Request, res: Response) {
    const userId = parseInt(req.params.userId, 10);
    const ticketId = parseInt(req.params.id, 10);

    if (isNaN(userId) || isNaN(ticketId)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid user ID or ticket ID',
      });
    }

    try {
      // Fetch the specific ticket for the user
      const userWithTicket = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          tickets: {
            where: { id: ticketId },
            include: {
              event: true,
            },
          },
        },
      });

      if (!userWithTicket || userWithTicket.tickets.length === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'Ticket not found for this user',
        });
      }

      return res.status(200).json({
        status: 'success',
        ticket: userWithTicket.tickets[0],
      });
    } catch (error) {
      console.error('Error fetching ticket by user ID and ticket ID:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Unable to fetch ticket details',
        details: error instanceof Error ? error.message : String(error),
      });
    }
  }

  async createTicket(req: Request, res: Response) {
    const { eventId, quantity, price, discountCode } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    try {
      // Calculate total amount before discount
      const totalAmountBeforeDiscount = price * quantity;

      // Initialize discountAmount
      let discountAmount = 0;

      if (discountCode) {
        // Validate and apply the discount code
        const discount = await prisma.promotion.findUnique({
          where: { discountCode: discountCode },
        });

        if (!discount) {
          return res.status(400).json({
            status: 'error',
            message: 'Invalid or expired discount code.',
          });
        }

        if (new Date() > new Date(discount.validUntil)) {
          return res.status(400).json({
            status: 'error',
            message: 'Discount code has expired.',
          });
        }

        // Get the discount amount from the database
        discountAmount = discount.amount;
      }

      // Calculate the final amount after discount
      const amountDiscount = (totalAmountBeforeDiscount * discountAmount) / 100;
      const finalAmount = totalAmountBeforeDiscount - amountDiscount;
      const singleDiscount = (price * discountAmount) / 100;
      const singlePrice = price - singleDiscount;

      // Proceed with ticket creation
      const ticket = await TicketService.purchaseTicket({
        userId,
        eventId,
        quantity: quantity,
        price: singlePrice,
        discountCode,
      });

      // Record the transaction with the final amount
      const transaction = await prisma.transaction.create({
        data: {
          userId,
          eventId,
          amount: finalAmount,
        },
      });

      return res.status(201).json({
        status: 'success',
        ticket,
        finalAmount,
      });
    } catch (error) {
      console.error('Error creating ticket:', error);
      return res.status(400).json({
        status: 'error',
        message: 'Ticket creation failed',
        details: error instanceof Error ? error.message : String(error),
      });
    }
  }
}
