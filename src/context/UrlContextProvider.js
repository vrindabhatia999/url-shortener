import React, { Children, useState } from "react";
import { URLContext } from "./UrlContext";

export default function UrlContextProvider({ children }) {
  //whatever state us want to pass to the component
  const [value, setValue] = useState();
  return (
    <URLContext.Provider value={{ value, setValue }}>
      {children}
    </URLContext.Provider>
  );
}
