import { Router } from "express";
import { createAppointment, 
         deleteAppointment, 
         getAllAppointments 
} from "@/controllers/appointment.controller.js";

const router = Router();


router.get("/", getAllAppointments)
router.post("/", createAppointment)
router.delete("/:id", deleteAppointment)

export default router;