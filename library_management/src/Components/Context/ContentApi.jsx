import React, { createContext, useState } from 'react';

export const AuthorizationContext = createContext();

export const AuthorizationProvider = ({ children }) => {
  const [admin,setAdmin] = useState(localStorage.getItem("admin")|| null);

  return (
    <AuthorizationContext.Provider value={{admin,setAdmin}}>
      {children}
    </AuthorizationContext.Provider>
  );
};