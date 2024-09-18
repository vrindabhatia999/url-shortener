import React, { useContext, useState } from "react";
import "./inputshortener.css";
import { URLContext } from "../context/UrlContext";
import Url from "../assets/url.svg";
import { Toaster, toast } from "alert";

export default function InputShortener() {
  const { setValue } = useContext(URLContext);

  const [loading, setLoading] = useState(false);
  const [urlVal, setUrlVal] = useState("");
  const handleInput = (e) => {
    setUrlVal(e.target.value);
  };

  const handleShorten = async () => {
    //call the api
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/shorten-url", {
        method: "POST",
        body: JSON.stringify({ longUrl: urlVal }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      // Handle specific status codes
      if (res.status === 400) {
        // Assuming the API sends a useful error message in the response
        const errorData = await res.json();
        console.log(errorData);
      }
      let url = await res.json();

      setValue(url.shortUrl);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message || "An error occurred", {
        style: {
          border: "1px solid #ff4d4d",
          padding: "16px",
          color: "#ff4d4d",
          background: "#fff5f5",
        },
      });
      setValue("");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <Toaster />
      <div className="input-div">
        <div className="title">
          <label style={{ fontSize: "24px" }}>URL SHORTENER</label>
          <img src={Url} alt="url" width={300} height={150} />
        </div>
        <line className="line" />
        <div className="link-div">
          <label className="link-text">Enter Link</label>
          <input
            type="text"
            className="link-input"
            placeholder="Paste Url to Shorten"
            onChange={(e) => handleInput(e)}
          />
        </div>
        <button className="submit-btn" onClick={handleShorten}>
          Shorten
        </button>
      </div>
    </div>
  );
}
