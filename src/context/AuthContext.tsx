import { getCurrentUser, signIn, signOut } from 'aws-amplify/auth';
import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = () => {
    getCurrentUser()
      .then((currentUser: any) => {
        console.log('User is logged in:', currentUser);
        setUser(currentUser)
      })
      .catch((err: any) => {
        console.log('User is not logged in:', err);
      });
  };

  const signInUser = (username: string, password: string) => {
    signIn({username, password})
      .then((response) => {
        console.log(response)
        updateUser(response)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const signOutUser = () => {
    signOut()
      .then(response => {
        console.log('logged out')
        setUser(null)
      })
      .catch(response => {
        console.log(response)
      })
  }

  return (
    <AuthContext.Provider value={{ user, updateUser, signOutUser, signInUser }}>
      {children}
    </AuthContext.Provider>
  );
};