import mongoose, { mongo } from "mongoose";





//creating mongoose schema for all the products
const reviewSchema = mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    datePosted: { type: String },    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
    


}, {
    timeStamps: true
});

const productSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },


    name: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    image: {
        type: String,
        required: true,

    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,

    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0

    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    }

}, {
    timeStamps: true
});


const Product = mongoose.model("Product", productSchema);


export default Product;