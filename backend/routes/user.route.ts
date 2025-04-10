import { Router } from "express";
import { createUser, 
         deleteUser, 
         getUserById, 
         updateUser
} from "@/controllers/user.controller.js";

const router = Router()

router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router