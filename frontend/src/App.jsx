
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompCreateUsuario from './pages/CompCreateUsuario';
import Home from './pages/Home';
import LoginForm from './pages/LoginForm';
import { useUser } from './context/UserContext';
import axiosInstance from './components/axios';
import Cookies from 'js-cookie';
import CreatePostForm from './pages/CreatePostForm';
import { Suspense } from 'react';
import Navbar from './components/navbar';
import PostDetailPage from './pages/PostDetailPage';
import PostList from './pages/PostList';
import UpdatePostPage from './pages/UpdatePostPage';
import CreateCommentForm from './pages/CreateCommentForm';
import PrivateRoute from './pages/PrivateRoute';



// ... (importaciones omitidas para mayor claridad)

function App() {
  const { dispatch } = useUser();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const storedToken = localStorage.getItem('token') || Cookies.get('token');

        if (storedToken) {
          console.log('Token encontrado. Verificando autenticación...');

          // Verificar la validez del token y obtener la información del usuario
          const response = await axiosInstance.get('http://localhost:4000/api/verifyToken', {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });

          console.log('Respuesta del servidor:', response);

          // Despachar la acción de autenticación con la información del usuario
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { userId: response.data.id },
          });

          console.log('Autenticación exitosa. Usuario autenticado.');
        } else {
          console.log('Token no encontrado. El usuario no está autenticado.');
        }
      } catch (error) {
        console.error('Error al verificar el token:', error);
      }
    };

    checkAuthentication();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <main className='container mx-auto px-10'>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<CompCreateUsuario />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/post/:postId" element={<PostDetailPage />} />
            <Route element={<PrivateRoute />}>
              
              <Route path="/update-post/:postId" element={<UpdatePostPage />} />
              <Route path="/create-post" element={<CreatePostForm />} />
              <Route path="/create-comment/:postId" element={<CreateCommentForm />} />
            </Route>
          </Routes>
        </main>
      </Suspense>
    </BrowserRouter>
  );
}


export default App;





// import { useEffect } from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import CompCreateUsuario from './pages/CompCreateUsuario';
// import Home from './pages/Home';
// import LoginForm from './pages/LoginForm';
// import { useUser } from './context/UserContext';
// import axiosInstance from './components/axios';
// import Cookies from 'js-cookie';
// import CreatePostForm from './pages/CreatePostForm';
// import { Suspense } from 'react';
// import Navbar from './components/navbar';
// import PostDetailPage from './pages/PostDetailPage';
// import PostList from './pages/PostList';
// import UpdatePostPage from './pages/UpdatePostPage';
// import CreateCommentForm from './pages/CreateCommentForm';



// function App() {
//   const { dispatch } = useUser();

//   useEffect(() => {
//     const checkAuthentication = async () => {
//       try {
//         const storedToken = localStorage.getItem('token') || Cookies.get('token');

//         if (storedToken) {
//           // Verificar la validez del token y obtener la información del usuario
//           const response = await axiosInstance.get('http://localhost:4000/api/verifyToken', {
//             headers: {
//               Authorization: `Bearer ${storedToken}`,
//             },
//           });

//           // Despachar la acción de autenticación con la información del usuario
//           dispatch({
//             type: 'LOGIN_SUCCESS',
//             payload: { userId: response.data.id },
//           });
//         }
//       } catch (error) {
//         console.error('Error al verificar el token:', error);
//       }
//     };

//     checkAuthentication();
//   }, [dispatch]);

//   return (
//     <BrowserRouter>

//       <Suspense fallback={<div>Loading...</div>}>
//         <main className='container mx-auto px-10'>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/register" element={<CompCreateUsuario />} />
//           <Route path="/login" element={<LoginForm />} />
//           {/* rutas para crear posts */}
//           <Route path="/posts" element={<PostList />} />
//           <Route path="/post/:postId" element={<PostDetailPage />} />
//           <Route path="/update-post/:postId" element={<UpdatePostPage />} />
//           <Route path="/create-post" element={<CreatePostForm />} />
//           {/* rutas para comentarios */}
//           <Route path="/create-comment/:postId" element={<CreateCommentForm />} />
//         </Routes>
//         </main>
//       </Suspense>

//     </BrowserRouter>
//   );
// }

// export default App;