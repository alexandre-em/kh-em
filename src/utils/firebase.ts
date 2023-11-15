import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  collection as collectionRef,
  getDocs,
} from "firebase/firestore";

import firebase_app, { storage } from "../config/firebase";

const db = getFirestore(firebase_app);

/**
 * @param collection {string} path/name of the collection
 * @param id {string} id of the new row
 * @param data {any}
 * @example const { result, error } = await addData('users', 'user-id', data)
 */
export async function addDataToDb(collection: string, data: any) {
  let result = null;
  let error = null;

  try {
    const id = uuidv4();

    result = await setDoc(doc(db, collection, id), data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}

/**
 * @param collection {string} path/name of the collection
 * @param key {string} field name of the query
 * @param value {string} field value of the query
 * @example const { result, error } = await getDocumentByField('users', 'name', 'Alex')
 */
export async function getDocumentByField(
  collection: string,
  key: string,
  value: string
) {
  const docRef = collectionRef(db, collection);

  const q = query(docRef, where(key, "==", value));

  let result = null;
  let error = null;

  try {
    result = await getDocs(q);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

/**
 * @param collection {string} path/name of the collection
 * @param id {string} id of the new row
 * @example const { result, error } = await getDocument('users', 'user-id')
 */
export async function getDocument(collection: string, id: string) {
  const docRef = doc(db, collection, id);

  let result = null;
  let error = null;

  try {
    result = await getDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

/**
 * @param filename {string} path/name of the file with extension
 * @param filebuffer {Buffer} data of the file
 * @example const { result, error } = await uploadFile('user.png', data)
 */
export async function uploadFile(
  filename: string,
  fileBuffer: Blob | ArrayBuffer | Uint8Array
) {
  const fileId = uuidv4();
  const storageRef = ref(storage, `uploads/${fileId}/${filename}`);
  const { metadata } = await uploadBytes(storageRef, fileBuffer);
  const { fullPath } = metadata;
  let error;

  if (!fullPath) {
    error = "There was some error while uploading the file.";
  }

  const result = `https://storage.googleapis.com/${storageRef.bucket}/${storageRef.fullPath}`;
  console.log("uploading result", result);

  return { result, error };
}
