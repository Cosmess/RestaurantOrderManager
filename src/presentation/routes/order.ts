import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';

const router = Router();

router.post('/order', OrderController.create);
router.get('/customer/orders/:customer_id', OrderController.listByCustomer);
router.patch('/order/:order_id', OrderController.updateStatus);
router.patch('/order/modify/:order_id', OrderController.modify);

export default router;
