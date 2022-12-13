import "../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Header from "../components/header/header";
import { SessionProvider } from "next-auth/react";
import { AppContext } from "../context/AppContext";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
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
    <SessionProvider session={session}>
      <AppContext.Provider 
      value={{ theme, setTheme }}>
        <Header />
        <Component {...pageProps} />
      </AppContext.Provider>
    </SessionProvider>
  );
}

export default MyApp;
