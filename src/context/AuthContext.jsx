import authServices from "../services/AuthServices";

const { createContext, useState, useEffect } = require("react");

// Create the context for authentification
const AuthContext = createContext();

function AuthProviderWrapper({ children }) {
  // Initialize states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginFormShow, setIsLoginFormShow] = useState(false);

  // Stored authToken into localStorage
  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  // Authenticate the use using the authServices.verify
  const authenticateUser = (body) => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      authServices
        .verify()
        .then((response) => {
          const user = response.data;
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
        })
        .catch((error) => {
          console.log(error);
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  // Logout the user
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUser(null);
  };

  // Authenticate user each time he open the app to verify if
  // the user have a authToken and if the authToken is valid
  // so the user can stay connected.
  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        authenticateUser,
        isLoading,
        user,
        storeToken,
        isLoginFormShow,
        setIsLoginFormShow,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProviderWrapper };
