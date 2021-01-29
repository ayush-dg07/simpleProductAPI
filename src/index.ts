import path from 'path';
require('dotenv').config({ path: path.join('.env') });
import './config/db';
import express from 'express';
import fileUpload from 'express-fileupload'; 
import router from './routes';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use('/', router);

const port: number = 3000;

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});