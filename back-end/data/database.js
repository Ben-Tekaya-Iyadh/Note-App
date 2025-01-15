const sqlite3 = require("sqlite3");
const path = require("path")

const dbPath = path.join("./tmp") + "/notes.db"

const db = new sqlite3.Database(dbPath, (err)=> {
    if(err) {
        console.log("Failed to establish connection to data-base.", err);
    } else {
        console.log("Connection established to data-base.")
    }
});

module.exports = db 