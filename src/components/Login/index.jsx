import React, { useContext } from "react";
import Google from "../Google/index";
import "./index.css";
import logoko from "../../img/logoKo.svg";
import { AuthContext } from "../AuthContext";
import imgIcon from "../../img/94999.png";
import flecha from "../../img/flechaArriba.svg";

const Login = () => {
  const { Wiev } = useContext(AuthContext); // Utiliza AuthContext en lugar de AuthProvider
  return (
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
              <label for="email">Correo Electrónico:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Ingresa tu correo electrónico"
                required
              />
              <label for="name">Contraseña:</label>
              <input
                type="password"
                id="name"
                name="name"
                placeholder="Contra..."
                required
              />
              <input type="submit" value="Enviar" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
