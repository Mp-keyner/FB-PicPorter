import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc, collection } from "firebase/firestore";
import { db, collectionRef } from "../firebase";
import url from "../img/noun-url-1244044.svg";
import { AuthContext } from "../components/AuthContext";
import { toast } from "react-toastify";

const UpdateData = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const initialState = {
    url: "",
    descripcion: "",
    name: "",
  };
  const [values, setValues] = useState(initialState);
  const { user } = useContext(AuthContext);
  const [docSnapshot, setDocSnapshot] = useState(null);
  const collectioUser = collection(db, user.displayName);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(collectionRef, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setDocSnapshot(data);
        setValues(data);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateDoc(doc(db, user.displayName, id), values);
      console.log("Documento actualizado correctamente con la ID ", id);
      navigate("/");
      toast.success("Producto actualizado con éxito"); // Mostrar notificación de éxito
    } catch (error) {
      console.error("Error al actualizar el documento:", error);
      toast.error("Error", error); // Mostrar notificación de error
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div>
      <h1>Actualizar dato {id}</h1>
      {docSnapshot && (
        <>
          <p>{docSnapshot.name}</p>
          <p>{docSnapshot.url}</p>
          <p>{docSnapshot.descripcion}</p>
        </>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="url" className="label">
          <img src={url} alt="" className="image" />
          <input
            type="text"
            name="url"
            placeholder="Url de la imagen"
            value={values.url}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="name" className="label">
          <img src={url} alt="" className="image" />
          <input
            type="text"
            name="name"
            placeholder="Nombre de la imagen"
            value={values.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="descripcion" className="label">
          <img src={url} alt="" className="image" />
          <input
            type="text"
            name="descripcion"
            placeholder="Descripcion de la imagen"
            value={values.descripcion}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UpdateData;
