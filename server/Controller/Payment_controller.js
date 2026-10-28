import Payment from "../Models/payment.model.js";


// Make Payment
export const MakePayment = async (req, res) => {
    try {

        const {
            orderId,
            userId,
            amount,
            paymentMethod,
            transactionId
        } = req.body;

        const payment = new Payment({
            orderId,
            userId,
            amount,
            paymentMethod,
            transactionId,
            paymentStatus: "Success"
        });

        await payment.save();

        res.status(201).json({
            message: "Payment successful",
            payment
        });

    } catch (error) {

        res.status(500).json({
            message: "Payment failed",
            error: error.message
        });

    }
};


// View Payments
export const ViewPayments = async (req, res) => {
    try {

        const payments = await Payment
            .find()
            .populate("userId")
            .populate("orderId");

        res.status(200).json({
            message: "Payments fetched successfully",
            payments
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch payments",
            error: error.message
        });

    }
};