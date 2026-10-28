import express from "express";
import {
    PlaceOrder,
    UserOrders,
    AllOrders,
    UpdateOrderStatus
} from "../Controller/Order_controller.js"

const router = express.Router();

router.post("/place", PlaceOrder);
router.get("/user/:userId", UserOrders);
router.get("/all", AllOrders);
router.put("/status/:id", UpdateOrderStatus);

export default router;