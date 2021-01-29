import Joi from 'joi';
import {Request, Response, NextFunction} from 'express';

const validator =  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    interface dataObject {
        [key: string]: any
    }   
    let data:dataObject = {};
    if (Object.keys(req.query).length) data.query = req.query;
    if (Object.keys(req.params).length) data.params = req.params;
    if (Object.keys(req.body).length) data.body = req.body;
    // console.log(schema.validate(data));
    const result = schema.validate(data);
    //console.log(result);
    if (result.error) {
        return res.status(422).json({
            success: false,
            msg: result.error.details.map(({ message, path } : any) => {
                            return `${message}${path ? ` (${path})` : ''}`;
                        }).toString()
        });
    }
    next();
};

export {validator};
