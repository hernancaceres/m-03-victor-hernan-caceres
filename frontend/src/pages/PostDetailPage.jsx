import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import CreateCommentForm from './CreateCommentForm';
import { useUser } from '../context/UserContext'; // Importa useUser desde el contexto de usuario

const PostDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const { user } = useUser(); // Utiliza useUser desde el contexto de usuario
  const token = localStorage.getItem('token');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const handleCommentEdit = (comment) => {
    setEditingCommentId(comment._id);
    setEditedCommentText(comment.description);
  };

  const handleCommentUpdate = async (e, commentId) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:4000/api/comment/${commentId}`,
        { description: editedCommentText },
        {
          headers: {
            'x-access-token': token,
          },
          withCredentials: true,
        }
      );

      // Actualiza el estado de los comentarios después de la edición
      const updatedComments = comments.map((comment) =>
        comment._id === commentId ? { ...comment, description: editedCommentText } : comment
      );

      setComments(updatedComments);
      setEditingCommentId(null);
      setEditedCommentText('');
    } catch (error) {
      console.error('Error al actualizar el comentario:', error);
    }
  };


  useEffect(() => {
    console.log('Usuario:', user);
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
  }, [currentUser, postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/post/${postId}`, {
        headers: {
          'x-access-token': token,
        },
        withCredentials: true,
      });
      // Redirige a la página de todos los posts
      window.location.href = '/posts';
      // Lógica para redirigir o actualizar la lista de posts después de la eliminación
      // Puedes utilizar react-router o cualquier otra lógica de enrutamiento aquí
    } catch (error) {
      console.error('Error al eliminar el post:', error);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await axios.delete(`http://localhost:4000/api/comment/${commentId}`, {
        headers: {
          'x-access-token': token,
        },
        withCredentials: true,
      });

      // Actualizar la lista de comentarios después de la eliminación
      const updatedComments = comments.filter((comment) => comment._id !== commentId);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error al eliminar el comentario:', error);
    }
  };

  if (!post) {
    return <div>Cargando...</div>;
  }

  // desde
  const handleCommentCreated = (newComment) => {
    // Lógica para actualizar el estado de los comentarios en PostDetailPage
    setComments([...comments, newComment]);
  };
  // hasta
  return (
    <div className='bg-gray-900 p-10 rounded-md'>
      <div>

        <div className='flex items-center'>
          <div className='mr-6 flex-shrink-0'>
            {/* Mostrar la imagen del post si imageURL está presente */}
            {post.imageURL && <img src={post.imageURL} alt="Post Image" className='h-72 object-cover rounded' />}
          </div>
          <div>
            <h1 className='text-3xl font-bold mb-2'>{post.title}</h1>
            <p className='text-gray-100'>{post.description}</p>
          </div>
        </div>


        <div className='flex justify-normal '>
          <div className=' ml-1 pt-2'>
            <p className='text-slate-300'>Autor: {post.autor.username}</p>
          </div>
          <div className=' ml-1 pt-2'>
            {/* Mostrar la imagen del avatar del autor */}
            {post.autor.avatarURL && (
              <img
                src={post.autor.avatarURL}
                alt={`${post.autor.username}'s Avatar`}
                className="avatar w-6 h-6 rounded-full object-cover"
                style={{ marginLeft: '2px', marginRight: '6px' }}
              />
            )}
          </div>
        </div>
        <div>
          <p className='text-slate-300 ml-1'>{new Date(post.updatedAt).toLocaleDateString()}</p>
        </div>
        <div>
          {/* Botón de eliminación del post */}
          {
            user && user.id === post.autor._id && (
              <button onClick={handleDelete} className='bg-violet-900 text-white px-4 py-2 rounded-md my-2'>Eliminar Post</button>
            )
          }
        </div>

      </div>

      <h2 className="text-slate-100 font-semibold py-3">Comentarios:</h2>

      <ul className='text-slate-300 max-w-xl w-full font-serif'>
        {comments.map((comment) => (
          <li key={comment._id}>

            <div className=" bg-gray-800 ">
              {/* Mostrar la imagen del avatar y el nombre del autor */}
              <div className="flex justify-normal text-white rounded-md ml-1 my-2 p-1">
                {comment.autor.avatarURL && (
                  <img src={comment.autor.avatarURL} alt="Avatar" className="avatar w-6 h-6 rounded-full object-cover" />
                )}
                <p className="ml-2">{comment.autor.username}</p>
              </div>
              <div className='ml-2'>
                {/* Mostrar la descripción del comentario */}
                <p>{comment.description}</p>
              </div>
            </div>

            {/* Botones de edición y eliminación del comentario */}
            {(user && (user.id === post.autor._id || user.id === comment.autor._id)) && (
              <div className="flex justify-normal  text-white  rounded-md my-2">
                <div >
                  <button
                    onClick={() => handleCommentDelete(comment._id)}
                    className='bg-red-900 text-white px-2 py-1 ml-2 rounded-md'>
                    Eliminar Comentario
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => handleCommentEdit(comment)}
                    className='bg-violet-900 text-white px-2 py-1 ml-2 rounded-md'>
                    Editar Comentario
                  </button>
                </div>
              </div>
            )}

            {/* Formulario de edición del comentario */}
            {editingCommentId === comment._id && (
              <form onSubmit={(e) => handleCommentUpdate(e, comment._id)}>
                <div className='w-full text-white px-4 py-2 rounded-md my-2'>
                  <div>
                    <textarea
                      value={editedCommentText}
                      onChange={(e) => setEditedCommentText(e.target.value)}
                      rows="3"
                      className='w-full bg-gray-600 text-white rounded-md my-2'
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className='bg-violet-900 text-white px-2 py-1 rounded-md'>
                      Guardar Cambios
                    </button>
                  </div>
                </div>
              </form>

            )}
          </li>
        ))}
      </ul>

      {/* Formulario para crear comentarios */}
      <div className='bg-gray-800 max-w-xl w-full p-4 rounded-md'>
        <CreateCommentForm postId={postId} userId={user ? user.id : null} onCommentCreated={handleCommentCreated} />
      </div>

    </div >
  );
};

export default PostDetailPage;
