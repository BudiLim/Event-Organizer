export interface IUserReg {
    firstName: String
    lastName: String
    email: String
    phone: String
    password: String
    userType: String
    referralCode?: String
    points?: string
}

export interface IUserLogin {
    email: string
    password: string
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