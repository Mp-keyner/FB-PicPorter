import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import Salir from "../../img/salirIcon.svg";
import { toast } from "react-toastify";
// onClick={handleLogout}
const Nav = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout, user, Wiev } = useContext(AuthContext); // Utiliza AuthContext en lugar de AuthProvider
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const inicia = () => {
    Wiev();
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  // const mensa = () => {
  //   toast.success(
  //     "Sé que quieres dejar ya todo esto, pero no te des por vencido tan pronto, tú puedes falta poco...Lo estás haciendo bien campeón🏆",
  //     {
  //       autoClose: 20000,
  //     }
  //   );
  // };
  return (
    <>
      <div className="nav center">
        <div>
          <div className="center">
            <img
              src="https://raw.githubusercontent.com/Mp-keyner/PicPorter/f8a267d0f1c07e141187f68a4eda9a241b857af7/public/img/logo-ko.svg"
              className="logo"
              alt=""
            />
            <div className="center" style={{ gap: "0px" }}>
              <h2>FB-PicPorter</h2>
              <img
                src="https://raw.githubusercontent.com/Mp-keyner/PicPorter/f8a267d0f1c07e141187f68a4eda9a241b857af7/public/img/Pic.svg"
                alt=""
              />
            </div>
          </div>

          <div className="center">
            {user.displayName == "Images" ? (
              ""
            ) : (
              <>
                <p>!HI¡</p>
                <h2>{user.displayName}</h2>
              </>
            )}
          </div>
        </div>
        {isLoggedIn && (
          <>
            <div
              className={`menu-toggle ${isOpen ? "open" : ""}`}
              onClick={toggleMenu}
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </>
        )}
        <div
          className={`center ${isLoggedIn ? "navMovil" : ""} ${
            isOpen ? "show" : ""
          }`}
        >
          {isLoggedIn ? (
            <div>
              <ul className="center ulMovil">
                <Link to={"/Home"}>
                  <li onClick={toggleMenu}>Home</li>
                </Link>
                <li onClick={toggleMenu}>About</li>
                <Link to={"/New"}>
                  <li onClick={toggleMenu}>New Image</li>
                </Link>
              </ul>
            </div>
          ) : (
            <></>
          )}
          <div className="containerLogout">
            {isLoggedIn ? (
              <>
                <li className="center">
                  <img
                    src={user.photoURL}
                    alt="image user"
                    className="imgUser"
                  />
                </li>
                <li>
                  <button className="cerrarSesion" onClick={handleLogout}>
                    <img src={Salir} alt="image user" />
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button className="iniciSesion" onClick={inicia}>
                  Iniciar sesión
                </button>
              </li>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
