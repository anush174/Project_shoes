import Product from "../Models/Product_models.js"

// Add Product
export const AddProduct = async (req, res) => {
    try {

        const {
            pname,
            pdesc,
            pprice,
            pqty,
            brand,
            color,
            sizes,
            catid
        } = req.body;

        const productimage = req.file
            ? req.file.filename
            : null;

        const newproduct = new Product({

            product_name: pname,

            product_qty: pqty,

            product_image: productimage,

            product_price: pprice,

            product_desc: pdesc,

            brand: brand,

            color: color,

            sizes: sizes,

            categoryId: catid
        });

        await newproduct.save();

        res.status(201).json({
            message: "Product added successfully",
            product: newproduct
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to add product",
            error: error.message
        });

    }
};


// View Products
export const ViewProduct = async (req, res) => {
    try {

        const products = await Product
            .find()
            .populate("categoryId");

        res.status(200).json({
            message: "Products fetched successfully",
            products
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch products",
            error: error.message
        });

    }
};


// View Single Product
export const ViewSingleProduct = async (req, res) => {
    try {

        const { id } = req.params;

        const product = await Product
            .findById(id)
            .populate("categoryId");

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product fetched successfully",
            product
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch product",
            error: error.message
        });

    }
};


// Update Product
export const UpdateProduct = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            pname,
            pdesc,
            pprice,
            pqty,
            brand,
            color,
            sizes,
            catid
        } = req.body;

        const product = await Product.findByIdAndUpdate(
            id,
            {
                product_name: pname,
                product_desc: pdesc,
                product_price: pprice,
                product_qty: pqty,
                brand,
                color,
                sizes,
                categoryId: catid
            },
            { new: true }
        );

        res.status(200).json({
            message: "Product updated successfully",
            product
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to update product",
            error: error.message
        });

    }
};


// Delete Product
export const DeleteProduct = async (req, res) => {
    try {

        const { id } = req.params;

        await Product.findByIdAndDelete(id);

        res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to delete product",
            error: error.message
        });

    }
};