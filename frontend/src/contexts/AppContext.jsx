import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      // Includes credentials like cookies, auth headers, etc.
      axios.defaults.withCredentials = true;

      await axios
        .get(apiUrl + "/auth/user")
        .then((response) => {
          setIsLoggedIn(true);
          setUserData(response.data);
        })
        .catch(() => {
          setIsLoggedIn(false);
          setUserData(null);
        });
    };

    fetchUserData();
  }, []);

  const value = {
    apiUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
