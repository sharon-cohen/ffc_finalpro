import AuthRoutes from "./pages/auth/AuthRoutes";
import { createContext, useEffect, useState } from "react";
import AppRoutes from "./pages/app/AppRoutes";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => false,
  isUserDoctor: false,
  setIsUserDoctor: () => {},
});

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUserDoctor, setIsUserDoctor] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const { type } = JSON.parse(localStorage.getItem("user"));
      setIsUserDoctor(type === "doctor");
      return setIsAuthenticated(true);
    }
    navigate("/auth/login");
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isAuthenticated,
          setIsAuthenticated,
          setIsUserDoctor,
          isUserDoctor,
        }}
      >
        <div className="d-flex flex-column flex-root">
          {!isAuthenticated && <AuthRoutes />}
          {isAuthenticated && <AppRoutes />}
        </div>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
