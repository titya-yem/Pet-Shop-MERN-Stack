import { Request, Response } from 'express';
import Appointment from '../models/appointment.model.js';
import AppointmentValidation from "../validations/appointment.validation.js"

// Get all appointments
export const getAllAppointments = async (req: Request, res: Response): Promise <void | any> => {
    try {
        const appointments = await Appointment.find().populate('user', 'name email').populate('service', 'title price');
        if (!appointments) {
            return res.status(404).json({ message: 'No appointments found' });
        }
        
        res.status(200).json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Create a new appointment
export const createAppointment = async (req: Request, res: Response): Promise <void | any> => {
    try {
        const {error, value} = AppointmentValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const newAppointment = new Appointment(value);
        if (!newAppointment) {
            return res.status(400).json({ message: 'Invalid appointment data' });
        }
        await newAppointment.save();

        res.status(201).json(newAppointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Delete an appointment
export const deleteAppointment = async (req: Request, res: Response): Promise <void | any> => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Appointment ID is required' });
        }

        const deleteAppointment = await Appointment.findByIdAndDelete(id);
        if (!deleteAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}