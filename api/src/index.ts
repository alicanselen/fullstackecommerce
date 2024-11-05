import express from 'express';
import productRoutes from './routes/products/index'

const port = 3000;
const app = express();

app.get('/', (req, res) => {
    res.send('hello world 123')
});
//products endpoints

app.use('/products', productRoutes);
app.listen(port , ()=>{
    console.log(`Example app listenong on port ${port}`)
});