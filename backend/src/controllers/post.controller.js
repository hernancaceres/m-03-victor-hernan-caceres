import Post from "../models/post.model.js";

//BUSCAR TODOS LOS POSTS
export const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
};

// Obtener un post por ID
export const getPostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//CREAR UN POST
export const createPost = async (req, res) => {
    try {
      const { title, description, autor,imageURL } = req.body;
      if (!title || !description || !autor) {
        return res.status(400).json({ message: "Se requieren todos los campos (title, description, autor)" });
      }
      const newPost = new Post({ title, description, autor,imageURL });
      const postSaved = await newPost.save();
      res.status(201).json(postSaved);
    }
    catch (error) {
      console.error("Error al crear un nuevo post:", error);
      res.status(400).json({ message: "Error al crear un nuevo post", error: error.message });
    }
    
  };

// ACTUALIZAR UN POST
export const updatePost = async (req, res) => {
  const { postId } = req.params; // Corregir aquí
  const post = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(postId, post, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(404).json({ message: "No se pudo actualizar el post" });
  }
};

// Eliminar un post por ID
export const deletePostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/* //BUSCAR UN PRODUCTO POR ID
export const getProductById = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    res.status(200).json(product);
  }
  catch (error) {
    return res.json({ message: "Error al buscar un producto por el ID" });
  }
};


//ELIMINAR UN PRODUCTO
export const deleteProductById = async (req, res) => {
  const { productId } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "Producto eliminado" });
  }
  catch (error) {
    res.status(404).json({ message: "Error al eliminar un producto" });
  }
}; */