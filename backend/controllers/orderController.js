import expressAsyncHandler from "express-async-handler";
import Order from '../models/orderModel.js';

//@desc  Create a New order
//@route POST /api/orders/;
//@access Private 

const addOrderItems = expressAsyncHandler(async(req, res) => {
    const {
        orderItems, 
        shippingAddress, 
        paymentMethod,
        itemsPrice,
        taxPrice, 
        shippingPrice,
        totalPrice 
    } = req.body; 
    console.log(paymentMethod);
  
    if(orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items were found');
    } else {
        const order = new Order({
            orderItems, 
            user: req.user._id,
            shippingAddress, 
            paymentMethod,
            itemsPrice,
            taxPrice, 
            shippingPrice,
            totalPrice 
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});



//@desc  get orders by id
//@route Get /api/orders/:id;
//@access Private 

const getOrderById  = expressAsyncHandler(async(req, res) => {
 
   const order = await Order.findById(req.params.id).populate('user', 'name email');
 
   if(order) {
        res.json(order)
   }
   else {
    res.status(400)
    throw new Error("Order Not Found")
   }
});


//@desc  update order to paid
//@route Get /api/orders/:id/pay
//@access Private 

const updateOrderToPaid  = expressAsyncHandler(async(req, res) => {
 
    const order = await Order.findById(req.params.id)
  
    if(order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time : req.body.update_time,
            email_address: req.body.payer.email_address
        }
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    }
    else {
     res.status(400)
     throw new Error("Order Not Found")
    }
 });
 

 
//@desc  Get current login user order information
//@route Get /api/orders/myorders
//@access Private 

const getMyOrders = expressAsyncHandler(async(req, res) => {
 
    const orders = await Order.find({user: req.user._id})
    res.json(orders)
 });
 
//@desc Get user orders details
//@route Get /api/orders
//access private / admin

const getOrders = expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    console.log(orders);
    res.json(orders);
});



//@desc  update order as out for delivery or delivered
//@route Get /api/orders/:id/delivered
//@access Private Admin

const updateOrderToDelivered  = expressAsyncHandler(async(req, res) => {
 
    const order = await Order.findById(req.params.id)
  
    if(order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    }
    else {
     res.status(400)
     throw new Error("Order Not Found")
    }
 });
  
 
const getUsersOrder = expressAsyncHandler(async(req, res) => {
 
    const orders = await Order.find({user: req.user._id}).sort({createdAt: -1})
    console.log(orders)
     res.json(orders);
 });
 

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders ,updateOrderToDelivered , getUsersOrder};
