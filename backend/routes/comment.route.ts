import { Router } from "express";
import { createComment, 
        deleteComment, 
        getAllComments, 
        updateComment 
} from "@/controllers/comment.controller.js";

const router = Router();

router.get("/", getAllComments)
router.post("/", createComment)
router.put("/:id", updateComment)
router.delete("/:id", deleteComment)

export default router;