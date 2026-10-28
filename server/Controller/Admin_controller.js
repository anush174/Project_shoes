import Admin from "../Models/Admin_models.js";

// Admin Registration
export const RegisterAdmin = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
            return res.status(400).json({
                message: "Admin already exists"
            });
        }

        const newAdmin = new Admin({
            name,
            email,
            phone,
            password
        });

        await newAdmin.save();

        res.status(201).json({
            message: "Admin registered successfully",
            admin: newAdmin
        });

    } catch (error) {
        res.status(500).json({
            message: "Admin registration failed",
            error: error.message
        });
    }
};


// Admin Login
export const LoginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({
                message: "Admin not found"
            });
        }

        if (admin.password !== password) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        res.status(200).json({
            message: "Admin login successful",
            admin
        });

    } catch (error) {
        res.status(500).json({
            message: "Admin login failed",
            error: error.message
        });
    }
};