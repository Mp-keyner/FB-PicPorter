import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db, collectionRef } from "../../firebase";
import "./index.css";

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
      await updateDoc(doc(db, "Images", id), values);
      console.log("Documento actualizado correctamente con la ID ", id);
      navigate("/");
    } catch (error) {
      console.error("Error al actualizar el documento:", error);
    }
  };
  return (
    <div>
      <p>{values.name}</p>
      <p>{values.url}</p>
      <p>{values.descripcion}</p>
      <Link to={`/update/${id}`} className="a">
        <p>Update</p>
      </Link>
      <Link to={`/Delete/${id}`} className="a">
        <p>Delete</p>
      </Link>
    </div>
  );
};

export default Description;
