import express from 'express';
import dotenv from 'dotenv';
import ConnectMongo from './config/database.js';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middlware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/upload.js';
import path from 'path';
import morgan from 'morgan';


//server Configs

dotenv.config();
ConnectMongo();

const app = express();



if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));

}



//express.json() is used to accept json data 
app.use(express.json());


app.get('/', async (req, res)=> {
        
    res.send("App Running");

 });
 app.get('/api/config/paypal', (req, res)=> res.send(process.env.PAYPAL_CLIENT_ID) )
 app.use('/api/products', productRoutes);
 app.use('/api/users', userRoutes);
 app.use('/api/orders', orderRoutes );
 app.use('/api/upload', uploadRoutes);



 const __dirname = path.resolve();
 app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
 app.use(express.static(path.join(__dirname, '/frontend/build')));
 

 app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
  


 app.use(notFound);

 app.use(errorHandler);




 


const PORT = process.env.PORT || 5000;







app.listen(PORT, console.log(`Server on ${process.env.NODE_ENV} on port ${PORT}`));