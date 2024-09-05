type User = {
    id: number,
    userType: string
}

declare namespace Express {
    export interface Request {
        user?: User
    }
}