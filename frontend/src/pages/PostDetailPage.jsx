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
     <div className='bg-red-800 max-w-md w-full p-10 rounded-md'>
        <p className='text-slate-300'>Autor: {post.autor.username}</p>
        <p className='text-slate-300'>{new Date(post.updatedAt).toLocaleDateString()}</p>
        <h1 className='text-2xl font-bold'>{post.title}</h1>
        {/* Mostrar la imagen del post si imageURL está presente */}
        {post.imageURL && <img src={post.imageURL} alt="Post Image" style={{ maxWidth: '100%' }} />}
        <p className='text-slate-300'>{post.description}</p>

        {/* Botón de eliminación del post */}
        {user && user.id === post.autor._id && (
        <button onClick={handleDelete} className='bg-violet-900 text-white px-4 py-2 rounded-md my-2'>Eliminar Post</button>
        )}

        <h2 className="text-slate-100 font-semibold py-3">Comentarios:</h2>
        
       <ul className='text-slate-300 font-serif'>
          {comments.map((comment) => (
           <li key={comment._id}>
             {/* Mostrar la imagen del avatar y el nombre del autor */}
             <div className="comment-author-info">
                {comment.autor.avatarURL && (
                <img src={comment.autor.avatarURL} alt="Avatar" className="avatar w-6 h-6 rounded-full object-cover" />
                )}
                <p className="author-name">{comment.autor.username}</p>
             </div>

            {/* Mostrar la descripción del comentario */}
            <p>{comment.description}</p>

              {/* Botones de edición y eliminación del comentario */}
              {(user && (user.id === post.autor._id || user.id === comment.autor._id)) && (
             <div className="comment-buttons">
               <button
                  onClick={() => handleCommentDelete(comment._id)}
                  className='bg-red-900 text-white px-2 py-1 ml-2 rounded-md'>
                  Eliminar Comentario
               </button>

                <button
                 onClick={() => handleCommentEdit(comment)}
                 className='bg-blue-500 text-white px-2 py-1 ml-2 rounded-md'>
                 Editar Comentario
                </button>
             </div>
            )}


           {/* Formulario de edición del comentario */}
            {editingCommentId === comment._id && (
            <form onSubmit={(e) => handleCommentUpdate(e, comment._id)}>
             <textarea
               value={editedCommentText}
               onChange={(e) => setEditedCommentText(e.target.value)}
               rows="3"
               />
              <button type="submit">Guardar Cambios</button>
            </form>
            )}
          </li>
          ))}


        </ul>
           {/* Formulario para crear comentarios */}
           <div className='bg-red-500 max-w-md w-full p-10 rounded-md'>
              <CreateCommentForm postId={postId} userId={user ? user.id : null} onCommentCreated={handleCommentCreated} />
           </div>
      
    </div>
  );
};

export default PostDetailPage;






// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useParams } from 'react-router-dom';
// import CreateCommentForm from './CreateCommentForm';
// import { useUser } from '../context/UserContext'; // Importa useUser desde el contexto de usuario

// const PostDetailPage = () => {
//   const { postId } = useParams();
//   const [post, setPost] = useState(null);
//   const [comments, setComments] = useState([]);
//   const { user } = useUser(); // Utiliza useUser desde el contexto de usuario
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     console.log('Usuario:', user);
//     const fetchPostDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/api/post/${postId}`);
//         setPost(response.data);

//         // Verificar si el post tiene comentarios antes de hacer la solicitud
//         if (response.data.comments && response.data.comments.length > 0) {
//           const commentsResponse = await axios.get(`http://localhost:4000/api/comment/${postId}`);
//           setComments(commentsResponse.data);
//         } else {
//           // Si el post no tiene comentarios, establece el estado de los comentarios como un array vacío
//           setComments([]);
//         }
//       } catch (error) {
//         console.error('Error al obtener detalles del post:', error);
//       }
//     };

//     fetchPostDetails();
//   }, [user, postId]);

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:4000/api/post/${postId}`, {
//         headers: {
//           'x-access-token': token,
//         },
//         withCredentials: true,
//       });
//       // Redirige a la página de todos los posts
//       window.location.href = '/posts';
//       // Lógica para redirigir o actualizar la lista de posts después de la eliminación
//       // Puedes utilizar react-router o cualquier otra lógica de enrutamiento aquí
//     } catch (error) {
//       console.error('Error al eliminar el post:', error);
//     }
//   };

//   const handleCommentDelete = async (commentId) => {
//     try {
//       await axios.delete(`http://localhost:4000/api/comment/${commentId}`, {
//         headers: {
//           'x-access-token': token,
//         },
//         withCredentials: true,
//       });

//       // Actualizar la lista de comentarios después de la eliminación
//       const updatedComments = comments.filter((comment) => comment._id !== commentId);
//       setComments(updatedComments);
//     } catch (error) {
//       console.error('Error al eliminar el comentario:', error);
//     }
//   };

//   if (!post) {
//     return <div>Cargando...</div>;
//   }

