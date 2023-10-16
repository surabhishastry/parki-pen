import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signOut,
    getAdditionalUserInfo,
  } from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc
} from "firebase/firestore"

import { getUser } from "./UserFunctions"
import { User, userConverter} from "../data/User.js"
import AuthResult from "../context/AuthResult";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: (process.env.REACT_APP_API_KEY),
    authDomain: (process.env.REACT_APP_AUTH_DOMAIN),
    projectId: (process.env.REACT_APP_PROJECT_ID),
    storageBucket: (process.env.REACT_APP_STORAGE_BUCKET),
    messagingSenderId: (process.env.REACT_APP_MESSAGING_SENDER_ID),
    appId: (process.env.REACT_APP_APP_ID),
    measurementId: (process.env.REACT_APP_MEASUREMENT_ID)
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export const db = getFirestore(app);

/**
 * Firebase function to create new user with email and password
 * 
 * @param {String} firstname User's firstname.
 * @param {String} lastname User's lastname. 
 * @param {String} email User's email.
 * @param {String} password Password for new account.
 * @returns {AuthResult} 
 */
export const signUp = async (firstname, lastname, email, password) => {
    try {
      // Create user and retrieve the user authentication credential 
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Create a user document for user
      const newUser = new User(firstname, lastname, email, userCredential.user.uid);
      await setDoc(doc(db, "users", newUser.uid), userConverter.toFirestore(newUser));  

      console.log("User " + newUser.toString() + " signed up!");

      return new AuthResult(true, newUser, null);

    } catch (error) {

      console.error("Sign-up failed.\n" + error.message);
      return new AuthResult(false, null, error.code);

    }
  };

/**
 * Firebase function to SignIn user with email and password
 * 
 * @param {String} email - User account email.
 * @param {String} password - User account password.
 * @returns {AuthResult}
 */
export const signIn = async (email, password) => {
    try {

      // Sign-in user and retrieve the authentication credential 
      const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
      );

      // Retrieve the firebase document for the user
      const userInfo = await getUser(userCredential.user.uid);

      return new AuthResult(true, userInfo, null);

    } catch (error) {
      console.error("Sign-in failed.\n" + error.message);
      return new AuthResult(false, null, error.code);
    }
};

/**
 * Log-in/Sign-up user with Google Auth
 * 
 * @returns  {AuthResult}
 */
export const signInWithGoogle = async () => {

  const provider = new GoogleAuthProvider();

  try {
    // Get Sign-In Result
    const signInResult = await signInWithPopup(auth, provider);
    
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = signInResult.user;

    // The signed-in user info.
    if(getAdditionalUserInfo(signInResult).isNewUser) {
    //  Create a user document for user
      const newUser = new User(user.displayName, "", user.email, user.uid);
      await setDoc(doc(db, "users", newUser.uid), userConverter.toFirestore(newUser));

      console.log("Google Auth: Created document for ", newUser.toString());

      return new AuthResult(true, newUser, null);
    }
    else {
      // Retrieve the firebase document for the user
      const userInfo = await getUser(user.uid);

      console.log("Google Auth: Retrieved document for " + userInfo.toString());

      return new AuthResult(true, userInfo, null);
    }
    

  }
  catch (error) {

    console.error("Google Authentication failed!\n" + error.message);
    return new AuthResult(false, null, error.code);
  }

}


/**
 * Firebase function to log current user out
 * 
 * @returns {AuthResult} 
 */
export const logOut = async() => {
    try {
      await signOut(auth);
      return new AuthResult(true, null, null);

    } catch (error) {

      console.error("Log out failed.\n" + error.message);
      return new AuthResult(false, null, error.code);
    }
  };

/**
 * Send email to user for resetting password
 * 
 * @param {String} email - User email for account reset. 
 * @returns {AuthResult}
 */
export const sendResetEmail = async(email) => {

  try {
    await sendPasswordResetEmail(auth, email);
    return new AuthResult(true, null, null);
  }
  catch (error) {
    console.error("Email reset failed.\n" + error.message);
    return new AuthResult(false, null, error.code);
  }

}

