import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();
// const baseUrl = "https://google-search3.p.rapidapi.com/api/v1";

export const StateContextProvider = ({ children }) => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkTheme, setDarkTheme] = useState(false);

  const getResults = async (url) => {
    const base = "http://localhost:5000";
    const path = window.location.pathname;
    setLoading(true);
    const details = {
      searchTerm: searchTerm,
      path: window.location.pathname.replace("/", ""),
    };
    console.log(`${base}${path}`);

    const data = {
      method: "post",
      url: `${base}${path}`,
      data: details,
    };

    axios(data).then((response) => {
      const result = response.data;
      // let val = [];
      // // result.map((data) => {
      // //   val.push(data);
      // });
      setResults(result);
      console.log(results);
    });
    // axios.post(`${base}${path}`, details).then((response) => {
    //   console.log(response.data);
    //   setResults(response.data);
    //   console.log(results);
    // });

    // const res = await fetch(`${baseUrl}${url}`, {
    //   method: "GET",
    //   headers: {
    //     "x-user-agent": "desktop",
    //     // "x-proxy-location": "EU",
    //     "x-rapidapi-host": "google-search3.p.rapidapi.com",
    //     "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
    //   },
    // });
    // const data = await res.json();
    // setResults(data);
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
