import React, { useState, useEffect, useContext } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db, collectionRef } from "../../firebase";
import { AuthContext } from "../AuthContext";
import { Link } from "react-router-dom";
import "./index.css";

const Show = () => {
  const { user } = useContext(AuthContext); // Utiliza AuthContext en lugar de AuthProvider
  const collectionUser = user ? collection(db, user.displayName) : null;
  const [documents, setDocuments] = useState([]);
  // console.log(documents);
  useEffect(() => {
    getDocs(collectionUser)
      .then((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          // Agrega los datos de cada documento a un array
          docs.push({ id: doc.id, ...doc.data() });
        });
        setDocuments(docs);
      })
      .catch((error) => {
        console.log("Error al obtener los documentos:", error);
      });
  }, []);

  return (
    <div>
      {documents.length === 0 ? (
        <p>No hay imágenes o elementos disponibles.</p>
      ) : (
        documents.map((doc) => (
          <Link
            to={`/Description/${doc.id}`}
            key={doc.id}
            className="containerImg"
          >
            <div>
              <h3>{doc.name}</h3>
              <h5>{doc.url}</h5>
              <p>{doc.descripcion}</p>
              {doc.Images && (
                <img
                  src={doc.Images}
                  alt="images"
                  style={{ width: "13pc", height: "13pc" }}
                />
              )}
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default Show;
