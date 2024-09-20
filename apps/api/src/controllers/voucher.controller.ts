import prisma from '@/prisma';
import { Request, Response } from 'express';

export class VoucherController {
  async getMyVoucherDetails(req: Request, res: Response) {
    const voucherParam = req.params.userId;
    const userId = parseInt(voucherParam, 10);

    if (isNaN(userId)) {
      return res.status(400).send({
        status: 'error',
        msg: 'Invalid user ID!',
      });
    }

    try {
      const voucherDetails = await prisma.discount.findMany({
        where: { userId },
        select: {
          id: true,
          voucherCode: true,
          validUntil: true,
          discountVoucher: true,
        },
    })

      if (!voucherDetails) {
        return res.status(404).send({
          status: 'error',
          msg: 'User not found!',
        });
      }

      return res.status(200).json({
        status: 'success',
        data: voucherDetails,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Unable to fetch ticket details',
        details: error instanceof Error ? error.message : String(error),
      });
    }
  }
}
