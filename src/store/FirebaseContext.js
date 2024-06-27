import React, { createContext } from 'react';
import { auth, db, storage } from '../firebase/config'; // Import all necessary services

export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ auth, db, storage }}>
      {children}
    </FirebaseContext.Provider>
  );
};
