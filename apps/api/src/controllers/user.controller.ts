import prisma from '@/prisma';
import { Request, Response } from 'express';
import { compare, genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import generateReferralCode from '@/middlewares/uniquecode';

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        phone,
        userType,
        referralCode,
      } = req.body;

      console.log(req.body)

      // Check if the email is already used
      const existingUser = await prisma.user.findUnique({
        where: { email: email },
      });

      if (existingUser) {
        console.log(existingUser)
        throw 'Email has already been used!';
      }  

      let referralOwnerName: string | null = null;
      let referrerId: number | null = null;

      // Validate referral code if provided
      if (referralCode) {
        const existingReferralCode = await prisma.user.findUnique({
          where: { userUniqueCode: referralCode },
        });

        if (!existingReferralCode) {
          return res.status(400).send({
            status: 'error',
            msg: 'Referral code is invalid!',
          });
        }

        referralOwnerName = `${existingReferralCode.firstName} ${existingReferralCode.lastName}`;
        referrerId = existingReferralCode.id;
      }

      // Hash the password
      const salt = await genSalt(10);
      const hashPassword = await hash(password, salt);

      // Generate a new unique code for the user
      const userUniqueCode = await generateReferralCode(firstName);

      // Create the new user
      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashPassword,
          phone,
          userType,
          referralCode: referralCode || null, // Store referral code if provided
          userUniqueCode,
        },
      });

      // Record the referral usage if applicable
      if (referrerId) {
        await prisma.referral.create({
          data: {
            referrerId: referrerId,
            referredId: user.id,
          },
        });
      }

      res.status(201).send({
        status: 'ok',
        msg: 'User created successfully!',
        user,
        referralOwnerName,
      });
    } catch (err) {
      console.error(err);
      res.status(400).send({
        status: 'error',
        msg: err instanceof Error ? err.message : 'An error occurred while creating user.',
      });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const existingUser = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!existingUser) throw 'user not found!';

      const isValidPass = await compare(password, existingUser.password);

      if (!isValidPass) throw 'incorrect password!';

      const payload = { id: existingUser.id, userType: existingUser.userType };
      const token = sign(payload, process.env.SECRET_JWT!, { expiresIn: '1d' });

      res.status(200).send({
        status: 'ok',
        msg: 'login success!',
        token,
        user: existingUser,
      });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async verifyUser(req: Request, res: Response) {
    try {
      const author = await prisma.user.findUnique({
        where: { id: req.user?.id },
      });
      if (author?.isActive) throw 'invalid link';

      await prisma.user.update({
        data: { isActive: true },
        where: { id: req.user?.id },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'success verify author !',
      });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const user = await prisma.user.findMany();
      res.status(200).send({
        status: 'ok',
        msg: 'user fetched!',
        user,
      });
    } catch (err) {
      console.error(err);
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async getUserId(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: +req.params.id },
      });
      if (!user) throw 'user not found!';
      res.status(200).send({
        status: 'ok',
        msg: 'user fetched!',
        user,
      });
    } catch (err) {
      console.error(err);
      res.status(400).send({
        status: 'error',
        msg: err,
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { firstName, lastName, phone, email, password, currentPassword } =
        req.body;
      const userId = req.user?.id;

      if (!userId) throw new Error('User not authenticated');

      // Retrieve the current user data
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) throw new Error('User not found');

      // Check if the user wants to update the password
      let hashedPassword;
      if (password) {
        // Ensure the user provided the current password
        if (!currentPassword) {
          return res.status(400).send({
            status: 'error',
            msg: 'Current password is required to update the password.',
          });
        }

        // Verify the current password matches the stored password
        const isPasswordValid = await compare(currentPassword, user.password);
        if (!isPasswordValid) {
          return res.status(400).send({
            status: 'error',
            msg: 'Current password is incorrect.',
          });
        }

        // If the current password is correct, hash the new password
        hashedPassword = await hash(password, await genSalt(10));
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          firstName,
          lastName,
          phone,
          email,
          ...(hashedPassword && { password: hashedPassword }), // Update the password if hashed
        },
      });

      res.status(200).send({
        status: 'ok',
        msg: 'User information updated successfully!',
        user: updatedUser,
      });
    } catch (err) {
      console.error('Update Error:', err);
      res.status(400).send({
        status: 'error',
        msg: 'An error occurred while updating user information',
      });
    }
  }
}
