import express, {Request, Response, NextFunction} from 'express';
import cart from './cart';
import product from './product';
import {validator} from '../utils/validator';
import vschemas from '../validatorSchemas';

const router = express.Router();

router.post('/addProduct', validator(vschemas.product.add), product.addProduct)
router.get('/listProducts', product.listProducts)

router.post('/addProductToCart', validator(vschemas.cart.add), cart.addProductToCart)
router.post('/updateItemQuantity', validator(vschemas.cart.update), cart.updateItemQuantity)
router.get('/listCart', cart.listCart)

export default router;