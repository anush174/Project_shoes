
import express from "express";

import {
    AddProduct,
    ViewProduct,
    ViewSingleProduct,
    UpdateProduct,
    DeleteProduct
} from "../Controller/Product_controller.js";

const router = express.Router();

router.post("/add", AddProduct);
router.get("/view", ViewProduct);
router.get("/view/:id", ViewSingleProduct);
router.put("/update/:id", UpdateProduct);
router.delete("/delete/:id", DeleteProduct);

export default router;
