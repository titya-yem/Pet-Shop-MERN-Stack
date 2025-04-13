import { Router } from "express";
import { createUser, 
         deleteUser, 
         getUserById, 
         updateUser,
         user
} from "@/controllers/user.controller.js";
import auth from "@/middlewares/auth.middleware.js";

const router = Router()

router.get("/me", auth, user);
router.get("/:id", auth, getUserById);
router.post("/", createUser);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);

export default router