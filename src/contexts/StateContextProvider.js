import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();
const baseUrl = "https://google-search3.p.rapidapi.com/api/v1";

export const StateContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkTheme, setDarkTheme] = useState(false);

  const getResults = async (url) => {
    setLoading(true);

    const res = await fetch(`${baseUrl}${url}`, {
      method: "GET",
      headers: {
        "x-user-agent": "desktop",
        // "x-proxy-location": "EU",
        "x-rapidapi-host": "google-search3.p.rapidapi.com",
        "x-rapidapi-key": "1ccac1ea25msh0d6a911d7d76bfcp1be168jsne9b18d0032d1",
      },
    });

    const data = await res.json();
    setResults(data);
    setLoading(false);
  };

  return (
    <StateContext.Provider
      value={{
        getResults,
        results,
        searchTerm,
        setSearchTerm,
        loading,
        darkTheme,
        setDarkTheme,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
