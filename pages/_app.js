import "../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { AppContext } from "../context/AppContext";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    let item = JSON.parse(localStorage.getItem("theme"));
    if (item) {
      setTheme(item);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <AppContext.Provider value={{ theme, setTheme }}>
      <Component  {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
