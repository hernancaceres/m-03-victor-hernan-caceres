import { Router } from "express";
import { createPost, getAllPosts } from "../controllers/post.controller.js";

export const postRoutes = Router();

//RUTA PARA BUSCAR TODOS LOS POSTS
postRoutes.get("/post", getAllPosts);

//CREAR UN POST
postRoutes.post("/post", createPost);



/* //BUSCAR UN PRODUCTO POR ID
productRoutes.get("/products/:productId", getProductById);



//ACTUALIZAR UN PRODUCTO
productRoutes.put("/products/:productId", updateProduct);

//ELIMINAR UN PRODUCTO
productRoutes.delete("/products/:productId", deleteProductById); */

export default postRoutes