import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Asegúrate de importar useUser


const PostItem = ({ post, onDelete }) => {
  const { _id, title, description, autor, imageURL } = post;
  const { user, dispatch } = useUser();
  const autorUsername = autor ? autor.username : 'Autor Desconocido';

  const truncatedDescription = description.length > 100 ? description.substring(0, 100) + '...' : description;

  const handleDeleteClick = () => {
    onDelete(_id);
  };

  console.log("User en postItem:", user);
  console.log("post en postItem", post)
  //console.log("User ID en postItem:", user.id);
  //console.log("Autor ID en postItem:", autor._id);
  //console.log("Autor en postItem:", autor);

  //const autorUsername = autor ? autor.username : 'Autor Desconocido';

  return (
    <div className="post-item">
      <div className='bg-gray-900 max-w-md w-full p-10 rounded-md'>

        {/* Muestra la imagen desde la URL */}
        {imageURL && <img src={imageURL} alt="Post Image" style={{ maxWidth: '100%', height: '200px' }} />}

        <h2 className='text-2xl font-bold py-2'>{title}</h2>

        {/* Mostrar solo un fragmento de la descripción */}
        <p className='text-slate-300'>{truncatedDescription}</p>

        <div className='py-1'>
          <div className='flex justify-normal '>
            <div>
              {/* Mostrar el nombre del autor */}
              <p className='text-slate-400'> Posted by: {autorUsername}</p>
            </div>
            <div className='px-1'>
              {/* Mostrar la imagen del avatar si está presente */}
              {post.autor.avatarURL && (
                <img
                  src={post.autor.avatarURL}
                  alt={`${post.autor.username}'s Avatar`}
                  className="w-6 h-6 rounded-full object-cover "
                  style={{ marginLeft: '2px', marginRight: '6px' }}
                />
              )}
            </div>
          </div>
          <p className='text-slate-400  '> {new Date(post.updatedAt).toLocaleDateString()}</p>
        </div>


        {/* Botón para ir a la página de detalles del post */}
        <Link to={`/post/${_id}`}>
          <button className='bg-purple-600 px-4 py-2 my-2 rounded-md'>Ver Detalles del Post</button>
        </Link>

        {/* Botones de edición y eliminación */}
        <div className='flex justify-between'>
          {user && user.id && (
            // Mostrar el botón de eliminación solo si el usuario está autenticado y es el autor del post
            user.id === autor._id && (
              <button className='bg-purple-900 px-4 py-2 my-2 rounded-md' onClick={handleDeleteClick}>Eliminar Post</button>
            )
          )}

          {user && (
            // Mostrar el enlace de edición solo si el usuario está autenticado y es el autor del post
            user.id === autor._id && (
              <Link to={`/update-post/${_id}`}>
                <button className='bg-purple-900 px-4 py-2 my-2 rounded-md'>Editar Post</button>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};


export default PostItem;
