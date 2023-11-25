// import Product from "../models/product.model.js";

// //logica necesaria para recibir peticiones del cliente y dar respuesta del servidor

// //BUSCAR TODOS LOS PRODUCTOS
// export const getAllProducts = async (req, res) => {
//   const products = await Product.find();
//   res.json(products);
// };

// //BUSCAR UN PRODUCTO POR ID
// export const getProductById = async (req, res) => {
//   const { productId } = req.params;
//   try {
//     const product = await Product.findById(productId);
//     res.status(200).json(product);
//   }
//   catch (error) {
//     return res.json({ message: "Error al buscar un producto por el ID" });
//   }
// };

// //CREAR UN PRODUCTO
// export const createProduct = async (req, res) => {
//   try {
//     const { name, category, price } = req.body;
//     const newProduct = new Product({ name, category, price, });
//     const productSaved = await newProduct.save();
//     res.status(201).json(productSaved);
//   }
//   catch (error) {
//     res.status(400).json({ message: "Error al crear un nuevo producto" });
//   }
// };

// //ACTUALIZAR UN PRODUCTO
// export const updateProduct = async (req, res) => {
//   const { productId } = req.params;
//   const product = req.body;
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(productId, product, { new: true, });
//     res.status(200).json(updatedProduct);
//   }
//   catch (error) {
//     return res.status(404).json({ message: "No se pudo actualizar el producto" });
//   }
// };

// //ELIMINAR UN PRODUCTO
// export const deleteProductById = async (req, res) => {
//   const { productId } = req.params;
//   try {
//     const deletedProduct = await Product.findByIdAndDelete(productId);
//     res.status(200).json({ message: "Producto eliminado" });
//   }
//   catch (error) {
//     res.status(404).json({ message: "Error al eliminar un producto" });
//   }
// };