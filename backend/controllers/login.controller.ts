import User from '@/models/user.model';
import { Request, Response } from 'express';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';


export const login = async (req: Request, res: Response): Promise <void | any> => {
    try {
        const {email, password} = req.body

        // Validate the email and password
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if the user exists in the database
        const existsEmail = await User.findOne({ email });
        if (!existsEmail) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if the password is correct
        const isPasswordValid = await compare(password, existsEmail.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if JWT_SECRET is defined
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error("JWT secret is not defined");

        // Generate a JWT token
        const token = jwt.sign({id: existsEmail._id, role: existsEmail.role, email: existsEmail.email}, secret, {expiresIn: '1h'})

        res.status(200).json({ token, user: _.pick(existsEmail, ['_id', 'email', 'role']), message: 'Login successful' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error logging in' });        
    }
}