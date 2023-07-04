import React, { useContext } from "react";
import Google from "../Google/index";
import "./index.css";
import logoko from "../../img/logoKo.svg";
import { AuthContext } from "../AuthContext";
import imgIcon from "../../img/94999.png";
import flecha from "../../img/flechaArriba.svg";
import SignUp from "../SignUp";
import { motion } from "framer-motion";

const Login = () => {
  const { Wiev } = useContext(AuthContext); // Utiliza AuthContext en lugar de AuthProvider
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <div className="containerLogin">
        <div className="containerDep">
          <img src={logoko} alt="LogoKO" className="imgLogo" />

          <div className="imageIn"></div>
          <div className="textDep">
            <h2>
              Guarda tus recuerdos más preciados en un lugar seguro y confiable.
              ¡Bienvenido a PicPorter
            </h2>
          </div>
        </div>

        <div className="derecha">
          <div className="containerForm">
            <div onClick={Wiev} className="wiev">
              <img src={flecha} alt="" className="flecha" />
              <h1>Sign in to FB-PicPorter</h1>
            </div>
            <Google />
            <div className="centrar or">
              <hr />
              <p>Or</p>
              <hr />
            </div>
            <img src={imgIcon} alt="imageIcon" className="imageIcon" />
            <div class="register">
              <form className="form">
                <label htmlFor="email">Correo Electrónico:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Ingresa tu correo electrónico"
                  required
                />
                <label htmlFor="password">Contraseña:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Ingresa tu contraseña"
                  required
                />
                <input type="submit" value="Enviar" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
