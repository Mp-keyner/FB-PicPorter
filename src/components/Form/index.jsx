import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, uploadImage, storage } from "../../firebase";
import { AuthContext } from "../AuthContext";
import { toast } from "react-toastify";
import "./index.css";

import url from "../../img/noun-url-1244044.svg";
import book from "../../img/book.svg";
import dep from "../../img/dep.svg";
import save from "../../img/save.svg";
import docI from "../../img/docI.svg";

const Form = () => {
  const [urlImgDes, setUrlImgDes] = useState("");
  const { user } = useContext(AuthContext);
  const [cargada, setCargada] = useState(true);
  const [botonHabilitado, setBotonHabilitado] = useState(false);
  const navigate = useNavigate();
  const initialState = {
    url: "",
    descripcion: "",
    name: "",
  };
  const [values, setValues] = useState(initialState);
  const collectioUser = collection(db, user.displayName);
  const Newvalues = { ...values, Images: urlImgDes };

  // img
  const handelFiles = async (e) => {
    const archivo = e.target.files[0];
    const refArchivo = ref(storage, `documentos/${archivo.name}`);
    try {
      await uploadBytes(refArchivo, archivo);
      setUrlImgDes(await getDownloadURL(refArchivo));
      toast.success("Imagen cargada con éxito 👍🏼🏆");
      setBotonHabilitado(true);
    } catch (error) {
      toast.error("Error: " + error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedFiles = e.target.querySelector('input[type="file"]').value;
    const { name, url } = values;

    if (url && selectedFiles) {
      toast.error(
        "Error: Por favor, seleccione solo una opción: URL o archivo"
      );
      return;
    }

    if (name.length > 18) {
      toast.error(
        "Error: Nombre demasiado largo. Por favor, ingrese menos de 18 caracteres."
      );
      return;
    }

    if (!url && !selectedFiles) {
      toast.error("Error: Por favor, ingrese una URL o seleccione un archivo");
      return;
    }
    if (!cargada) {
      toast.error("Error: Por favor, llene los campos requeridos URL o FILES");
      return;
    }

    try {
      const docRef = await addDoc(collectioUser, Newvalues);
      setValues(initialState);
      navigate("/");
      toast.success("Producto agregado con éxito", {
        toastClassName: "custom-toast",
      });
    } catch (error) {
      toast.error("Error: " + error);
    }
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (url.length > 0) {
      setBotonHabilitado(true);
    }
  };
  const resetFile = () => {
    const file = document.querySelector("#file");
    file.value = "";
  };

  return (
    <div className="containerFormAdd">
      <div className="confor">
        <h1>Agrega una imagen</h1>
        <form className="formFb" onSubmit={handleSubmit}>
          <label htmlFor="url" className="label">
            <img src={url} alt="" className="image" />
            <input
              type="text"
              name="url"
              placeholder="Url de la imagen"
              value={values.url}
              onChange={handelChange}
              style={{ marginBottom: 0 }}
              id="url"
            />
          </label>
          <label htmlFor="name" className="label">
            <img src={book} alt="" className="image" />
            <input
              type="text"
              name="name"
              placeholder="Nombre de la imagen"
              value={values.name}
              onChange={handelChange}
              style={{ marginBottom: 0 }}
              id="name"
            />
          </label>
          <label htmlFor="descripcion" className="label">
            <img src={dep} alt="" className="image" />
            <input
              type="text"
              name="descripcion"
              placeholder="Descripcion de la imagen"
              value={values.descripcion}
              onChange={handelChange}
              style={{ marginBottom: 0 }}
              id="descripcion"
            />
          </label>
          <div className="centrar or">
            <hr />
            <p>Or</p>
            <hr />
          </div>
          <div className="centrar">
            <div class="input-file">
              <input
                type="file"
                id="file"
                name="file"
                placeholder="Agregar Imagen"
                onChange={handelFiles}
              />
              <label for="file" class="input-file-label centrar">
                <img src={docI} alt="" />
                Seleccionar archivo
              </label>
            </div>
            <button className="buttonsutmi" onClick={resetFile}>
              Reset
            </button>
          </div>
          <button
            className="centrar buttonsutmi"
            style={{ display: botonHabilitado ? "flex" : "none" }}
          >
            <img src={save} alt="" />
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;

// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { collection, addDoc } from "firebase/firestore";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { db, uploadImage, storage } from "../../firebase";
// import { AuthContext } from "../AuthContext";
// import { toast } from "react-toastify";
// import "./index.css";

// import url from "../../img/noun-url-1244044.svg";
// import book from "../../img/book.svg";
// import dep from "../../img/dep.svg";
// import save from "../../img/save.svg";

// const Form = () => {
//   const [urlImgDes, setUrlImgDes] = useState("");
//   const { user } = useContext(AuthContext);
//   const [cargada, setCargada] = useState(true);
//   const navigate = useNavigate();
//   const initialState = {
//     url: "",
//     descripcion: "",
//     name: "",
//   };
//   const [values, setValues] = useState(initialState);
//   const collectioUser = collection(db, user.displayName);
//   const Newvalues = { ...values, Images: urlImgDes };
//   console.log(Newvalues);

//   // img
//   const handelFiles = async (e) => {
//     const archivo = e.target.files[0];
//     const refArchivo = ref(storage, `documentos/${archivo.name}`);
//     try {
//       await uploadBytes(refArchivo, archivo);
//       setUrlImgDes(await getDownloadURL(refArchivo));
//       console.log("URL de IIMG => ", urlImgDes);
//       toast.success("Imagen Cargada con exito 👍🏼🏆");
//     } catch (error) {
//       toast.error("Error: ", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     const selectedFiles = e.target.querySelector('input[type="file"]').value;
//     const { name, url, descripcion } = values;
//     e.preventDefault();
//     console.log(e);
//     console.log(selectedFiles);

//     if (url || selectedFiles) {
//       setCargada(!cargada);
//       console.log(cargada);
//     } else {
//       toast.error("Error: Por favor ingrese una URL o seleccione un archivo");
//       return;
//     }

//     if (name === "" || descripcion === "") {
//       toast.error("Error: Por favor llene todos los campos");
//     } else {
//       if (!cargada) {
//         toast.error("Error: Por favor llene los campos requeridos URL o FILES");
//       } else {
//         try {
//           const docRef = await addDoc(collectioUser, Newvalues);
//           console.log("Documento agregado con ID:", docRef.id);
//           setValues(initialState);
//           navigate("/");
//           toast.success("Producto agregado con éxito", {
//             toastClassName: "custom-toast",
//           });
//         } catch (error) {
//           console.error("Error al agregar el documento:", error);
//           toast.error("Error", error);
//         }
//       }
//     }
//   };

//   const handelChange = async (e) => {
//     const { name, value } = e.target;
//     setValues({ ...values, [name]: value });
//   };

//   return (
//     <div className="containerFormAdd">
//       <div className="confor">
//         <h1>Agrega una imagen</h1>
//         <form className="formFb" onSubmit={handleSubmit}>
//           <label htmlFor="url" className="label">
//             <img src={url} alt="" className="image" />
//             <input
//               type="text"
//               name="url"
//               placeholder="Url de la imagen"
//               value={values.url}
//               onChange={handelChange}
//               style={{ marginBottom: 0 }}
//               id="url"
//             />
//           </label>
//           <label htmlFor="name" className="label">
//             <img src={book} alt="" className="image" />
//             <input
//               type="text"
//               name="name"
//               placeholder="Nombre de la imagen"
//               value={values.name}
//               onChange={handelChange}
//               style={{ marginBottom: 0 }}
//               id="name"
//             />
//           </label>
//           <label htmlFor="descripcion" className="label">
//             <img src={dep} alt="" className="image" />
//             <input
//               type="text"
//               name="descripcion"
//               placeholder="Descripcion de la imagen"
//               value={values.descripcion}
//               onChange={handelChange}
//               style={{ marginBottom: 0 }}
//               id="descripcion"
//             />
//           </label>
//           <div className="centrar or">
//             <hr />
//             <p>Or</p>
//             <hr />
//           </div>
//           <div>
//             <input
//               type="file"
//               id="file"
//               name="file"
//               placeholder="Agregar Imagen"
//               onChange={handelFiles}
//             />
//           </div>
//           <button className="centrar buttonsutmi">
//             <img src={save} alt="" />
//             Save
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Form;

// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { collection, addDoc } from "firebase/firestore";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { db, uploadImage, storage } from "../../firebase";
// import { AuthContext } from "../AuthContext";
// import { toast } from "react-toastify";
// import "./index.css";

// import url from "../../img/noun-url-1244044.svg";
// import book from "../../img/book.svg";
// import dep from "../../img/dep.svg";
// import save from "../../img/save.svg";

// const Form = () => {
//   let urlImgDes;
//   const { user } = useContext(AuthContext);
//   const [cargada, setCargada] = useState(true);
//   const navigate = useNavigate();
//   const initialState = {
//     url: "",
//     descripcion: "",
//     name: "",
//   };
//   const [values, setValues] = useState(initialState);
//   const collectioUser = collection(db, user.displayName);
//   const Newvalues = { ...values, Images: urlImgDes };
//   console.log(Newvalues);
//   // img
//   const handelFiles = async (e) => {
//     const archivo = e.target.files[0];
//     const refArchivo = ref(storage, `documentos/${archivo.name}`);
//     await uploadBytes(refArchivo, archivo);
//     urlImgDes = await getDownloadURL(refArchivo);
//   };

//   const handleSubmit = async (e) => {
//     const selectedFiles = e.target.querySelector('input[type="file"]').value;
//     const { name, url, descripcion } = values;
//     e.preventDefault();
//     console.log(e);
//     console.log(selectedFiles);
//     if (url.length > 0 || selectedFiles.length > 0) {
//       setCargada(!cargada);
//       console.log(cargada);
//     }
//     if (name === "" || descripcion === "") {
//       toast.error("Error: Por favor llené los campos");
//     } else {
//       if (cargada === false) {
//         toast.error("Error: Por favor llené los campos requeridos URL o FILES");
//       } else {
//         try {
//           const docRef = await addDoc(collectioUser, Newvalues); // Utiliza collectionRef en lugar de collectionUser
//           console.log("Documento agregado con ID:", docRef.id);
//           setValues(initialState);
//           navigate("/");
//           toast.success("Producto agregado con éxito", {
//             toastClassName: "custom-toast",
//           }); // Mostrar notificación de éxito
//         } catch (error) {
//           console.error("Error al agregar el documento:", error);
//           toast.error("Error", error); // Mostrar notificación de error
//         }
//       }
//     }
//   };

//   const handelChange = async (e) => {
//     const { name, value } = e.target;
//     setValues({ ...values, [name]: value });
//   };

//   return (
//     <div className="containerFormAdd">
//       <div className="confor">
//         <h1>Agrega una imagen</h1>
//         <form className="formFb" onSubmit={handleSubmit}>
//           <label htmlFor="url" className="label">
//             <img src={url} alt="" className="image" />
//             <input
//               type="text"
//               name="url"
//               placeholder="Url de la imagen"
//               value={values.url}
//               onChange={handelChange}
//               style={{ marginBottom: 0 }}
//               id="url"
//             />
//           </label>
//           <label htmlFor="name" className="label">
//             <img src={book} alt="" className="image" />
//             <input
//               type="text"
//               name="name"
//               placeholder="Nombre de la imagen"
//               value={values.name}
//               onChange={handelChange}
//               style={{ marginBottom: 0 }}
//               id="name"
//             />
//           </label>
//           <label htmlFor="descripcion" className="label">
//             <img src={dep} alt="" className="image" />
//             <input
//               type="text"
//               name="descripcion"
//               placeholder="Descripcion de la imagen"
//               value={values.descripcion}
//               onChange={handelChange}
//               style={{ marginBottom: 0 }}
//               id="descripcion"
//             />
//           </label>
//           <div className="centrar or">
//             <hr />
//             <p>Or</p>
//             <hr />
//           </div>
//           <div>
//             <input
//               type="file"
//               id="file"
//               name="file"
//               placeholder="Agregar Imagen"
//               onChange={handelFiles}
//             />
//           </div>
//           <button className="centrar buttonsutmi">
//             <img src={save} alt="" />
//             Save
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Form;

// import React, { useContext, useState } from "react";
// import url from "../../img/noun-url-1244044.svg";
// import book from "../../img/book.svg";
// import dep from "../../img/dep.svg";
// import save from "../../img/save.svg";
// import { useNavigate } from "react-router-dom";
// import "./index.css";
// import { collection, addDoc } from "firebase/firestore";
// import { db, collectionRef } from "../../firebase";
// import { AuthContext } from "../AuthContext";
// import { toast } from "react-toastify";

// const Form = ({ addOredit, dateForm }) => {
//   const { user } = useContext(AuthContext); // Utiliza AuthContext en lugar de AuthProvider
//   const collectionUser = collection(db, user.displayName);
//   const navigate = useNavigate();
//   const initialState = {
//     url: "",
//     descripcion: "",
//     name: "",
//   };
//   const [values, setValues] = useState(initialState);
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const docRef = await addDoc(collectionUser, values);
//       console.log("Documento agregado con ID:", docRef.id);
//       setValues(initialState);
//       navigate("/");
//       toast.success("Producto agregado con éxito", {
//         toastClassName: "custom-toast",
//       }); // Mostrar notificación de éxito
//     } catch (error) {
//       console.error("Error al agregar el documento:", error);
//       toast.error("Error", error); // Mostrar notificación de error
//     }
//   };
//   const handelChange = (e) => {
//     const { name, value } = e.target;
//     setValues({ ...values, [name]: value });
//     // console.log(name, value);
//   };
//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };
//   const handleDrop = (event) => {
//     event.preventDefault();
//     setSelectedFile(event.dataTransfer.files[0]);
//   };
//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };
//   const uploadImage = async () => {
//     if (!selectedFile) {
//       console.log("No se ha seleccionado ningún archivo");
//       return;
//     }

//     // Crear una referencia única para el archivo
//     const storageRef = firebase.storage().ref();
//     const fileRef = storageRef.child(selectedFile.name);

//     try {
//       // Subir el archivo a Firebase Storage
//       const snapshot = await fileRef.put(selectedFile);

//       // Obtener la URL de descarga del archivo
//       const downloadURL = await snapshot.ref.getDownloadURL();

//       // Guardar la URL en Firestore
//       const firestore = firebase.firestore();
//       await firestore.collection("images").add({
//         url: downloadURL,
//         createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//       });

//       console.log("Imagen cargada y URL guardada en Firestore");
//     } catch (error) {
//       console.error("Error al cargar la imagen:", error);
//     }
//   };
//   return (
//     <div className="containerFormAdd">
//       <div className="confor">
//         <h1>Agrega una imagen</h1>
//         <form className="formFb" onSubmit={handleSubmit}>
//           <label form="url" className="label">
//             <img src={url} alt="" className="image" />
//             <input
//               type="text"
//               name="url"
//               placeholder="Url de la imagen"
//               value={values.url}
//               onChange={handelChange}
//               style={{ marginBottom: 0 }}
//             />
//           </label>
//           <label form="name" className="label">
//             <img src={book} alt="" className="image" />
//             <input
//               type="text"
//               name="name"
//               placeholder="Nombre de la imagen"
//               value={values.name}
//               onChange={handelChange}
//               style={{ marginBottom: 0 }}
//             />
//           </label>
//           <label form="descripcion" className="label">
//             <img src={dep} alt="" className="image" />
//             <input
//               type="text"
//               name="descripcion"
//               placeholder="Descripcion de la imagen"
//               value={values.descripcion}
//               onChange={handelChange}
//               style={{ marginBottom: 0 }}
//             />
//           </label>
//           <button className="centrar buttonsutmi">
//             <img src={save} alt="" />
//             Save
//           </button>
//         </form>
//       </div>
//       <div className="centrar or">
//         <hr />
//         <p>Or</p>
//         <hr />
//       </div>
//       <div>
//         <input type="file" onChange={handleFileChange} />
//         <div
//           onDrop={handleDrop}
//           onDragOver={handleDragOver}
//           style={{ border: "1px dashed black", padding: "1rem" }}
//         >
//           Arrastra y suelta una imagen aquí
//         </div>
//         <button onClick={uploadImage}>Cargar imagen</button>
//       </div>
//     </div>
//   );
// };

// export default Form;
