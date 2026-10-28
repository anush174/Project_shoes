
import Cart from "../Models/Cart_models.js";

// Add product to cart
export const AddToCart = async (req, res) => {
    try {
        const { userId, productId, size, quantity, price } = req.body;

        if (!userId || !productId || !size || quantity < 1 || price == null || price < 0) {
            return res.status(400).json({
                message: "Please provide valid cart details"
            });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: [],
                totalAmount: 0
            });
        }

        // Check whether the same product and size already exist
        const existingItem = cart.items.find(
            item =>
                item.productId.toString() === productId &&
                item.size === size
        );

        if (existingItem) {
            existingItem.quantity += Number(quantity || 1);
        } else {
            cart.items.push({
                productId,
                size,
                quantity: Number(quantity || 1),
                price
            });
        }

        // Calculate total amount
        cart.totalAmount = cart.items.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        );

        await cart.save();

        res.status(201).json({
            message: "Product added to cart successfully",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add product to cart",
            error: error.message
        });
    }
};


// View cart
export const ViewCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOne({ userId })
            .populate("items.productId");

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        res.status(200).json({
            message: "Cart fetched successfully",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch cart",
            error: error.message
        });
    }
};


// Update item quantity
export const UpdateCartQuantity = async (req, res) => {
    try {
        const { userId, productId, size, quantity } = req.body;

        if (!userId || !productId || !size ||
            !Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({
                message: "Provide valid user, product, size and quantity"
            });
        }

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const item = cart.items.find(
            item =>
                item.productId.toString() === productId &&
                item.size === size
        );

        if (!item) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }

        item.quantity = quantity;

        cart.totalAmount = cart.items.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        );

        await cart.save();

        res.status(200).json({
            message: "Cart quantity updated successfully",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update cart",
            error: error.message
        });
    }
};


// Remove an item from cart
export const RemoveFromCart = async (req, res) => {
    try {
        const { userId, productId, size } = req.body;

        if (!userId || !productId || !size) {
            return res.status(400).json({
                message: "User ID, product ID and size are required"
            });
        }

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const initialLength = cart.items.length;

        cart.items = cart.items.filter(
            item =>
                !(
                    item.productId.toString() === productId &&
                    item.size === size
                )
        );

        if (cart.items.length === initialLength) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }

        cart.totalAmount = cart.items.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        );

        await cart.save();

        res.status(200).json({
            message: "Product removed from cart successfully",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to remove product from cart",
            error: error.message
        });
    }
};


// Clear entire cart
export const ClearCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        cart.items = [];
        cart.totalAmount = 0;

        await cart.save();

        res.status(200).json({
            message: "Cart cleared successfully",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to clear cart",
            error: error.message
        });
    }
};
