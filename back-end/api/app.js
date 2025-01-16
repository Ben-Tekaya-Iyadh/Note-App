const express = require("express");
const db = require("../data/database");
const cors = require("cors")
const notesRoutes = require("../routes/notes");

const port = process.env.PORT || 3000;


const app = express();

db.exec(`    
            CREATE TABLE IF NOT EXISTS notes (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              title TEXT NOT NULL,
              description TEXT,
              color TEXT NOT NULL,
              content TEXT,
              attachement TEXT,
              creationDate TEXT NOT NULL,
              lastModified TEXT NOT NULL
              );

            CREATE TABLE IF NOT EXISTS recentDelete (
              id INTEGER,
              title TEXT NOT NULL,
              description TEXT,
              color TEXT NOT NULL,
              content TEXT,
              attachement TEXT,
              creationDate TEXT NOT NULL,
              lastModified TEXT NOT NULL,
              deleteDate TEXT NOT NULL
            );
` , (err) => { err && console.log("error :", err) });


app.use(cors({
  origin: '*', // specify the front-end origin to all origins
}));
app.use(express.json());

app.use("/notes", notesRoutes)

app.listen(port, () => {
  console.log("Server running on port 3000")
})

module.exports = app;


