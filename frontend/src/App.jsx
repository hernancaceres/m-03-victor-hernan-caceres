import { BrowserRouter, Route, Routes } from "react-router-dom"
import CompCreateUsuario from "./pages/CompCreateUsuario"


function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<h1>Home</h1> } />
        <Route path='/register' element={<CompCreateUsuario />} />
        <Route path='/login' element={<h1>login</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
