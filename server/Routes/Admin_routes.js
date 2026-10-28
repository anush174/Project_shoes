import express from "express";
import { RegisterAdmin, LoginAdmin } from "../Controller/Admin_controller.js";

const router = express.Router();

// Admin Registration
router.post("/Register", RegisterAdmin);

// Admin Login
router.post("/Login", LoginAdmin);

export default router;