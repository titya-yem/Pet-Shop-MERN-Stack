import { Request, Response, NextFunction } from "express";


const admin = (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.user || req.user.role !== "admin") {
            res.status(403).json({message: "Access denied. Admin only."})
            return;
        }

        next()
    } catch (error) {
        console.log(error)
        res.status(500).send("Server error")
    }
}

export default admin;