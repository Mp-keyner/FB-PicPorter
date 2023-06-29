import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import Show from "./show/Show";

export function ProtectedRoute({ children }) {
  const { isLoggedIn, logout, user } = useContext(AuthContext); // Utiliza AuthContext en lugar de AuthProvider
  console.log("estado de user", isLoggedIn);
  console.log("Date user", user);
  if (isLoggedIn) {
    return (
      <>
        <Navigate to="/Home" />
        {children}
      </>
    );
  } else {
    return (
      <>
        <Navigate to="/" />
        {children}
      </>
    );
  }
}
