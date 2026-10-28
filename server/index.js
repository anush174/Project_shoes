
import express from 'express';
import dotenv from 'dotenv';
import databaseconnection from './Database/Database.js';
import cors from 'cors';

import adminRoutes from './Routes/Admin_routes.js';
import cartRoutes from './Routes/Cart_routes.js';
import ProductRoutes from './Routes/Product_routes.js';
import OrderRoutes from './Routes/Order_routes.js';
import categoryRoutes from './Routes/Category_routes.js';
import userRoutes from './Routes/User_routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/User', userRoutes);
app.use('/Admin', adminRoutes);
app.use('/Cart', cartRoutes);
app.use('/Category', categoryRoutes);
app.use('/Product', ProductRoutes);
app.use('/Order', OrderRoutes);

const PORT = process.env.PORT_NUMBER || 7001;

databaseconnection();

app.listen(PORT, () => {
    console.log(`Server is running on port number: ${PORT}`);
});
