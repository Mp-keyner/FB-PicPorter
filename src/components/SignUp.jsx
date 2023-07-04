// import { useState } from "react";
// import firebase from "../utils/firebase";

// const SignUp = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await firebase.auth().createUserWithEmailAndPassword(email, password);
//       console.log("Usuario registrado exitosamente");
//       // Aquí puedes redirigir al usuario a una página de inicio de sesión exitosa
//     } catch (error) {
//       console.error("Error al registrar el usuario:", error);
//       // Aquí puedes mostrar un mensaje de error al usuario
//     }
//   };

//   return (
//     <form className="form" onSubmit={handleSubmit}>
//       <label htmlFor="email">Correo Electrónico:</label>
//       <input
//         type="email"
//         id="email"
//         name="email"
//         placeholder="Ingresa tu correo electrónico"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <label htmlFor="password">Contraseña:</label>
//       <input
//         type="password"
//         id="password"
//         name="password"
//         placeholder="Ingresa tu contraseña"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <input type="submit" value="Enviar" />
//     </form>
//   );
// };

// export default SignUp;
