import { json, urlencoded } from 'express';
import express from 'express';
import productRoutes from './routes/products/index.js';
import authRoutes from './routes/auth/index.js';
import orderRoutes from './routes/orders/index.js';
import serverless from "serverless-http";

const port = 3000;
const app = express();

app.use(urlencoded({extended:false }));
app.use(json());

app.get('/', (req, res) => {
    res.send('hello world 123')
});

app.use('/products', productRoutes);
app.use('/auth' ,authRoutes);
app.use('/orders' , orderRoutes)

if (process.env.NODE_ENV === "dev")
{
    app.listen(port , ()=>{
    console.log(`Example app listenong on port ${port}`)
});
}

export const handler = serverless(app);