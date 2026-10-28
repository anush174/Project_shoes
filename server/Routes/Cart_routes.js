
import express from "express";

import {
    AddToCart,
    ViewCart,
    UpdateCartQuantity,
    RemoveFromCart,
    ClearCart
} from "../Controller/Cart_controller.js";

const router = express.Router();

router.post("/add", AddToCart);
router.get("/view/:userId", ViewCart);
router.put("/update", UpdateCartQuantity);
router.delete("/remove", RemoveFromCart);
router.delete("/clear/:userId", ClearCart);

export default router;
