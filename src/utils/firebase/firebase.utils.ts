import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  signOut,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
  NextOrObserver
} from "firebase/auth";
import { Categories } from "../../store/categories/categories.types";

const firebaseConfig = {
  apiKey: "AIzaSyAzxO19MDVznq36jH3meH8YpLsQJBhHjWQ",
  authDomain: "cloth-shop-81dd8.firebaseapp.com",
  projectId: "cloth-shop-81dd8",
  storageBucket: "cloth-shop-81dd8.appspot.com",
  messagingSenderId: "180703950234",
  appId: "1:180703950234:web:ee930770419ef770a83623",
};

const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

const db = getFirestore();

export type ObjectsToAdd = {
  title: string;
};

export const addCollectionAndDocument = async <T extends ObjectsToAdd>(
  collectionKey: string,
  objects: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objects.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocument = async (): Promise<Categories[]> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapShot = await getDocs(q);

  const categoryMap = querySnapShot.docs.map((snapShot) => snapShot.data() as Categories);

  return categoryMap;
};

// eslint-disable-next-line no-unused-vars



export type AdditionalInfo = {
  displayName?: string;
}

export type UserData = {
  createdAt: Date;
  email: string;
  displayName: string;

}

export const createUserDocFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInfo
): Promise<QueryDocumentSnapshot<UserData> | void> => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      console.log(" Creating user ", { additionalInformation });
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error);
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
  return onAuthStateChanged(auth, callback);
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};
