import Product from "../model/productModel.js";

const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, image } = req.body;
    if( !name || !price) {
        return res.status(400).json( {message: "Name and Price are required fields" });
    }
    const newProduct = await Product.create({
        name,
        price:Number(price),
        description,
        image
    });
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error("Create Product Error:", error);
    return res.status(500).json({ error: error.message, message: error.message });
  }
};
const getAllProduct = async (req, res, next) => {
    try {
        const products = await Product.findAll();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
          return res
            .status(400)
            .json({ message: "Product id is required!!" });
        }
        const product = await Product.findByPk(id);
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
          return res
            .status(400)
            .json({ message: "Product id is required!!" });
        }

        const { name, price, description, image } = req.body;
        if (!name || !price) {
          return res
            .status(400)
            .json({ message: "Name and Price cannot be null" });
        }
        const product = await Product.findByPk(id);
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
        const updates = {};
        if (name !== undefined) updates.name = name;
        if (price !== undefined) updates.price = Number(price);
        if (description !== undefined) updates.description = description;
        if (image !== undefined) updates.image = image;

        await product.update(updates);
        return res.status(200).json(product);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};
const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
          return res.status(400).json({ message: "Product id is required!!" });
        }
        const product = await Product.findByPk(id);
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
        await product.destroy();
        return res.status(200).json({
          message: "Product is deleted successfully",
          deletedProducts: product,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export {createProduct, getAllProduct, getProductById, updateProduct, deleteProduct};
