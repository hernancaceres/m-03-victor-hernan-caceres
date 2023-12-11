import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/profile/${userId}`, {
          withCredentials: true,
        });

        // Setea los datos del usuario en el estado local
        setUserData(response.data);
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!userData) {
    // Puedes mostrar un mensaje de carga o spinner mientras se obtienen los datos del usuario
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Perfil de {userData.username}</h2>
      <p>Email: {userData.email}</p>
      {userData.avatarURL && (
        <img
          src={`http://localhost:4000/imagenes/${userData.avatarURL}`}
          alt="Avatar"
          style={{ maxWidth: '200px', maxHeight: '200px' }}
        />
      )}
      {/* Mostrar otros detalles del perfil del usuario según tus necesidades */}
    </div>
  );
}

export default Profile;
