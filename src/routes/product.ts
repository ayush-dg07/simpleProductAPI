import e, {Request, Response} from 'express';
import to from '../utils/to';
import {product} from '../models'
import path from 'path'

const addProduct = async (req: Request, res: Response) => {
    const newProduct = new product({
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
    })

    if(req.files) {
        let imgFile: any = req.files.imgFile;
        const allowed = ['image/jpg','image/jpeg','image/png'];
        if(!allowed.includes(imgFile.mimetype)) {
            return res.send({sucess: false, msg: 'Image format not supported'})
        }
        const uploadPath = path.join(__dirname, '../../', 'uploads', imgFile.name);
        imgFile.mv(uploadPath, async (err: any) => {
            if(err) {
                console.log(err);
                return res.send({sucess: false, msg: 'Image could not be uploaded'})
            }
            newProduct.set("imgPath", uploadPath);
            await newProduct.save();
            return res.send({sucess: true, msg: 'Product Added!'});
        });
    }
}

const listProducts = async (req: Request, res: Response) => {
    let e,r;
    [e,r] = await to(product.find());
    if(e) return res.send({success: false, msg: 'Server error'});
    return res.send({sucess: true, msg: 'Products Loaded', data: r})
}

export default {addProduct, listProducts};