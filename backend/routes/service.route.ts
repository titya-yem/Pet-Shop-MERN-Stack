import {Router} from 'express';
import { createService, 
        deleteService, 
        getAllServices, 
        updateService 
} from '../controllers/service.controller.js';
import admin from '@/middlewares/admin.middleware.js';

const router = Router();

router.get("/", getAllServices)
router.post("/", admin, createService)
router.put("/:id", admin, updateService)
router.delete("/:id", admin, deleteService)

export default router;

