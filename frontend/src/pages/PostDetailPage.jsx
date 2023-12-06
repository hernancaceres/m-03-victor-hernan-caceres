import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CreateCommentForm from './CreateCommentForm';
import { useUser } from '../context/UserContext'; // Importa useUser desde el contexto de usuario

const PostDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const { user } = useUser(); // Utiliza useUser desde el contexto de usuario
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/post/${postId}`);
        setPost(response.data);

        // Verificar si el post tiene comentarios antes de hacer la solicitud
        if (response.data.comments && response.data.comments.length > 0) {
          const commentsResponse = await axios.get(`http://localhost:4000/api/comment/${postId}`);
          setComments(commentsResponse.data);
        } else {
          // Si el post no tiene comentarios, establece el estado de los comentarios como un array vacío
          setComments([]);
        }
      } catch (error) {
        console.error('Error al obtener detalles del post:', error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/post/${postId}`, {
        headers: {
          'x-access-token': token,
        },
        withCredentials: true,
      });
      // Redirige a la página principal o cualquier otra página deseada
      window.location.href = '/posts';
      // Lógica para redirigir o actualizar la lista de posts después de la eliminación
      // Puedes utilizar react-router o cualquier otra lógica de enrutamiento aquí
    } catch (error) {
      console.error('Error al eliminar el post:', error);
    }
  };

  if (!post) {
    return <div>Cargando...</div>;
  }

  //desde
  const handleCommentCreated = (newComment) => {
    // Lógica para actualizar el estado de los comentarios en PostDetailPage
    setComments([...comments, newComment]);
  };
  //hasta
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.description}</p>

      <h2>Comentarios</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>{comment.description}</li>
        ))}
      </ul>

      {/* Botón de eliminación */}
      <button onClick={handleDelete}>Eliminar Post</button>

      {/* Formulario para crear comentario */}
      <CreateCommentForm postId={postId} userId={user ? user.id : null} onCommentCreated={handleCommentCreated} />
    </div>
  );
};

export default PostDetailPage;
