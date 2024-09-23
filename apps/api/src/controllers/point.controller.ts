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

  async getUserPoints(req: Request, res: Response) {
    const pointsParam = req.params.userId;
    const userId = parseInt(pointsParam, 10);

    if (isNaN(userId)) {
      return res.status(400).send({
        status: 'error',
        msg: 'Invalid user ID!',
      });
    }

    try {
      // Aggregate the sum of points for the user, excluding expired ones
      const pointsAggregate = await prisma.points.aggregate({
        _sum: {
          points: true,
        },
        where: {
          userId: userId,
          expiresAt: {
            gte: new Date(), // Only include non-expired points
          },
        },
      });

      const totalPoints = pointsAggregate._sum.points || 0;

      if (totalPoints === 0) {
        return res.status(404).send({
          status: 'error',
          msg: 'No valid points found for the user!',
        });
      }

      // Fetch points with nearest expiration date
      const nearestExpirationPoint = await prisma.points.findFirst({
        where: {
          userId: userId,
          expiresAt: {
            gte: new Date(),
          },
        },
        orderBy: {
          expiresAt: 'asc', // Order by nearest expiration date
        },
      });

      return res.status(200).json({
        status: 'success',
        totalPoints: totalPoints,
        nearestExpiration: nearestExpirationPoint?.expiresAt,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Unable to fetch points details',
        details: error instanceof Error ? error.message : String(error),
      });
    }
  }


  async usePoints(req: Request, res: Response) {
    try {
      const { userId, pointsToUse } = req.body;
  
      // Step 1: Fetch valid points (non-expired) for the user
      const userPoints = await prisma.points.aggregate({
        _sum: { points: true },
        where: {
          userId: userId,
          expiresAt: {
            gte: new Date(),  // Only consider valid, non-expired points
          },
        },
      });
  
      const totalPoints = userPoints._sum.points || 0;
  
      // Step 2: Check if user has enough points
      if (totalPoints < pointsToUse) {
        return res.status(400).send({
          status: 'error',
          msg: 'Not enough points to complete the transaction.',
        });
      }
  
      // Step 3: Deduct points (you may need a more complex logic for partial point deduction)
      await prisma.points.updateMany({
        where: {
          userId: userId,
          expiresAt: {
            gte: new Date(),  // Only deduct valid points
          },
        },
        data: {
          points: {
            decrement: pointsToUse,
          },
        },
      });
  
      return res.status(200).send({
        status: 'ok',
        msg: 'Points used successfully!',
      });
    } catch (err) {
      console.error('Error using points:', err);
      res.status(400).send({
        status: 'error',
        msg: 'An error occurred while using points.',
      });
    }
  }
  
  
}
