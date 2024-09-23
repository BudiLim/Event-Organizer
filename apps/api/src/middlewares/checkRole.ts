import { Request, Response, NextFunction } from 'express';

// Middleware to check user's role
export const checkRole = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const user = req.user; // Pastikan ini di-set oleh middleware autentikasi
  
      if (!user) {
        return res.status(401).json({
          status: 'error',
          msg: 'User is not authenticated',
        });
      }
  
      if (!allowedRoles.includes(user.userType)) {
        return res.status(403).json({
          status: 'error',
          msg: `Access forbidden: ${allowedRoles.join(', ')} only`,
        });
      }
  
      next(); // Jika role cocok, lanjutkan
    };
  };
  