import { Router } from "express";
import { createComment, 
        deleteComment, 
        getAllComments, 
        updateComment 
} from "@/controllers/comment.controller.js";
import auth from "@/middlewares/auth.middleware.js";

const router = Router();

router.get("/", getAllComments)
router.post("/", auth, createComment)
router.put("/:id", auth, updateComment)
router.delete("/:id", auth, deleteComment)

export default router;