import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Asegúrate de importar useUser


const PostItem = ({ post, onDelete }) => {
  const { _id, title, description, autor, imageURL } = post;
  const { user, dispatch } = useUser();


  const handleDeleteClick = () => {
    onDelete(_id);
  };
  console.log("post aqui", post)


  return (
    <div className="post-item">

      <div className='bg-red-800 max-w-md w-full p-10 rounded-md'>

      <p className='text-slate-300'>{autor}</p>

        <h2 className='text-2xl font-bold'>{title}</h2>

        {/* Muestra la imagen desde la URL */}
        {imageURL && <img src={imageURL} alt="Post Image" style={{ maxWidth: '100%' }} />}

        <p className='text-slate-300'>{description}</p>

        <p className='text-slate-300'>{new Date(post.updatedAt).toLocaleDateString()}</p>

        {/* Botón para ir a la página de detalles del post */}
        <Link to={`/post/${_id}`}>
          <button>Ver Detalles del Post</button>
        </Link>

        {/* Botones de edición y eliminación */}
        <div>
          {user && (
            // Mostrar el botón de eliminación solo si el usuario está autenticado y es el autor del post
            user.id === autor && (
              <button onClick={handleDeleteClick}>Eliminar Post</button>
            )
          )}

          {user && (
            // Mostrar el enlace de edición solo si el usuario está autenticado y es el autor del post
            user.id === autor && (
              <Link to={`/update-post/${_id}`}>
                <button>Editar Post</button>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};


export default PostItem;
