import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";

const port = 4000;
const domain = `http://localhost:${port}`;
const app = express();

app.use(cors());
app.use(express.json());

const keySize = 100;
const shortURLs = {}; // short URL => long URL
const keySet = new Set();
while (keySet.size < keySize) {
  keySet.add(nanoid(5));
}
const keys = Array.from(keySet);

app.post("/shorten-url", (req, res) => {
  const { longUrl } = req.body || {};
  if (!longUrl) return res.status(400).send("longUrl is necessary");
  if (!/^http(s){0,1}:\/\//.test(longUrl))
    return res
      .status(400)
      .send("Long URL should start with 'http://' or 'https://'");

  const key = keys.pop();
  if (!key) return res.status(500).send("The unique key ran out");
  shortURLs[key] = longUrl;
  const shortUrl = `${domain}/${key}`;
  res.status(200).send({ shortUrl });
});

app.get("/:id", (req, res) => {
  const longUrl = shortURLs[req.params.id];
  if (!longUrl) return res.status(404).send("The short URL is wrong");
  res.redirect(longUrl);
});

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send(err.message);
};
app.use(errorHandler);

app.listen(port, () => console.log(`Short URL app listening on port ${port}`));
