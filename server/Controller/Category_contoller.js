import Category from "../Models/Category_models.js"

// Add Category
export const AddCategory = async (req, res) => {
    try {
        const { category_name, description } = req.body;

        const category = new Category({
            category_name,
            description,
            category_image: req.file
                ? req.file.filename
                : null
        });

        await category.save();

        res.status(201).json({
            message: "Category added successfully",
            category
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add category",
            error: error.message
        });
    }
};


// View Categories
export const ViewCategory = async (req, res) => {
    try {
        const categories = await Category.find();

        res.status(200).json({
            message: "Categories fetched successfully",
            categories
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch categories",
            error: error.message
        });
    }
};


// Update Category
export const UpdateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { category_name, description, status } = req.body;

        const category = await Category.findByIdAndUpdate(
            id,
            {
                category_name,
                description,
                status
            },
            { new: true }
        );

        res.status(200).json({
            message: "Category updated successfully",
            category
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update category",
            error: error.message
        });
    }
};


// Delete Category
export const DeleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        await Category.findByIdAndDelete(id);

        res.status(200).json({
            message: "Category deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete category",
            error: error.message
        });
    }
};