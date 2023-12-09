
// En el archivo PrivateRoute.js (o como lo hayas llamado)

import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function PrivateRoute() {
  const { isAuthenticated } = useUser();

  if (!isAuthenticated) {
    // Redirige a la página de inicio de sesión u otra página no autorizada
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}


export default PrivateRoute;




// // En el archivo PrivateRoute.js (o como lo hayas llamado)
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useUser } from '../context/UserContext';

// const PrivateRoute = ({ element, ...props }) => {
//   const { user } = useUser();

//   return (
//     <Route
//       {...props}
//       element={user ? element : <Navigate to="/login" />}
//     />
//   );
// };

// export default PrivateRoute;
