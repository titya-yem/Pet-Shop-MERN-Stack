import { Request, Response } from "express";
import Product from "../models/product.model.js";
import productValidation from "../validations/product.validation.js";
import _ from "lodash";

// Define the allowed fields for product creation and update
const allowedFields = ["name", "category", "price", "rating", "reviews", "description", "image"];

// Get all products
export const getProducts = async (req: Request, res: Response): Promise<void | any> => {
  try {
    const products = await Product.find();
    if(!products || products.length === 0 ) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(404).json({ message: "Error fetching products" });
  }
};

// Get a product by ID
export const getProductbyId = async (req: Request, res: Response): Promise<void | any> => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Error retrieving the product" });
  }
};

// Create a new product
export const createProduct = async (req: Request, res: Response): Promise<void | any> => {
  try {
  const { error, value } = productValidation.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({message: "Validation failed",details: error.details.map((d) => d.message),});
  }

    const data = _.pick(value, allowedFields);
    const newProduct = new Product(data);
    await newProduct.save();

    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
};

// Update a product
export const updateProduct = async (req: Request, res: Response): Promise<void | any> => {
  try {
    const { id } = req.params;
    if(!id) {
      return res.status(400).json({ message: "Service ID is required" });
    }

    const { error, value } = productValidation.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({message: "Validation failed",details: error.details.map((d) => d.message)});
    }

    const updatedData = _.pick(value, allowedFields);
    
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response): Promise<void | any> => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id, {new: true});

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Failed to delete product" });
    }
}
