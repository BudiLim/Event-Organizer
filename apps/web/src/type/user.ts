export interface IUserReg {
    firstName: String
    lastName: String
    email: String
    phone: String
    password: String
    userType: String
    referralCode?: String
}

export interface IUserLogin {
    email: string
    password: string
}

export interface DecodedToken {
    id: string;
    userType: string;
}