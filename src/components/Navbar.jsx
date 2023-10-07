import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { setIsLoginFormShow, isLoggedIn, handleLogout } =
    useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (location.pathname === "/signup") {
      navigate("/");
    }
    setIsLoginFormShow(true);
  };

  return (
    <nav className="flex bg-gray-50 border border-gray-200 py-2 px-8 items-center justify-center">
      <div className="w-full max-w-7xl flex">
        <Link to="/">
          <h1 className="font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-green-500 to-lime-500 flex">
            Prolink
          </h1>
        </Link>
        <div className="h-full ml-auto flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link to="/signup" className="p-2 text-gray-500">
                Sign up
              </Link>
              <button onClick={handleLoginClick} className="p-2 text-gray-500">
                Sign in
              </button>
            </>
          ) : (
            <>
              <Link
                to="/services/create"
                className="p-2 px-4 text-white bg-green-500 rounded-full"
              >
                Create a service
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 flex items-center justify-center"
              >
                <span class="material-symbols-outlined">logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
