import Order from "../Models/Order_models.js";


// Place Order
export const PlaceOrder = async (req, res) => {
    try {

        const {
            userId,
            items,
            totalAmount,
            shippingAddress
        } = req.body;

        const order = new Order({
            userId,
            items,
            totalAmount,
            shippingAddress
        });

        await order.save();

        res.status(201).json({
            message: "Order placed successfully",
            order
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to place order",
            error: error.message
        });

    }
};


// User Orders
export const UserOrders = async (req, res) => {
    try {

        const { userId } = req.params;

        const orders = await Order
            .find({ userId })
            .populate("items.productId")
            .sort({ date: -1 });

        res.status(200).json({
            message: "Orders fetched successfully",
            orders
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch orders",
            error: error.message
        });

    }
};


// Admin - View All Orders
export const AllOrders = async (req, res) => {
    try {

        const orders = await Order
            .find()
            .populate("userId")
            .populate("items.productId")
            .sort({ date: -1 });

        res.status(200).json({
            message: "All orders fetched successfully",
            orders
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch orders",
            error: error.message
        });

    }
};


// Update Order Status
export const UpdateOrderStatus = async (req, res) => {
    try {

        const { id } = req.params;
        const { orderStatus } = req.body;

        const order = await Order.findByIdAndUpdate(
            id,
            { orderStatus },
            { new: true }
        );

        res.status(200).json({
            message: "Order status updated",
            order
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to update order",
            error: error.message
        });

    }
};