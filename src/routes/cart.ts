import {Request, Response} from 'express';
import to from '../utils/to';
import {cart, product} from '../models';

const addProductToCart = async (req: Request, res: Response) => {
    let e,r;
    [e,r] = await to(cart.find({ "cartProduct._id": req.body.product._id}));
    if(r.length>0) {
        await cart.findOneAndUpdate( {"cartProduct._id": req.body.product._id}, {$inc: {quantity: 1}} );
        return res.send({sucess: true, msg: 'Product Quantity increased by 1'});
    } else {
        const newCartProduct = new cart({
            cartProduct: req.body.product
        });
        await newCartProduct.save();
        return res.send({sucess: true, msg: 'Product Added to Cart!'});
    }
}

const updateItemQuantity = async (req: Request, res: Response) => {
    let e,r;
    [e,r] = await to(cart.find( {"cartProduct._id":  req.body._id}));
    if(r.length == 0) return res.send({success: false, msg: 'Item not in cart'});
    if(req.body.quantity == 0) {
        await cart.remove({"cartProduct._id":  req.body._id});
        return res.send({success: true, msg: 'Item removed from cart'});
    }
    await cart.findOneAndUpdate( {"cartProduct._id":  req.body._id}, {quantity: req.body.quantity} );
    return res.send({success: true, msg: 'Item quanitity updated'});
}

const listCart = async (req: Request, res: Response) => {
    let e,r;
    [e,r] = await to(cart.find());
    return res.send({success: true, msg: 'Cart loaded', data: r});
}

export default {addProductToCart, updateItemQuantity, listCart};