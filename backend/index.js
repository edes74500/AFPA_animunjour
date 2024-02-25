const express = require("express");
const connectDB = require("./config/db");
const port = 5000;
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({ origin: "https://animunjour.netlify.app" }));

//connext to db
connectDB();

//middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", "true"); // Ajoutez cet en-tête
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/post", require("./routes/post.routes"));
app.use("/games", require("./routes/games.routes"));
//start server
app.listen(port, () => console.log(`Server starting on port ${port}`));
