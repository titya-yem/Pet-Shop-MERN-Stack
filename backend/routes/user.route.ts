import { Router } from "express";
import { createUser, 
         deleteUser, 
         getUserById, 
         updateUser,
         user
} from "@/controllers/user.controller.js";
import auth from "@/middlewares/auth.middleware.js";
import admin from "@/middlewares/admin.middleware.js";

const router = Router()

router.get("/me", auth, user);
router.get("/:id", auth, admin, getUserById);
router.post("/", createUser);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, admin, deleteUser);

export default router