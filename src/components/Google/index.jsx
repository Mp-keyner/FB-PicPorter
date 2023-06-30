import React, { useContext } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import logoGoogle from "../../img/googleIcon.svg";
import "./index.css";
import { toast } from "react-toastify";

const auth = getAuth();
const provider = new GoogleAuthProvider();

const Google = () => {
  const navigate = useNavigate();
  const { login, setUser } = useContext(AuthContext); // Obtén setIsLoggedIn y setUser del contexto

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        login(user); // Cambia el estado de isLoggedIn a true
        navigate("/Home");
      })
      .catch((error) => {
        // Error al iniciar sesión con Google
        toast.error("Error al iniciar sesión con Google" + error);
      });
  };

  return (
    <>
      <button onClick={signInWithGoogle} className="buttonGoogle">
        <img src={logoGoogle} alt="" />
        Iniciar sesión con Google
      </button>
    </>
  );
};

export default Google;
