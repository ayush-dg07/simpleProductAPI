import mongoose from 'mongoose';

const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:27017/${process.env.DB_NAME}?authSource=admin`;
console.log(url);
mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(conn => console.log('Database connected'))
.catch(err => console.log('Error in connection', err));