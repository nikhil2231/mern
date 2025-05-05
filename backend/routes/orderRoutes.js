import express from 'express';
import { admin, protect } from '../middlware/authMiddleware.js';
import { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders , getUsersOrder, updateOrderToDelivered } from '../controllers/orderController.js';

const Router = express.Router();

 
Router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
Router.route('/myorders').get(protect, getMyOrders);
Router.route('/usersorder').get(protect, getUsersOrder)
Router.route('/:id').get(protect, getOrderById);
Router.route('/:id/pay').put(protect, updateOrderToPaid);
Router.route('/:id/deliver').put(protect,admin, updateOrderToDelivered );













export default Router;