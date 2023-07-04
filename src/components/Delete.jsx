import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, deleteDoc, collection } from "firebase/firestore";
import { db, collectionRef } from "../firebase";
import { toast } from "react-toastify";
import { AuthContext } from "../components/AuthContext";
import picture from "../img/iconimageBlack.svg";
import { motion } from "framer-motion";

const Delete = () => {
  const { user } = useContext(AuthContext);
  const collectioUser = collection(db, user.displayName);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const deleteData = async () => {
      try {
        await deleteDoc(doc(collectioUser, id));
        toast.success("Producto eliminado con éxito"); // Mostrar notificación de éxito
        navigate("/");
      } catch (error) {
        toast.error("Error al eliminar el producto"); // Mostrar notificación de error
      }
    };

    deleteData();
  }, [id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <div className="containerDele">
        <h1>Eliminando dato</h1>
        <p>{id}</p>
        <img src={picture} alt="" />
        {/* Puedes agregar una animación o mensaje de carga aquí */}
      </div>
    </motion.div>
  );
};

export default Delete;
