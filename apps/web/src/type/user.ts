export interface IUserReg {
  firstName: String;
  lastName: String;
  email: String;
  phone: String;
  password: String;
  userType: String;
  referralCode?: String;
  points?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface DecodedToken {
  id: string;
  userType: string;
  organizerId: string;
  userId: string;
}

export interface Referral {
  id: number;
  referrerId: number;
  referredId: number;
  pointsAwarded: number;
  expiresAt: Date;
  usedAt: Date;
  expired: boolean;
}

export interface IUserState {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  points: number;
  voucherCode: String;
  discount: Discount;
}

export interface Event {
  id: number;
  name: string;
  description: string;
  location: string;
  eventDate: string;
  eventTime: string;
  sellEndDate: string;
  sellEndTime: string;
  price: number;
  image?: string;
  availableSeats: number;
  isPaidEvent: string;
  category: string;
  organizer: {
    id: number;
    name: string;
  };
  discount: {
    id: number;
    userId: number;
    discountVoucher: number;
    voucherCode: string;
    validUntil: string;
  };
}

export interface DashboardData {
  fullName: string;
  totalRevenue: number;
  totalOrders: number;
  totalTicketsSold: number;
  events: Event[];
  previousWeekRevenue: number; // For comparison
  previousWeekTicketsSold: number; // For comparison
  previousWeekOrders: number; // For comparison
  monthlyRevenue: { month: number; revenue: number }[]; // Changed to reflect the monthly data structure
}

export interface Ticket {
  id: number;
  event: Event;
  purchaseDate: string;
  price: number;
  status: string;
  events: Event[];
}

export interface TicketDetails {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  tickets: Ticket[];
  ticket: Ticket;
  event: Event;
  voucher: Discount;
  vouchers: Discount[];
}

export interface TicketPurchaseData {
  userId: number;
  eventId: number;
  quantity: number;
  paymentMethod: string;
  discountCode?: string;
}

export interface Discount {
  id: number;
  userId: number;
  discountVoucher: number;
  voucherCode: string;
  validUntil: string;
}

export interface Points {
  id: number;
  userId: number;
  points: number;
  expiresAt: string;
  expired: Boolean;
}

export interface JwtPayload {
  id: string;
}
