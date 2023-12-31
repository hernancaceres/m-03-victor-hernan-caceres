import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserContext';

function Profile() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const { dispatch } = useUser();

  console.log("userData en profile", userData)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/profile/${userId}`, {
          withCredentials: true,
        });

        // Setea los datos del usuario en el estado local
        setUserData(response.data);

        // Actualiza el estado global del usuario usando la acción 'SET_USER'
        dispatch({
          type: 'SET_USER',
          payload: {
            id: response.data.id,
            username: response.data.username,
            avatarURL: response.data.avatarURL,
          },
        });

        // Imprimir la URL de la imagen en la consola
        console.log('URL de la imagen perfil:', response.data.avatarURL);

      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    };

    fetchUserData();
  }, [userId, dispatch]);

  if (!userData) {
    // Puedes mostrar un mensaje de carga o spinner mientras se obtienen los datos del usuario
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {/* Muestra la imagen desde la URL */}
      {userData.avatarURL && <img src={userData.avatarURL} alt="avatarURL" style={{ maxWidth: '100%' }}
        className="w-56 h-56 rounded-full object-cover px-4 py-4 my-2" />}
      {/* Mostrar otros detalles del perfil del usuario según tus necesidades */}
      <h2 className='px-4 py-1 my-2'>Nombre de Usuario: {userData.username}</h2>
      <p className='px-4 py-1 my-1'>Email: {userData.email}</p>
    </div>
  );
}

export default Profile;
