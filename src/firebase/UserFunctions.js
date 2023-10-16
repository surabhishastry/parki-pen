import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes
  } from "firebase/storage"
  

import {
    doc,
    setDoc,
    getDoc
} from "firebase/firestore"

// eslint-disable-next-line
import { User, userConverter} from "../data/User.js" //User is included for doc
import { db } from "./AuthFunctions.js"

// Initialize Firebase
const storage = getStorage();

/**
 * Retrieves a user's corresponding Firebase document.
 * 
 * @param {String} uid - Firebase UID for the current user.
 * @returns User object attached to uid, if success or null, if an error occurs.
 */
export const getUser = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);

    // Store user if one exists
    if(docSnap.exists()) {
      let user = userConverter.fromFirestore(docSnap);
      console.log("Retrieved user doc for user " + user.toString());
      return user;
    }
    else {
      throw Error("User does not exist!");
    }

  } catch(error) {
    console.error("Failed to retrieve user from firestore.\n" + error.message);
    return null;
  }
}

/**
 * Update a User's Firebase document.
 * 
 * @param {User} user - User's updated Firebase document. 
 * @returns true, if update is a success. false, if error occurred updating user document.
 */
export const updateUser = async (user) => {

  try {
    // Set new doc
    await setDoc(doc(db, "users", user.uid), userConverter.toFirestore(user));
    console.log("Updated firebase document for " + user.toString());

    return true;

  } catch (error) {

    console.error("Failed to update user document for " + user.toString() + "/n" + error.message);
    return false;
  }

} 

/**
 * Stores a handwriting sketch made by a user in Firebase storage.
 * 
 * @param {Blob} blob - Canvas sketch 
 * @param {String} uid - User's Firebase UID
 * @param {Number} day - Trial day when sketch was drawing by user.
 * @returns true, if sketch is successfully uploaded. false, if error occured uploading sketch.
 */
export const uploadSketch = async (blob, uid, day) => {

  try {
    let storageRef = ref(storage, "images/" + uid + "/day" +  day + ".jpg");
    await uploadBytes(storageRef, blob);
    
    console.log("Uploaded blob!");

    return true;
  }
  catch (error) {
    console.error(error.message);
    return false;
  }

}

/**
 * Retrieve a user's sketch from a specific trial day
 * 
 * @param {String} uid - User's Firebase UID
 * @param {Number} day - Trial day when sketch was drawing by user.
 * @returns Download URL for sketch, on success. Null, on failure of retrieval.
 */
export const retrieveSketch = async (uid, day) => {

  try {
    const sketchRef = ref(storage, "images/" + uid + "/day" + day + ".jpg");
    const sketchUrl = await getDownloadURL(sketchRef)

    return sketchUrl;
  }
  catch(error) {
    switch (error.code) {
      case 'storage/object-not-found':
        console.error("Requested file does not exist!");
        break;
      case 'storage/unauthorized':
        console.error("User does not have authorization to access this file.");
        break;
      case 'storage/canceled':
        console.error("Download cancelled.");
        break;
      case 'storage/unknown':
        console.error(error.message)
        break;
      default:
        console.error(error.message)
        break;
    }

    return null;
  }

}