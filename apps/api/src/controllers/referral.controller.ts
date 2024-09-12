/// ini gk kepake, atau belum kepake ya, simpen aja dulu ///

import { Request, Response } from 'express';
import prisma from '@/prisma';
import dayjs from 'dayjs'; // For handling dates

export class ReferralController {
  // Method to get referral data
  async getReferralById(req: Request, res: Response): Promise<void> {
    const userId = parseInt(req.params.id);
    try {
      const referral = await prisma.referral.findFirst({
        where: {
          referredId: userId,
        },
      });

      if (!referral) {
        res.status(404).json({ message: 'Referral not found' });
        return;
      }

      res.json(referral);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  }

  // Method to apply a referral code and reward points
  async applyReferralCode(referrerId: number, referredId: number) {
    try {
      const pointsToGive = 10000; // Amount of points per referral
      const expiryDate = dayjs().add(3, 'months').toDate(); // Points expire in 3 months

      // Create referral record
      await prisma.referral.create({
        data: {
          referrerId,
          referredId,
          pointsAwarded: pointsToGive,
          expiresAt: expiryDate,
        },
      });

      // Add points to the referrer's account
      await prisma.user.update({
        where: { id: referrerId },
        data: {
          points: {
            increment: pointsToGive,
          },
        },
      });
    } catch (err) {
      throw new Error('Failed to apply referral code');
    }
  }

  // Method to mark a referral as expired
  async markReferralAsExpired(req: Request, res: Response): Promise<void> {
    try {
      const referralId = parseInt(req.params.id);

      // Mark the referral as expired
      await prisma.referral.update({
        where: { id: referralId },
        data: { expired: true },
      });

      res.json({ message: 'Referral marked as expired' });
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Failed to mark referral as expired', error: err });
    }
  }

  // Method to deduct expired points
  async expirePoints() {
    try {
      const now = new Date();

      // Find expired referrals
      const expiredReferrals = await prisma.referral.findMany({
        where: {
          expiresAt: {
            lte: now, // Less than or equal to current date
          },
        },
      });

      for (const referral of expiredReferrals) {
        // Deduct points from the referrer
        await prisma.user.update({
          where: { id: referral.referrerId },
          data: {
            points: {
              decrement: referral.pointsAwarded,
            },
          },
        });

        // Mark the referral as expired
        await prisma.referral.update({
          where: { id: referral.id },
          data: { expired: true },
        });
      }
    } catch (err) {
      throw new Error('Failed to expire points');
    }
  }
}
