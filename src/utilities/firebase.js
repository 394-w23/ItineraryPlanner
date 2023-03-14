// Import the functions you need from the SDKs you need
import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update, get } from 'firebase/database';


// Your web app's Firebase configuration
// TODO: put firebase config here

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);


export const useDbData = (path) => {
    const [data, setData] = useState();
    const [error, setError] = useState(null);
  
    useEffect(() => (
      onValue(ref(database, path), (snapshot) => {
       setData( snapshot.val() );
      }, (error) => {
        setError(error);
      })
    ), [ path ]);
  
    return [ data, error ];
  };
  
  const makeResult = (error) => {
    const timestamp = Date.now();
    const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
    return { timestamp, error, message };
  };
  
  export const useDbUpdate = (path) => {
    const [result, setResult] = useState();
    const updateData = useCallback((value) => {
      update(ref(database, path), value)
      .then(() => setResult(makeResult()))
      .catch((error) => setResult(makeResult(error)))
    }, [database, path]);
  
    return [updateData, result];
  };

  export const updateDatabase = (updates) => {
    const db = getDatabase();
    return update(ref(db), updates);
  };

  export const getData = async (path) => {
    const db = getDatabase();
    const snapshot = await get(ref(db, path));
    const data = snapshot.val();
    return data;
  };

  export const writeScheduleData = (params) => {
    const db = getDatabase();
    set(ref(db, "adventure"), {
      // default empty if no value passed
      // params are address, description, image, name, web address
      address: params.address || "",
      description: params.description || "",
      image: params.image || "",
      name: params.name || "",
      webAddress: params.webAddress || "",
    });
  };