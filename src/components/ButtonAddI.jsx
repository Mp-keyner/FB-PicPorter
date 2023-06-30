import React from "react";
import { useNavigate } from "react-router-dom";

const ButtonAddI = () => {
  const navigate = useNavigate();
  return (
    <div className="btnAdd" onClick={() => navigate("/New")}>
      +
      <img
        src="https://raw.githubusercontent.com/Mp-keyner/PicPorter/f8a267d0f1c07e141187f68a4eda9a241b857af7/public/img/Pic.svg"
        alt=""
      />
    </div>
  );
};

export default ButtonAddI;
