import Service from "@/models/service.model";
import serviceValidation from "@/validations/service.validation";
import { Request, Response } from "express";

// Get all services
export const getAllServices = async (req: Request, res: Response): Promise<void | any> => {
    try {
        const services = await Service.find();
        if(!services || services.length === 0) {
            return res.status(404).json({ message: "No services found" });
        }

        res.status(200).json(services);        
    } catch (error) {
        console.error("Error fetching services:", error);
        res.status(404).json({ message: "Error fetching services" });
    }
}

// Get a service by ID
export const createService = async (req: Request, res: Response): Promise<void | any> => {
    try {
        const { error, value } = serviceValidation.validate(req.body, { abortEarly: false });
        if(error) {
            return res.status(400).json({ message: "Validation failed", details: error.details.map((d) => d.message) });
        }

        const newService = new Service(value);
        await newService.save();

        res.status(201).json({ message: "Service created successfully", service: newService });
    } catch (error) {
        console.error("Error creating service:", error);
        res.status(500).json({ message: "Error creating service" });
    }
}

// Update services by ID
export const updateService = async (req: Request, res: Response): Promise<void | any> => {
    try {
        const {id} = req.params;
        if(!id) {
            return res.status(400).json({ message: "Service ID is required" });
        }

        const { error, value } = serviceValidation.validate(req.body, { abortEarly: false });
        if(error) {
            return res.status(400).json({ message: "Validation failed", details: error.details.map((d) => d.message) });
        }

        const updatedService = await Service.findByIdAndUpdate(id, value, { new: true });
        if(!updatedService) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.status(200).json({ message: "Service updated successfully", service: updatedService });
    } catch (error) {
        console.error("Error updating service:", error);
        res.status(500).json({ message: "Error updating service" });
    }
}

// Delete services by ID
export const deleteService = async (req: Request, res: Response): Promise<void | any> => {
    try {
        const {id} = req.params;
        if(!id) {
            return res.status(400).json({ message: "Service ID is required" });
        }

        const deletedService = await Service.findByIdAndDelete(id, { new: true });
        if(!deletedService) {
            return res.status(404).json({ message: "Service not found" });
        }
        
        res.status(200).json({ message: "Service deleted successfully", service: deletedService });
    } catch (error) {
        console.error("Error deleting service:", error);
        res.status(500).json({ message: "Error deleting service" });
    }
}