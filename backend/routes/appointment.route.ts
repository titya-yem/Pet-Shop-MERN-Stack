import { Router } from "express";
import { createAppointment, 
         deleteAppointment, 
         getAllAppointments 
} from "@/controllers/appointment.controller.js";
import auth from "@/middlewares/auth.middleware.js";

const router = Router();


router.get("/", getAllAppointments)
router.post("/", auth, createAppointment)
router.delete("/:id", auth, deleteAppointment)

export default router;