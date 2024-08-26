import { Request, Response } from 'express';
import prisma from '@/prisma';
import argon2 from 'argon2';

export class LoginController {
  async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      // Find the user by email
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      // Compare the password with the hashed password
      const isPasswordValid = await argon2.verify(user.password, password);

      if (!isPasswordValid) {
        res.status(401).json({ error: 'Invalid password' });
        return;
      }

      // Proceed with creating a session, JWT, etc.
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
