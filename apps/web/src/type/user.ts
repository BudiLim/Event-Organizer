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
  role: string;
}

export interface Event {
  id: number;
  name: string;
  location: string;
  availableSeats: number;
  ticketsSold: number;
}

export interface DashboardData {
  fullName: string;
  totalRevenue: number;
  totalOrders: number;
  events: Event[];
  previousWeekRevenue: number;
  previousWeekTicketsSold: number;
}
