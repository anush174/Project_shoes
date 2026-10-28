
import express from "express";
import {
    AddCategory,
    ViewCategory,
    UpdateCategory,
    DeleteCategory
} from "../Controller/Category_contoller.js";


const router = express.Router();

router.post("/add", AddCategory);
router.get("/view", ViewCategory);
router.put("/update/:id", UpdateCategory);
router.delete("/delete/:id", DeleteCategory);

export default router;
