import "./App.css";
import Form from "./components/Form/index";
import Show from "./components/show/Show";
import Layout from "./components/layout/index";
import { useContext, useEffect } from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import Update from "./components/Update";
import Description from "./components/Description";
import Delete from "./components/Delete";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  db,
  collection,
  addDoc,
  updateDoc,
  doc,
  collectionRef,
} from "./firebase";
import { AuthContext } from "./components/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./components/Login";

function App() {
  const { isLoggedIn, logout, user } = useContext(AuthContext); // Utiliza AuthContext en lugar de AuthProvider
  const addOredit = async (date) => {
    console.log("new task added");
    try {
      const docRef = await addDoc(collection(db, collectionRef), date);
      console.log("Document written with ID: ", docRef.id);
      console.log("Este es el objeto que arroja el Firestore", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <div className="container">
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Home"
              element={
                <ProtectedRoute>
                  <Show />
                </ProtectedRoute>
              }
            />
            <Route path="/New" element={<Form addOredit={addOredit} />} />
            <Route path="/Description/:id" element={<Description />} />
            <Route path="/Update/:id" element={<Update />} />
            <Route path="/Delete/:id" element={<Delete />} />
          </Routes>
        </Layout>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
