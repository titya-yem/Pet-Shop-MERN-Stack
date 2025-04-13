import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Access denied. Unauthorized' });
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Access denied. Unauthorized' });
    return;
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET as string);

    if (typeof decoded === 'object' && decoded !== null) {
      req.user = decoded as { id: string; email: string; role: string };
    } else {
      throw new Error('Invalid token payload');
    }

    next();
  } catch (error) {
    console.error('JWT Error:', error instanceof Error ? error.message : 'Unknown error');
    res.status(400).json({ message: 'Invalid token' });
  }
};

export default auth;
