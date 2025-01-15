const fs = require("fs");
const path = require('path');
const db = require("../data/database");
const chalk = require("chalk")
const getDate = require("../util/getDate");
const { error } = require("console");

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'notes.json'
);


module.exports = class Note {
  constructor({ title, description, color, attachement, content, creationDate, lastModified }) {
    this.title = title;
    this.description = description ?? null;
    this.color = color;
    this.content = content ?? ""
    this.attachement = attachement ?? null;
    this.creationDate = creationDate;
    this.lastModified = lastModified;
  }


  createNew(cb) {
    db.run(`
      INSERT INTO notes (
       title, 
       description, 
       color, 
       content, 
       attachement,
       creationDate,
       lastModified
      ) VALUES (?,?,?,?,?,?,?)
    `, [
      this.title,
      this.description,
      this.color,
      this.content,
      JSON.stringify(this.attachement),
      this.creationDate,
      this.lastModified
    ], cb);
  }

  static fetchAll(cb) {
    db.all(` SELECT id, title, description, content, lastModified, color FROM notes `, cb);
  }

  static fetchbyId(id, cb) {
    console.log(id)
    db.get(`
    SELECT * FROM notes WHERE id= ?`, [id], cb);
  }

  static deleteNotes(list, cb) {
    let placeHolders = list.map(() => `?`).join(",")
    db.serialize(() => {
      db.run('BEGIN TRANSACTION');

      db.run(`
        INSERT INTO recentDelete (
              id,
              title,
              description,
              color,
              content,
              attachement,
              creationDate,
              lastModified,
              deleteDate
        )
        SELECT *, ? FROM notes WHERE id IN (${placeHolders})
      `, [getDate() ,...list], (err) => { 
        if (err) {
          console.log(err)
          db.run("ROLLBACK")
          return cb({ message: err, error: true })
        }

        db.run(`DELETE FROM notes WHERE id IN (${placeHolders})`
        , list, (err)=> {
          if(err) {
            db.run("ROLLBACK")
            return cb({message: err, error: true})
          }

          db.run("COMMIT", (err)=> {
            if (err) {
              return cb({message: err, error: true})
            }
            cb({message:"Note(s) deleted.", error: false})
          })
        })
      });

    })

  } 

  static fetchDeleted(cb) {
    db.all(`
      SELECT id, title, description, content, lastModified, color FROM recentDelete
      `, cb)
  }

  static updateById(data, cb) {
    db.run(`
      UPDATE notes
      SET title = ? , description = ?, content= ?, color= ?, attachement = ?, lastModified = ?
      WHERE id = ?;
      `, [
      data.title,
      data.description,
      data.content,
      data.color,
      JSON.stringify(data.attachement),
      data.lastModified,
      data.id
    ], cb)
  }

  static fetchDeletedById(id, cb) {
    db.get(`
      SELECT * FROM recentDelete WHERE id = ?;`, [id], cb)
  }
}
