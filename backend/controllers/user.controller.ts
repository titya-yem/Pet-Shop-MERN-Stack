import { Request, Response } from 'express';
import User from '../models/user.model.js';
import userValidation from '@/validations/user.validation.js';
import _ from 'lodash';
import bcrypt from 'bcrypt';

// Get user by ID
export const getUserById = async (req: Request, res: Response): Promise<void | any> => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const uniqueUser = await User.findById(id).select('-password -__v');
        if (!uniqueUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(uniqueUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void | any> => {
    try {
        const { error, value } = userValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(value.password, salt);

        const user = new User({ ...value, password: hashedPassword });
        const existingUser = await User.findOne({ email: value.email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        await user.save();
        return res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update user
// Update user details
export const updateUser = async (req: Request, res: Response): Promise<void | any> => {
    try {
        const { id } = req.params;
        const { error, value } = userValidation.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        if (!id) return res.status(400).json({ message: 'User ID is required' });

        // Check if the logged-in user is trying to update their own account or another user's account
        if (req.user?.id !== id && req.user?.role !== 'admin') {
            return res.status(403).json({ message: 'You are not authorized to update this user' });
        }

        // If the logged-in user is a regular user (role: user)
        if (req.user?.role === 'user') {
            // Only allow updating 'userName', 'email', or 'password' for regular users
            const allowedFields = ['userName', 'email', 'password'];
            const updates = _.pick(value, allowedFields);

            // If password is being updated, check the current password
            if (updates.password) {
                const user = await User.findById(id);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                // Compare the old password with the stored password
                if (!user.password) {
                    return res.status(400).json({ message: 'Password is not set for this user' });
                }
                const isPasswordValid = await bcrypt.compare(value.oldPassword, user.password);
                if (!isPasswordValid) {
                    return res.status(400).json({ message: 'Current password is incorrect' });
                }

                // Hash the new password before updating it
                const salt = await bcrypt.genSalt(10);
                updates.password = await bcrypt.hash(updates.password, salt);
            }

            const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
            if (!updatedUser) return res.status(404).json({ message: 'User not found' });

            return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
        }

        // If the logged-in user is an admin (role: admin), they can update all fields
        if (req.user?.role === 'admin') {
            const updatedUser = await User.findByIdAndUpdate(id, value, { new: true });
            if (!updatedUser) return res.status(404).json({ message: 'User not found' });

            return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
        }

        return res.status(403).json({ message: 'You are not authorized to update this user' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response): Promise<void | any> => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: 'User ID is required' });

        // Admin can delete any user's account
        if (req.user?.role === 'admin') {
            const deletedUser = await User.findByIdAndDelete(id);
            if (!deletedUser) return res.status(404).json({ message: 'User not found' });

            return res.status(200).json({ message: 'User deleted successfully' });
        }

        // Regular users can only delete their own account (if it's the same user)
        if (id === req.user?.id) {
            const deletedUser = await User.findByIdAndDelete(id);
            if (!deletedUser) return res.status(404).json({ message: 'User not found' });

            return res.status(200).json({ message: 'Your account has been deleted successfully' });
        }

        return res.status(403).json({ message: 'You are not authorized to delete this user' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
