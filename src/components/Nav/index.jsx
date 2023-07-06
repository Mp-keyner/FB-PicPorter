import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import Salir from "../../img/salirIcon.svg";
import { toast } from "react-toastify";
import usericon from "../../img/user.svg";

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
  console.log(window.screen.height - 56);
  return (
    <>
      <div className="nav center fondodef">
        <div>
          <Link to={"/"}>
            <div className="center" style={{ marginLeft: "2pc" }}>
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
          </Link>
        </div>

        <div
          className="navMovil center"
          style={{ top: isOpen ? "48px" : window.screen.height - 92 + "px" }}
        >
          <div className="menuN fondodef">
            {isLoggedIn ? (
              <div>
                <ul className="center ulMovil">
                  <Link to={"/Home"}>
                    <li className="vertical">
                      <img src={usericon} alt="User" />
                      Home
                    </li>
                  </Link>
                  <li>
                    <div className="botonAdd">
                      <div>+</div>
                    </div>
                  </li>
                  <Link to={"/User"}>
                    <li className="vertical">
                      <img src={usericon} onClick={handleLogout} alt="User" />
                      User
                    </li>
                  </Link>
                </ul>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className={`center show`}>
          {isLoggedIn ? (
            <div>
              <ul className="center ">
                <Link to={"/Home"}>
                  <li onClick={toggleMenu}>Home</li>
                </Link>
                <li>
                  <li>
                    <div
                      className="botonAdd"
                      style={{
                        top: isOpen ? "48px" : window.screen.height - 92 + "px",
                      }}
                    >
                      <div>+</div>
                    </div>
                  </li>
                  <Link to={"/"} onClick={logout}>
                    <img src={usericon} alt="User" />
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;

// {isLoggedIn && (
//   <>
//     <div
//       className={`menu-toggle ${isOpen ? "open" : ""}`}
//       onClick={toggleMenu}
//     >
//       <span className="bar"></span>
//       <span className="bar"></span>
//     </div>
//   </>
// )}
