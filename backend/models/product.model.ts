import mongoose,{Document, Schema} from "mongoose";

const categoryEnum = ['cat', 'dog', 'bird', 'rabbit', 'goldfish'];

interface productTypes extends Document {
    name: string;
    category: typeof categoryEnum;
    price: number;
    rating: number;
    reviews?: number;
    description: string;
    image: string;
}

const productSchema: Schema = new Schema({
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: categoryEnum},
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    reviews: { type: Number },
    description: { type: String, required: true , trim: true},
    image: { type: String, required: true },
});

const Product = mongoose.model<productTypes>("Product", productSchema);

export default Product;
