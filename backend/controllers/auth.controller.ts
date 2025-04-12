import { Request, Response } from 'express';
import User from '../models/user.model.js';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

export const login = async (req: Request, res: Response): Promise<void | any> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Get JWT secret
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT secret is not defined");

    // Generate token
    const payload = _.pick(user, ['_id', 'email', 'role']);
    const token = jwt.sign(payload, secret, { expiresIn: '2h' });

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
      sameSite: 'strict',
    });

    res.status(200).json({message: 'Login successful',user: payload,token,});
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: process.env.NODE_ENV === 'development' ? error.message : 'Error logging in',
    });
  }
};

export const logout = async (req: Request, res: Response): Promise<void | any> => {
  try {
    
    // Clear the cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: 'lax',
    })

    res.status(200).json({ message: 'Logout successful' });
  } 
  catch (error: any) {
    console.error(error);
    res.status(500).json({
    message: process.env.NODE_ENV === 'development' ? error.message : 'Error logging out',
    });
  }
}