const { createContext, useState } = require("react");

const AuthContext = createContext();

function AuthProviderWrapper({ children }) {
  const [isLogin, setIsLogin] = useState(false);

  const authenticateUser = () => {
    setIsLogin(true);
  };

  return (
    <AuthContext.Provider value={{ isLogin, authenticateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProviderWrapper };
