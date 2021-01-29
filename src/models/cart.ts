import mongoose from 'mongoose';
import {productSchema} from './product'

const cartSchema = new mongoose.Schema({
    cartProduct: {
        type: productSchema
    },
    quantity: {
        type: Number,
        default: 1
    }
});

export default mongoose.model('cart', cartSchema, 'cart');

