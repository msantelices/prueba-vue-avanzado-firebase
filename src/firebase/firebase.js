import { initializeApp } from "firebase/app";
import firebaseConfig from "./config.js";
import { getFirestore, collection, addDoc, query, getDocs,  } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

initializeApp(firebaseConfig);

const db = getFirestore();

const col = "courses";
// Agregar datos

const addData = async(data, callback) => {
  try {
    const docRef = await addDoc(collection(db, col), data);
    console.log("Document written with ID: ", docRef.id);
    callback();
  } catch (e) {
    console.error("Error adding document: ", e);
    alert("Error adding document");
  }
};

// listar datos 
const listarDatos = async (callback) => {
  const q = query(collection(db, col));
  try {
    const querySnapshot = await getDocs(q);
    let data = []
    querySnapshot.forEach((doc) => {
      data.push(
        {
          id: doc.id,
          data: doc.data()
        })
      // console.log(doc.id, " => ", doc.data()); // Doc data extrae la info alamacenada en el documento
    });
    callback(data);
    console.log(data);
  } catch (e) {
    console.log("Error", e);
  }
};

const auth = getAuth();

// Registrar usuario
const registrarUsuario = (email, password, callback) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);

      callback();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);

      callback(errorCode);
    });
};

// Login
const login = (email, password, callback, saveEmail) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      saveEmail(user.email);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);

      callback(errorCode);
    });
};

// Logout
const logout = () => {
  signOut(auth)
    .then((user) => {
      console.log(user);
      alert("Te has deslogeado correctamente");
    })
    .catch((error) => {
      console.log(error);
    });
};

// Observador

const observador = (to, next) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (to.path === "/" || to.path === "/register") {
        next("/home" || "/admin");
      } else {
        next();
      }
    } else  {
      if (to.path !== "/" && to.path !== "/register") {
        next("/");
      } else {
        next(); 
      }
    }
  });
};

export { registrarUsuario, login, logout, observador, addData, listarDatos };
