/* import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
} from "../controllers/product.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.jwt.js";

export const productRoutes = Router();

//RUTA PARA BUSCAR TODOS LOS PRODUCTOS
productRoutes.get("/products", getAllProducts);

//BUSCAR UN PRODUCTO POR ID
productRoutes.get("/products/:productId", getProductById);

//CREAR UN PRODUCTO
productRoutes.post("/products", verifyToken, isAdmin, createProduct);

//ACTUALIZAR UN PRODUCTO
productRoutes.put("/products/:productId", updateProduct);

//ELIMINAR UN PRODUCTO
productRoutes.delete("/products/:productId", deleteProductById); */