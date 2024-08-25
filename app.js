require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const db = require("./DB/index");

const movieRoutes = require("./routes/movies/movies");
db();
app.use(express.json());
app.use("/movies", movieRoutes);



app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});