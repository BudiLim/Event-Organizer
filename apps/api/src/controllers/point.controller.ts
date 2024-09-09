/// ini gk kepake, atau belum kepake ya, simpen aja dulu ///

import { Request, Response } from 'express';
import prisma from '@/prisma';

export class PointsController {
  async createPoints(req: Request, res: Response) {
    try {
      const { userId, points, expiresAt } = req.body;

      // Validate inputs
      if (points <= 0 || !expiresAt) {
        return res.status(400).send({
          status: 'error',
          msg: 'Invalid points or expiration date.',
        });
      }

      // Create points entry
      await prisma.points.create({
        data: {
          userId,
          points,
          expiresAt: new Date(expiresAt),
        },
      });

      // Optionally update the user's total points
      await this.updateUserPoints(userId);

      res.status(201).send({
        status: 'ok',
        msg: 'Points created successfully!',
      });
    } catch (err) {
      console.error('Error creating points:', err);
      res.status(400).send({
        status: 'error',
        msg: 'An error occurred while creating points.',
      });
    }
  }

  async updateUserPoints(userId: number) {
    try {
      // Calculate the total points for the user
      const totalPoints = await prisma.points.aggregate({
        _sum: {
          points: true,
        },
        where: {
          userId,
          expiresAt: {
            gte: new Date(), // Only consider points that are not expired
          },
        },
      });

      // Update the user's points field
      await prisma.user.update({
        where: { id: userId },
        data: {
          points: totalPoints._sum.points || 0,
        },
      });
    } catch (err) {
      console.error('Error updating user points:', err);
    }
  }

  async getPointsHistory(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const pointsHistory = await prisma.points.findMany({
        where: { userId: +userId },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'Points history fetched!',
        pointsHistory,
      });
    } catch (err) {
      console.error('Error fetching points history:', err);
      res.status(400).send({
        status: 'error',
        msg: 'An error occurred while fetching points history.',
      });
    }
  }
}
