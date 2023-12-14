
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from '../components/axios';
import Cookies from "js-cookie";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);

  const { dispatch } = useUser(); // Obtén la función `dispatch` del contexto

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("http://localhost:4000/api/login", {
        email,
        password,
      });

      console.log("Respuesta del servidor:", response);

      // Agrega este console.log para imprimir el token antes de intentar obtenerlo
      console.log("Token antes de obtenerlo:", response.data && response.data.token);

      // Verifica si la respuesta contiene un campo 'data' y dentro un campo 'token' para obtener el token
      const token = response.data && response.data.token;

      console.log("Token obtenido:", token);

      if (token) {
        // Utiliza js-cookie para manejar la cookie
        Cookies.set('token', token);

        console.log('Token almacenado en cookies:', token);

        // Guarda el token en el almacenamiento local
        localStorage.setItem("token", token);
        // localStorage.setItem('userId', response.data.id);
        // localStorage.setItem('username', response.data.username);

        // Despacha la acción para establecer el usuario después del inicio de sesión
        dispatch({ type: 'LOGIN_SUCCESS', payload: { userId: response.data.id, username: response.data.username, avatarURL: response.data.avatarURL, } });

        console.log( "username LOGIN_SUCCESS en login",response.data.username);
        console.log('Despacho de acción LOGIN_SUCCESS');
        console.log( "avatarURL LOGIN_SUCCESS en login",response.data.avatarURL);

        // // Redirige a la página de crear post
        navigate('/create-post');

      } else {
        console.error("Token de acceso no válido:", token);
      }

    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        // Mostrar errores devueltos por el servidor
        setErrors(error.response.data.errors);
      } else {
        console.error('Error en el inicio de sesión:', error.message);
      }
    }
  };

  return (

    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-violet-900 max-w-md w-full p-10 rounded-md">

        <h1 className="text-2xl font-bold"> Login</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-violet-700 text-white px-4 py-2 rounded-md my-2" />
            {/* Muestra los errores del campo 'email' */}
            {errors.map((error, index) => (
              error.path === 'email' && (
                <div className="text-red-500" key={index}>
                  {error.msg}
                </div>
              )
            ))}
          </div>
          <div>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-violet-700 text-white px-4 py-2 rounded-md my-2" />
              {/* Muestra los errores del campo 'password' */}
              {errors.map((error, index) => (
              error.path === 'password' && (
                <div className="text-red-500" key={index}>
                  {error.msg}
                </div>
              )
            ))}
          </div>
          <button type="submit"  >Iniciar sesión</button>
        </form>

        <p className="flex gap-x-2 justify-between">
          ¿No tienes una cuenta? <Link to="/register"
            className="text-withe-500">registrarse</Link>
        </p>

      </div>

    </div>
  );
}

export default LoginForm;




// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import axiosInstance from '../components/axios';
// import Cookies from "js-cookie";
// import { useUser } from "../context/UserContext";
// import { Link } from "react-router-dom";

// function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
// const navigate = useNavigate();

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

//         console.log('Despacho de acción LOGIN_SUCCESS');


//         // // Redirige a la página de crear post
//          navigate('/create-post');

//       } else {
//         console.error("Token de acceso no válido:", token);
//       }

//     } catch (error) {
//       console.error("Error de inicio de sesión:", error);
//       console.log(error.response)
//     }
//   };

//   return (

//     <div className="flex h-[calc(100vh-100px)] items-center justify-center">
//       <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">

//         <h1 className="text-2xl font-bold"> Login</h1>

//         <form onSubmit={handleSubmit}>

//           <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
//             className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" />

//           <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
//             className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" />

//           <button type="submit"  >Iniciar sesión</button>
//         </form>

//         <p className="flex gap-x-2 justify-between">
//           ¿No tienes una cuenta? <Link to="/register"
//           className="text-withe-500">registrarse</Link>
//         </p>

//       </div>

//     </div>
//   );
// }

// export default LoginForm;
