import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authButton, setAuthButton] = useState(false);
  const [watchlistMoviesCount, setWatchlistMoviesCount] = useState([]);

  useEffect(()=>{
    if(localStorage.getItem("token")){
        setAuthButton(true);
    }
  },[]);

  return (
    <>
      <AuthContext.Provider
        value={{
          authButton: authButton,
          setAuthButton: setAuthButton,
          watchlistMoviesCount: watchlistMoviesCount,
          setWatchlistMoviesCount: setWatchlistMoviesCount,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
