const express = require("express");
const connectDB = require("./config/db");
const port = 5000;
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

//connext to db
connectDB();

//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/post", require("./routes/post.routes"));
app.use("/game", require("./routes/game.routes"));
//start server
app.listen(port, () => console.log(`Server starting on port ${port}`));
