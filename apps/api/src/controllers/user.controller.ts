import prisma from '@/prisma';
import { Request, Response } from 'express';
import { compare, genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import generateReferralCode from '@/middlewares/uniquecode';

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, password, phone, userType, referralCode } = req.body;

      const existingUser = await prisma.user.findUnique({
        where: { email: email }
      });

      if (existingUser) throw "email has been used!";

      const salt = await genSalt(10);
      const hashPassword = await hash(password, salt);
      const userUniqueCode = await generateReferralCode(firstName);

      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashPassword,
          phone,
          userType,
          referralCode,
          userUniqueCode
        }
      });

      res.status(201).send({
        status: 'ok',
        msg: 'user created!',
        user
      });
    } catch (err) {
      console.error(err);
      res.status(400).send({
        status: 'error',
        msg: err
      });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const existingUser = await prisma.user.findUnique({
        where: { email: email }
      });

      if (!existingUser) throw "user not found!";

      const isValidPass = await compare(password, existingUser.password);

      if (!isValidPass) throw "incorrect password!";

      const payload = { id: existingUser.id, userType: existingUser.userType };
      const token = sign(payload, process.env.SECRET_JWT!, { expiresIn: '1d' });

      res.status(200).send({
        status: 'ok',
        msg: "login success!",
        token,
        user: existingUser
      });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err
      });
    }
  }

  async verifyUser(req: Request, res: Response) {
    try {
        const author = await prisma.user.findUnique({
            where: { id: req.user?.id }
        })
        if (author?.isActive) throw "invalid link"

        await prisma.user.update({
            data: { isActive: true },
            where: { id: req.user?.id }
        })

        res.status(200).send({
            status: 'ok',
            msg: "success verify author !"
        })
    } catch (err) {
        res.status(400).send({
            status: 'error',
            msg: err
        })
    }
}

  async getUser(req: Request, res: Response) {
    try {
      const user = await prisma.user.findMany();
      res.status(200).send({
        status: 'ok',
        msg: 'user fetched!',
        user
      });
    } catch (err) {
      console.error(err);
      res.status(400).send({
        status: 'error',
        msg: err
      });
    }
  }

  async getUserId(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: +req.params.id }
      });
      if (!user) throw 'user not found!';
      res.status(200).send({
        status: 'ok',
        msg: 'user fetched!',
        user
      });
    } catch (err) {
      console.error(err);
      res.status(400).send({
        status: 'error',
        msg: err
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { firstName, lastName, phone, email, password } = req.body;
      const userId = req.user?.id;
  
      if (!userId) throw new Error('User not authenticated');
  
      // Hash the new password if provided
      const hashedPassword = password ? await hash(password, await genSalt(10)) : undefined;
  
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          firstName,
          lastName,
          phone,
          email,
          ...(hashedPassword && { password: hashedPassword })  // Update password only if it's provided
        }
      });
  
      res.status(200).send({
        status: 'ok',
        msg: 'User information updated successfully!',
        user: updatedUser
      });
    } catch (err) {
      console.error('Update Error:', err);
      res.status(400).send({
        status: 'error',
        msg: 'An error occurred while updating user information'
      });
    }
  }
}