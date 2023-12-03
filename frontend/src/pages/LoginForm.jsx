// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useThemeContext } from "../context/ThemeContext";
// import axiosInstance from '../components/axios';
// import Cookies from "js-cookie";
// import { useUser } from "../context/UserContext";

// function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const { contextTheme } = useThemeContext();
//   const { dispatch } = useUser(); // Obtén la función `dispatch` del contexto

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axiosInstance.post("http://localhost:4000/api/login", {
//         email,
//         password,
//       });

//       console.log("Respuesta del servidor:", response);

//       // Agrega este console.log para imprimir el token antes de intentar obtenerlo
//       console.log("Token antes de obtenerlo:", response.data && response.data.token);

//       // Verifica si la respuesta contiene un campo 'data' y dentro un campo 'token' para obtener el token
//       const token = response.data && response.data.token;

//       console.log("Token obtenido:", token);

//       if (token) {
//         // Utiliza js-cookie para manejar la cookie
//         Cookies.set('token', token);

//         console.log('Token almacenado en cookies:', token);

//         // Guarda el token en el almacenamiento local
//         localStorage.setItem("token", token);

//         // Despacha la acción para establecer el usuario después del inicio de sesión
//         dispatch({ type: 'LOGIN_SUCCESS', payload: { userId: response.data.id } });

//         // Redirige a la página de crear post
//         navigate('/create-post');
        
//       } else {
//         console.error("Token de acceso no válido:", token);
//       }

//     } catch (error) {
//       console.error("Error de inicio de sesión:", error);
//     }
//   };

//   return (
//     <div className={`container d-flex justify-content-center align-items-center h-100 ${contextTheme}`}>
//       <div className="row">
//         <form onSubmit={handleSubmit}>
//           <div className='mb-3'>
//             <label className='form-label'>Email</label>
//             <input type="email" className='form-control' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           </div>
//           <div className='mb-3'>
//             <label className='form-label'>Password</label>
//             <input type="password" className='form-control' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//           </div>
//           <button type="submit" className='btn btn-outline-secondary' id={contextTheme}>Iniciar sesión</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default LoginForm;
