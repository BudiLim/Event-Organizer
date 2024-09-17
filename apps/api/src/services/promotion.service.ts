import { PrismaClient, Promotion } from '@prisma/client';

const prisma = new PrismaClient(); // Initialize Prisma client

export class PromotionService {
  async applyDiscount(
    discountCode: string,
    eventId: number,
  ): Promise<{ amount: number } | null> {
    console.log(`Applying discount: ${discountCode} for event ${eventId}`);
    
    // Validate the discount code
    const promotion = await this.validateDiscountCode(discountCode, eventId);
    console.log('Promotion:', promotion);
  
    if (promotion) {
      if (this.isPromotionValid(promotion)) {
        if (this.isQuotaAvailable(promotion)) {
          await this.updateQuota(promotion.id);
          return { amount: promotion.amount };
        } else {
          console.log('No quota available');
          return null;
        }
      } else {
        console.log('Promotion not valid');
        return null;
      }
    } else {
      console.log('Promotion not found');
      return null;
    }
  }

  private async validateDiscountCode(
    code: string,
    eventId: number,
  ): Promise<Promotion | null> {
    try {
      // Retrieve the promotion record
      const promotion = await prisma.promotion.findFirst({
        where: {
          discountCode: code,
          eventId: eventId,
        },
      });

      return promotion;
    } catch (error) {
      console.error('Error validating discount code:', error);
      return null;
    }
  }

  private isPromotionValid(promotion: Promotion): boolean {
    // Check if the promotion is valid
    const now = new Date();
    return promotion.validUntil > now; // Check if the promotion is not expired
  }

  private isQuotaAvailable(promotion: Promotion): boolean {
    // Check if the promotion quota is available
    const quotaAvailable = Number(promotion.quotaAvailable); // Convert to number if needed
    const quotaUsed = Number(promotion.quotaUsed); // Convert to number if needed

    return quotaAvailable - quotaUsed > 0; // Ensure there is available quota
  }

  private async updateQuota(promotionId: number): Promise<void> {
    try {
      // Update the quota used for the promotion
      await prisma.promotion.update({
        where: { id: promotionId },
        data: {
          quotaUsed: {
            increment: 1, // Increment the used quota
          },
        },
      });
    } catch (error) {
      console.error('Error updating promotion quota:', error);
    }
  }
}
