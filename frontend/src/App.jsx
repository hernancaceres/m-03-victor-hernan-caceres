import { BrowserRouter, Route, Routes } from "react-router-dom"
import CompCreateUsuario from "./pages/CompCreateUsuario"
import Home from "./pages/Home"
import LoginForm from "./pages/LoginForm"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/home' element={Home} />
        <Route path='/register' element={<CompCreateUsuario />} />

        <Route path='/login' element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
