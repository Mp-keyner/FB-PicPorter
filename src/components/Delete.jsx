import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, deleteDoc, collection } from "firebase/firestore";
import { db, collectionRef } from "../firebase";
import { toast } from "react-toastify";
import { AuthContext } from "../components/AuthContext";

const Delete = () => {
  const { user } = useContext(AuthContext);
  const collectioUser = collection(db, user.displayName);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const deleteData = async () => {
      try {
        await deleteDoc(doc(collectioUser, id));
        console.log("Documento eliminado correctamente");
        toast.success("Producto eliminado con éxito"); // Mostrar notificación de éxito
        navigate("/");
      } catch (error) {
        console.error("Error al eliminar el documento:", error);
        toast.error("Error al eliminar el producto"); // Mostrar notificación de error
      }
    };

    deleteData();
  }, [id]);

  return (
    <div>
      <h1>Eliminando dato {id}</h1>
      {/* Puedes agregar una animación o mensaje de carga aquí */}
    </div>
  );
};

export default Delete;
