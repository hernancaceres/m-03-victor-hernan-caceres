
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompCreateUsuario from './pages/CompCreateUsuario';
import Home from './pages/Home';
import LoginForm from './pages/LoginForm';
import { useUser } from './context/UserContext';
import axiosInstance from './components/axios';
import Cookies from 'js-cookie';

function App() {
  const { dispatch } = useUser();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const storedToken = localStorage.getItem('token') || Cookies.get('token');

        if (storedToken) {
          // Verificar la validez del token y obtener la información del usuario
          const response = await axiosInstance.get('http://localhost:4000/api/verifyToken', {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });

          // Despachar la acción de autenticación con la información del usuario
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { userId: response.data.id },
          });
        }
      } catch (error) {
        console.error('Error al verificar el token:', error);
      }
    };

    checkAuthentication();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<CompCreateUsuario />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;