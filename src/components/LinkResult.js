import React, { useContext, useEffect, useState } from "react";
import "./linkres.css";
import { URLContext } from "../context/UrlContext";
import { Toaster, toast } from "alert";

export default function LinkResult() {
  const [copied, setCopied] = useState(false);

  const { value } = useContext(URLContext);
  const copyText = (val) => {
    navigator.clipboard.writeText(val);
    setCopied(true);
    toast.success("Copied!!");
  };

  useEffect(() => {
    setTimeout(() => {
      //after 1s set copied to false
      setCopied(false);
    }, 1000);
  }, [copied]);
  return (
    <div className="container-linkres ">
      <Toaster />
      <div className="link-res">
        <label className="title">RESULT</label>
        <p className="title">{value}</p>
        <button
          className={copied ? "btn-copied" : "btn-uncopied"}
          onClick={() => copyText(value)}
        >
          Copy to clipboard
        </button>
      </div>
    </div>
  );
}
