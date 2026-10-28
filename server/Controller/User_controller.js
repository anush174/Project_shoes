import User from "../Models/User_models.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// User Registration

export const RegisterUser = async (req, res) => {
    try {
        const { name, email, phone, password, address } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

       const hashedPassword = await bcrypt.hash(password, 10);

const newUser = new User({
  name,
  email: email.trim().toLowerCase(),
  phone,
  password: hashedPassword,
  address
});

await newUser.save();

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });
    }
};



// User Login


export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase()
    });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is missing from .env');
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Login controller error:', error);

    return res.status(500).json({
      message: 'Login failed',
      error: error.message
    });
  }
};


// View all users - Admin use
export const ViewUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({
            message: "Users fetched successfully",
            users
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch users",
            error: error.message
        });
    }
};


// Delete User
export const DeleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        await User.findByIdAndDelete(id);

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete user",
            error: error.message
        });
    }
};