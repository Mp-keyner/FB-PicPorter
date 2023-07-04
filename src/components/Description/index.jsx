import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc, collection } from "firebase/firestore";
import { db, collectionRef } from "../../firebase";
import "./index.css";
import { AuthContext } from "../AuthContext";
import notImage from "../../img/NoImage.png";
import book from "../../img/book.svg";
import dep from "../../img/dep.svg";
import { motion } from "framer-motion";

const Description = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const initialState = {
    url: "",
    descripcion: "",
    name: "",
  };
  const [values, setValues] = useState(initialState);
  const [docSnapshot, setDocSnapshot] = useState(null);
  const { user } = useContext(AuthContext);
  const collectioUser = collection(db, user.displayName);
  let imageUrl = values.Images
    ? values.Images
    : values.url
    ? values.url
    : notImage;

  if (imageUrl.startsWith("https://")) {
    console.log("");
  } else {
    imageUrl = notImage;
  }
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(collectioUser, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setDocSnapshot(data);
        setValues(data);
      }
    };

    fetchData();
  }, [id]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <div className="containerDescr">
        <div className="izquierda">
          <div>
            <div className="centrar">
              <img src={dep} alt="" />
              <h3>Nombre de la Imagen</h3>
            </div>
            <p>{values.name}</p>
          </div>
          <div>
            <div className="centrar">
              <img src={book} alt="" />
              <h3>Descripcion de la Imagen</h3>
            </div>
            <p>{values.descripcion}</p>
          </div>
          <div className="centrar containerBtn">
            <Link to={`/update/${id}`} className="a">
              <p className="verde">Update</p>
            </Link>
            <Link to={`/Delete/${id}`} className="a">
              <p className="rojo">Delete</p>
            </Link>
          </div>
        </div>
        <div className="derechad">
          <div
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              width: "90%",
              height: "90%",
            }}
          ></div>
        </div>
      </div>
    </motion.div>
  );
};

export default Description;
