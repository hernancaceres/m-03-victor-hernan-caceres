import { Link } from "react-router-dom";

function Navbar ()  {

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to="/"><h1 className="text-2xl font-bold">Nabvar</h1></Link>
      <ul className="flex gap-x-2">
        <li>
            <Link to="/login"
            className="bg-indigo-900 px-4 py-2 rounded-sm">Login</Link>
        </li>
        <li>
            <Link to="/register"
            className="bg-indigo-900 px-4 py-2 rounded-sm">Register</Link>
        </li>
      </ul>
     
    </nav>
  )
}

export default Navbar;
