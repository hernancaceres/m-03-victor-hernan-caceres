import { Router } from "express";
import { createPost, getAllPosts } from "../controllers/post.controller.js";
import {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import { authRequired } from "../middlewares/auth.jwt.js";

export const postRoutes = Router();

// RUTA PARA BUSCAR TODOS LOS POSTS
postRoutes.get("/post", getAllPosts);

// RUTA PARA CREAR UN NUEVO POST
postRoutes.post("/post", authRequired, createPost);

// RUTA PARA OBTENER TODOS LOS COMENTARIOS DE UN POST
postRoutes.get("/post/:postId/comments", authRequired, getAllComments);

// RUTA PARA CREAR UN NUEVO COMENTARIO EN UN POST
postRoutes.post("/post/:postId/comment", authRequired, createComment);

// RUTA PARA ACTUALIZAR UN COMENTARIO EN UN POST
postRoutes.put("/post/:postId/comment/:commentId", authRequired, updateComment);

// RUTA PARA ELIMINAR UN COMENTARIO EN UN POST
postRoutes.delete("/post/:postId/comment/:commentId", authRequired, deleteComment);




/* //BUSCAR UN PRODUCTO POR ID
productRoutes.get("/products/:productId", getProductById);



//ACTUALIZAR UN PRODUCTO
productRoutes.put("/products/:productId", updateProduct);

//ELIMINAR UN PRODUCTO
productRoutes.delete("/products/:productId", deleteProductById); */

export default postRoutes