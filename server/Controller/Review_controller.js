import Review from "../Models/review.model.js";


// Add Review
export const AddReview = async (req, res) => {
    try {

        const {
            userId,
            productId,
            rating,
            review
        } = req.body;

        const newReview = new Review({
            userId,
            productId,
            rating,
            review
        });

        await newReview.save();

        res.status(201).json({
            message: "Review added successfully",
            review: newReview
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to add review",
            error: error.message
        });

    }
};


// View Product Reviews
export const ViewReviews = async (req, res) => {
    try {

        const { productId } = req.params;

        const reviews = await Review
            .find({ productId })
            .populate("userId");

        res.status(200).json({
            message: "Reviews fetched successfully",
            reviews
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch reviews",
            error: error.message
        });

    }
};