import {Router} from 'express';
import { createService, 
        deleteService, 
        getAllServices, 
        updateService 
} from '../controllers/service.controller.js';

const router = Router();

router.get("/", getAllServices)
router.post("/", createService)
router.put("/:id", updateService)
router.delete("/:id", deleteService)

export default router;

