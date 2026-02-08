import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        min:1,
        required: true,
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    }
},{
    collationsion: "Route_products",
    timestamps: true,
}
)
export const ProductModel = mongoose.models.Product||mongoose.model("Product", productSchema);