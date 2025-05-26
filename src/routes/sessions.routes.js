import { Router } from 'express';
import { authJWT, getCurrentUser } from '../middleware/current.js';
import { getCurrentUser as getCurrentController } from '../controllers/sessions.controller.js';

const router = Router();

router.get('/current', authJWT, getCurrentController);

export default router;
