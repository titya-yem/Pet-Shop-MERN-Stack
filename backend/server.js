import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/product.model.js';

const app = express()
dotenv.config();
connectDB()

app.use(cors());
app.use(express.json());

app.get('/api/products', async (req, res) => {
    
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.post('/api/products/create', async (req, res) => {
    const product = req.body;

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})