import { Router } from 'express';
import customerRoutes from './customer';
import menuRoutes from './menu';
import orderRoutes from './order';

const router = Router();

router.use(customerRoutes);
router.use(menuRoutes);
router.use(orderRoutes);

export default router;
