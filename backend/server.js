const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { requireAuth } = require("./middleware/auth.middelware");
const { errorHandler } = require("./middleware/error.middleware");
require("dotenv").config();
const port = 5000;
const app = express();

// connext to db
connectDB();
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// app.use(cors());
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true, // Pour permettre l'envoi des cookies
};
app.use(cors(corsOptions));

//middleware
app.use("/api", requireAuth);

app.use("/api/post", require("./routes/post.routes"));
app.use("/api/games", require("./routes/games.routes"));
app.use("/api/users", require("./routes/users.routes"));
app.use("/auth", require("./routes/auth.routes"));

//error middleware
app.use(errorHandler);

//start server
app.listen(port, () => console.log(`Server starting on port ${port}`));
