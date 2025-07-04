import { Router } from 'express';
import { MenuController } from '../controllers/MenuController';

const router = Router();

router.post('/menu', MenuController.create);
router.get('/menu', MenuController.list);

export default router;
