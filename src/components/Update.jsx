import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import url from "../img/noun-url-1244044.svg";
import { AuthContext } from "../components/AuthContext";
import { toast } from "react-toastify";
import save from "../img/save.svg";
import dep from "../img/dep.svg";
import book from "../img/book.svg";
import docI from "../img/docI.svg";

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
  const [botonHabilitado, setBotonHabilitado] = useState(false);
  const [cargada, setCargada] = useState(true);
  const [urlImgDes, setUrlImgDes] = useState("");
  const Newvalues = { ...values, Images: urlImgDes };

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
      await updateDoc(doc(db, user.displayName, id), Newvalues);
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
    if (url.length > 0) {
      setBotonHabilitado(true);
    }
  };

  const handelFiles = async (e) => {
    const archivo = e.target.files[0];
    const refArchivo = ref(storage, `documentos/${archivo.name}`);
    try {
      await uploadBytes(refArchivo, archivo);
      setUrlImgDes(await getDownloadURL(refArchivo));
      console.log("URL de IMG => ", urlImgDes);
      toast.success("Imagen cargada con éxito 👍🏼🏆");
      setBotonHabilitado(true);
    } catch (error) {
      toast.error("Error: " + error);
    }
  };
  const updateImage = async (e) => {
    // Aquí puedes agregar la lógica para actualizar la imagen
    try {
      // Por ejemplo, podrías obtener la referencia al documento existente
      const archivo = e.target.files[0];
      const refArchivo = ref(storage, `documentos/${archivo.name}`);

      // Luego, puedes cargar una nueva versión de la imagen y obtener la URL actualizada
      await uploadBytes(refArchivo, archivo);
      const nuevaUrl = await getDownloadURL(refArchivo);

      // Actualizas el estado con la nueva URL de la imagen
      setUrlImgDes(nuevaUrl);
      setBotonHabilitado(true);
      // Otras acciones que desees realizar después de actualizar la imagen
      console.log("URL de IMG actualizada => ", nuevaUrl);
      toast.success("Imagen actualizada con éxito 👍🏼🏆");
    } catch (error) {
      toast.error("Error al actualizar la imagen: " + error);
      console.log(error);
    }
  };
  const resetFile = () => {
    const file = document.querySelector("#file");
    file.value = "";
  };

  return (
    <div className="containerDescr">
      <div className="izquierdaUP">
        <div className="condep">
          <div>
            <div className="centrar">
              <img src={dep} alt="" />
              <h2>Actualizar dato</h2>
            </div>
            <span>{id}</span>
          </div>
          {docSnapshot && (
            <>
              <h3>{docSnapshot.name}</h3>
              <div className="centrar">
                <img src={book} alt="" />
                <h3>Descripcion de la Imagen</h3>
              </div>
              <p>{docSnapshot.descripcion}</p>
            </>
          )}
        </div>
      </div>
      <div className="derechad">
        <form onSubmit={handleSubmit} className="formFb">
          <label htmlFor="url" className="label">
            <img src={url} alt="" className="image" />
            <input
              type="text"
              name="url"
              placeholder="Url de la imagen"
              value={values.url}
              onChange={handleChange}
              style={{ marginBottom: 0 }}
            />
          </label>
          <label htmlFor="name" className="label">
            <img src={book} alt="" className="image" />
            <input
              type="text"
              name="name"
              placeholder="Nombre de la imagen"
              value={values.name}
              onChange={handleChange}
              style={{ marginBottom: 0 }}
            />
          </label>
          <label htmlFor="descripcion" className="label">
            <img src={dep} alt="" className="image" />
            <input
              type="text"
              name="descripcion"
              placeholder="Descripcion de la imagen"
              value={values.descripcion}
              onChange={handleChange}
              style={{ marginBottom: 0 }}
            />
          </label>
          <div className="centrar or">
            <hr />
            <p>Or</p>
            <hr />
          </div>
          <div className="centrar">
            <div className="input-file">
              <input
                type="file"
                id="file"
                name="file"
                placeholder="Agregar Imagen"
                onChange={updateImage}
              />
              <label for="file" class="input-file-label centrar">
                <img src={docI} alt="" />
                Selecciona una imagen
              </label>
            </div>
            <button className="buttonsutmi">Reset</button>
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

export default UpdateData;
