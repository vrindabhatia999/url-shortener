import logo from "./logo.svg";
import "./App.css";
import InputShortener from "./components/InputShortener";
import BackgroundAnimate from "./components/BackgroundAnimate";
import LinkResult from "./components/LinkResult";
import { useContext } from "react";
import { URLContext } from "./context/UrlContext";
import UrlContextProvider from "./context/UrlContextProvider";

function App() {
  return (
    <UrlContextProvider>
      <BackgroundAnimate />
      <InputShortener />

      <LinkResult />
    </UrlContextProvider>
  );
}

export default App;
