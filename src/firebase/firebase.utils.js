import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCg6EvuRnVH0b0caeD_icAcZpilFHSe6aw",
  authDomain: "crwn-db-9f1f4.firebaseapp.com",
  databaseURL: "https://crwn-db-9f1f4.firebaseio.com",
  projectId: "crwn-db-9f1f4",
  storageBucket: "crwn-db-9f1f4.appspot.com",
  messagingSenderId: "679820665697",
  appId: "1:679820665697:web:cf105c43babd21ba3f5b20"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
