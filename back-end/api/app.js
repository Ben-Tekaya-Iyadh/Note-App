const express = require("express");
require("dotenv").config();
const cors = require("cors")
const {mongoConnect} = require("../data/database")
const notesRoutes = require("../routes/notes");

const port = process.env.PORT || 3000;

const app = express();


app.use(cors({
  origin: '*',
}));
app.use(express.json());

app.use("/notes", notesRoutes)

module.exports = app

//This code was used in development phase:

// mongoConnect(()=> {
//  app.listen(port, ()=> console.log(`Listening on port ${port}`))
// })


