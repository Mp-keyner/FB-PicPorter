import React, { useState, useEffect, useContext } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db, collectionRef } from "../../firebase";
import { AuthContext } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import notImage from "../../img/NoImage.png";
import ButtonAddI from "../ButtonAddI";
import Spiner from "../Spiner";
import { toast } from "react-toastify";

const Show = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const collectionUser = user ? collection(db, user.displayName) : null;
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true); // Variable de estado para controlar la carga

  useEffect(() => {
    getDocs(collectionUser)
      .then((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
        });
        setDocuments(docs);
        setLoading(false); // Una vez que se^` obtienen los documentos, se detiene la carga
      })
      .catch((error) => {
        toast.error("Error" + error);
        setLoading(false); // En caso de error, se detiene la carga
      });
  }, []);
  return (
    <div className="containerShow">
      {loading ? (
        // Mostrar el spinner mientras se cargan los datos
        <Spiner />
      ) : documents.length === 0 ? (
        // Mostrar el mensaje si no hay elementos en la base de datos
        <div className="notData" onClick={() => navigate("/New")}>
          <h1>
            ¡Empieza a almacenar recuerdos y las mejores experiencias AQUI!!
          </h1>
          <box-icon
            name="image-add"
            size="cssSize"
            style={{ width: "10pc" }}
          ></box-icon>
        </div>
      ) : (
        documents.map((doc) => {
          let imageUrl = doc.Images ? doc.Images : doc.url ? doc.url : notImage;

          if (imageUrl.startsWith("https://")) {
            console.log("");
          } else {
            console.log("");
            imageUrl = notImage;
          }

          return (
            <div
              onClick={() => navigate(`/Description/${doc.id}`)}
              key={doc.id}
              className="containerImg"
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundPosition: "center",
              }}
            >
              <h3>{doc.name}</h3>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Show;

// import React, { useState, useEffect, useContext } from "react";
// import { collection, addDoc, getDocs } from "firebase/firestore";
// import { db, collectionRef } from "../../firebase";
// import { AuthContext } from "../AuthContext";
// import { Link, useNavigate } from "react-router-dom";
// import "./index.css";
// import notImage from "../../img/NoImage.png";

// const Show = () => {
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);
//   const collectionUser = user ? collection(db, user.displayName) : null;
//   const [documents, setDocuments] = useState([]);

//   useEffect(() => {
//     getDocs(collectionUser)
//       .then((querySnapshot) => {
//         const docs = [];
//         querySnapshot.forEach((doc) => {
//           docs.push({ id: doc.id, ...doc.data() });
//         });
//         setDocuments(docs);
//       })
//       .catch((error) => {
//         console.log("Error al obtener los documentos:", error);
//       });
//   }, []);

//   const handleClick = () => {
//     console.log("Se le dio click");
//   };

//   return (
//     <div className="containerShow">
//       {documents.length === 0 ? (
//         <p>No hay imágenes o elementos disponibles.</p>
//       ) : (
//         documents.map((doc) => {
//           let imageUrl = doc.Images ? doc.Images : doc.url ? doc.url : notImage;

//           if (imageUrl.startsWith("https://")) {
//             console.log("La URL contiene 'https://' al principio");
//           } else {
//             console.log("La URL no contiene 'https://' al principio");
//             imageUrl = notImage;
//           }

//           return (
//             <div
//               onClick={() => navigate(`/Description/${doc.id}`)}
//               key={doc.id}
//               className="containerImg"
//               style={{
//                 backgroundImage: `url(${imageUrl})`,
//                 backgroundPosition: "center",
//               }}
//             >
//               <h3>{doc.name}</h3>
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// };

// export default Show;

// import React, { useState, useEffect, useContext } from "react";
// import { collection, addDoc, getDocs } from "firebase/firestore";
// import { db, collectionRef } from "../../firebase";
// import { AuthContext } from "../AuthContext";
// import { Link, useNavigate } from "react-router-dom";
// import "./index.css";
// import notImage from "../../img/NoImage.png";

// const Show = () => {
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext); // Utiliza AuthContext en lugar de AuthProvider
//   const collectionUser = user ? collection(db, user.displayName) : null;
//   const [documents, setDocuments] = useState([]);
//   // console.log(documents);
//   useEffect(() => {
//     getDocs(collectionUser)
//       .then((querySnapshot) => {
//         const docs = [];
//         querySnapshot.forEach((doc) => {
//           // Agrega los datos de cada documento a un array
//           docs.push({ id: doc.id, ...doc.data() });
//         });
//         setDocuments(docs);
//       })
//       .catch((error) => {
//         console.log("Error al obtener los documentos:", error);
//       });
//   }, []);
//   const handelCLick = () => {
//     console.log("se  le dio click");
//   };
//   return (
//     <div>
//       {documents.length === 0 ? (
//         <p>No hay imágenes o elementos disponibles.</p>
//       ) : (
//         documents.map((doc) => (
//           <div
//             onClick={() => navigate(`/Description/${doc.id}`)}
//             key={doc.id}
//             className="containerImg"
//             style={{
//               backgroundImage: `url(${
//                 doc.Images ? doc.Images : doc.url ? doc.url : notImage
//               })`,
//               backgroundPosition: "center",
//             }}
//           >
//             <h1>{doc.name}</h1>

//             <p>{doc.descripcion}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Show;