//   // desde
//   const handleCommentCreated = (newComment) => {
//     // Lógica para actualizar el estado de los comentarios en PostDetailPage
//     setComments([...comments, newComment]);
//   };
//   // hasta
//   return (
//     <div className='bg-red-800 max-w-md w-full p-10 rounded-md'>
//       <p className='text-slate-300'>Autor: {post.autor.username}</p>
//       <p className='text-slate-300'>{new Date(post.updatedAt).toLocaleDateString()}</p>
//       <h1 className='text-2xl font-bold'>{post.title}</h1>
//       {/* Mostrar la imagen del post si imageURL está presente */}
//       {post.imageURL && <img src={post.imageURL} alt="Post Image" style={{ maxWidth: '100%' }} />}
//       <p className='text-slate-300'>{post.description}</p>

//       {/* Botón de eliminación del post */}
//       {user && user.id === post.autor._id && (
//         <button onClick={handleDelete} className='bg-violet-900 text-white px-4 py-2 rounded-md my-2'>Eliminar Post</button>
//       )}

//       <h2 className="text-slate-100 font-semibold py-3">Comentarios:</h2>
//       <ul className='text-slate-300 font-serif'>
//       {comments.map((comment) => (
//       <li key={comment._id}>
//       {comment.description}

//       {/* Botón de eliminación del comentario */}
//       {(user && (user.id === post.autor._id || user.id === comment.autor)) && (
//       <button onClick={() => {
//         console.log('Intento de eliminación de comentario:', comment);
//         handleCommentDelete(comment._id);
//       }} className='bg-red-900 text-white px-2 py-1 ml-2 rounded-md'>
//         Eliminar Comentario
//       </button>
//     )}
//        </li>
// ))}

//       </ul>

//       {/* Formulario para crear comentarios */}
//       <div className='bg-red-500 max-w-md w-full p-10 rounded-md'>
//         <CreateCommentForm postId={postId} userId={user ? user.id : null} onCommentCreated={handleCommentCreated} />
//       </div>
//     </div>
//   );
// };

// export default PostDetailPage;










// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useParams } from 'react-router-dom';
// import CreateCommentForm from './CreateCommentForm';
// import { useUser } from '../context/UserContext'; // Importa useUser desde el contexto de usuario

// const PostDetailPage = () => {
//   const { postId } = useParams();
//   const [post, setPost] = useState(null);
//   const [comments, setComments] = useState([]);
//   const { user } = useUser(); // Utiliza useUser desde el contexto de usuario
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchPostDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/api/post/${postId}`);
//         setPost(response.data);

//         // Verificar si el post tiene comentarios antes de hacer la solicitud
//         if (response.data.comments && response.data.comments.length > 0) {
//           const commentsResponse = await axios.get(`http://localhost:4000/api/comment/${postId}`);
//           setComments(commentsResponse.data);
//         } else {
//           // Si el post no tiene comentarios, establece el estado de los comentarios como un array vacío
//           setComments([]);
//         }
//       } catch (error) {
//         console.error('Error al obtener detalles del post:', error);
//       }
//     };

//     fetchPostDetails();
//   }, [postId]);

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:4000/api/post/${postId}`, {
//         headers: {
//           'x-access-token': token,
//         },
//         withCredentials: true,
//       });
//       // Redirige a la página de todos los posts
//       window.location.href = '/posts';
//       // Lógica para redirigir o actualizar la lista de posts después de la eliminación
//       // Puedes utilizar react-router o cualquier otra lógica de enrutamiento aquí
//     } catch (error) {
//       console.error('Error al eliminar el post:', error);
//     }
//   };

//   if (!post) {
//     return <div>Cargando...</div>;
//   }

//   //desde
//   const handleCommentCreated = (newComment) => {
//     // Lógica para actualizar el estado de los comentarios en PostDetailPage
//     setComments([...comments, newComment]);
//   };
//   //hasta
//   return (
//     <div className='bg-red-800 max-w-md w-full p-10 rounded-md'>
//       <p className='text-slate-300'>Autor: {post.autor.username}</p>
//       <p className='text-slate-300'>{new Date(post.updatedAt).toLocaleDateString()}</p>
//       <h1 className='text-2xl font-bold'>{post.title}</h1>
//       {/* Mostrar la imagen del post si imageURL está presente */}
//       {post.imageURL && <img src={post.imageURL} alt="Post Image" style={{ maxWidth: '100%' }} />}
//       <p className='text-slate-300'>{post.description}</p>


//       {/* Botón de eliminación */}
//       <button onClick={handleDelete} className='bg-violet-900 text-white px-4 py-2 rounded-md my-2 '>Eliminar Post</button>

//       <h2 className="text-slate-100 font-semibold py-3">Comentarios:</h2>
      
//         <ul className='text-slate-300 font-serif'>
//           {comments.map((comment) => (
//             <li key={comment._id}>{comment.description}</li>
//           ))}
//         </ul>

//         {/* Formulario para crear comentarios */}
//         <div className='bg-red-500 max-w-md w-full p-10 rounded-md'>

//           <CreateCommentForm postId={postId} userId={user ? user.id : null} onCommentCreated={handleCommentCreated} />

//         </div>

//     </div>
//   );
// };

// export default PostDetailPage;

