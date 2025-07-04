import { Router } from 'express';
import { CustomerController } from '../controllers/CustomerController';

const router = Router();

router.post('/customer', CustomerController.create);

export default router;
