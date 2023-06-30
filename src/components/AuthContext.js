import React, { createContext, useState, useEffect } from "react";

// Crea el contexto
export const AuthContext = createContext();

// Crea el proveedor del contexto
export const AuthProvider = ({ children }) => {
  const initialState = {
    displayName: "Images",
  };
  const [user, setUser] = useState(initialState);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar si el usuario está almacenado en el localStorage al cargar la página
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    // Almacenar el usuario en el localStorage
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(initialState);
    setIsLoggedIn(false);
    // Eliminar el usuario del localStorage
    localStorage.removeItem("user");
  };
  const [isClicked, setIsClicked] = useState(false);
  const Wiev = () => {
    const element = document.querySelector(".derecha");
    const flecha = document.querySelector(".flecha");

    if (isClicked) {
      element.style.top = "31pc"; // Restaurar al valor original (vacío para eliminar inline style)
      flecha.style.transform = "rotate(0deg)";
    } else {
      element.style.top = "6pc"; // Cambia '10px' por el valor deseado
      flecha.style.transform = "rotate(180deg)";
    }

    setIsClicked(!isClicked); // Alternar el estado del clic
  };
  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, Wiev }}>
      {children}
    </AuthContext.Provider>
  );
};
