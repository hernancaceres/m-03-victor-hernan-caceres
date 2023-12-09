import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Asegúrate de importar useUser


const PostItem = ({ post, onDelete }) => {
  const { _id, title, description, autor, imageURL } = post;
  const { user } = useUser();


  const handleDeleteClick = () => {
    onDelete(_id);
  };
  console.log("post aqui",post)

 
  return (
    <div className="post-item">

      <div className='bg-red-800 max-w-md w-full p-10 rounded-md'>
        <h2 className='text-2xl font-bold'>{title}</h2>

  {/* Muestra la imagen desde la URL */}
  {imageURL && <img src={imageURL} alt="Post Image" style={{ maxWidth: '100%' }} />}

        <p className='text-slate-300'>{description}</p>

        <p className='text-slate-300'>{ new Date(post.updatedAt).toLocaleDateString()}</p>

        {/* Botón para ir a la página de detalles del post */}
        <Link to={`/post/${_id}`}>
          <button>Ver Detalles del Post</button>
        </Link>

        {/* Botones de edición y eliminación */}
        <div>
          {/* Botón de eliminación */}
          <button onClick={handleDeleteClick}>Eliminar Post</button>

          {/* Agrega el enlace a la página de actualización del post */}
          <Link to={`/update-post/${_id}`}>
            <button>Editar Post</button>
          </Link>
        </div>

        

      </div>

    </div>
  );
};

export default PostItem;




// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { useUser } from '../context/UserContext'; // Asegúrate de importar useUser


// const PostItem = ({ post, onDelete }) => {
//   const { _id, title, description, autor, imageURL } = post;
//   const { user } = useUser();
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');

//   const handleDeleteClick = () => {
//     onDelete(_id);
//   };
//   console.log("post aqui",post)

//   useEffect(() => {
//     // Lógica para cargar la lista de comentarios del servidor
//     const fetchComments = async () => {
//       try {
//         // Verifica que el usuario esté disponible antes de hacer la solicitud
//         if (user && user.id) {
//           const response = await axios.get(`http://localhost:4000/api/comment/${_id}`);
//           setComments(response.data);
//         }

//       } catch (error) {
//         console.error('Error al obtener comentarios:', error);
//       }
//     };

//     fetchComments();
//   }, [_id, user]); // Se ejecutará cuando cambie el ID del post o el usuario

//   const handleCreateComment = async () => {
//     try {
//       const token = localStorage.getItem('token');

//       const response = await axios.post(
//         `http://localhost:4000/api/comment/${_id}`,
//         { description: newComment, autor },
//         {
//           headers: {
//             'x-access-token': token,
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true,
//         }
//       );

//       // Actualiza la lista de comentarios después de crear uno nuevo
//       setComments([...comments, response.data]);

//       console.log('Comentario creado:', response.data);
//     } catch (error) {
//       console.error('Error al crear el comentario:', error);
//     }
//   };

//   return (
//     <div className="post-item">

//       <div className='bg-red-800 max-w-md w-full p-10 rounded-md'>
//         <h2 className='text-2xl font-bold'>{title}</h2>
//         <p className='text-slate-300'>{description}</p>
        
//         {/* Muestra la imagen desde la URL */}
//         {imageURL && <img src={imageURL} alt="Post Image" style={{ maxWidth: '100%' }} />}
//         <p className='text-slate-300'>{ new Date(post.updatedAt).toLocaleDateString()}</p>

//         {/* Botones de edición y eliminación */}
//         <div>
//           {/* Botón de eliminación */}
//           <button onClick={handleDeleteClick}>Eliminar Post</button>

//           {/* Agrega el enlace a la página de actualización del post */}
//           <Link to={`/update-post/${_id}`}>
//             <button>Editar Post</button>
//           </Link>
//         </div>

//         {/* Botón para ir a la página de detalles del post */}
//         <Link to={`/post/${_id}`}>
//           <button>Ver Detalles del Post</button>
//         </Link>

//       </div>


//       {/* Renderiza la lista de comentarios */}
//       <div>
//         <h3>Comentarios:</h3>
//         <ul>
//           {comments.map(comment => (
//             <li key={comment._id}>{comment.description}</li>
//           ))}
//         </ul>
//       </div>

//       {/* Formulario para agregar un nuevo comentario */}
//       <div>
//         <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
//         <br />
//         <button onClick={handleCreateComment}>Crear Comentario</button>
//       </div>


//     </div>
//   );
// };

// export default PostItem;
