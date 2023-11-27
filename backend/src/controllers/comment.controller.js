import Comment from "../models/comment.js";
import User from "../models/user.model.js"; 

// CREAR UN COMENTARIO
export const createComment = async (req, res) => {
  try {
    const { autor, description } = req.body;

    // Verifica si el autor (usuario) existe antes de crear el comentario
    const existingUser = await User.findById(autor);
    if (!existingUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Crea el nuevo comentario
    const newComment = new Comment({ autor, description });

    // Guarda el comentario en la base de datos
    const commentSaved = await newComment.save();

    // Puedes realizar otras acciones aquí, como asociar el comentario con un post, si es necesario

    res.status(201).json(commentSaved);
  } catch (error) {
    console.error("Error al crear un nuevo comentario:", error);
    res.status(400).json({ message: "Error al crear un nuevo comentario", error });
  }
};

// Otras funciones relacionadas con comentarios, como obtener todos los comentarios, actualizar comentarios, eliminar comentarios, etc., pueden agregarse según las necesidades.
