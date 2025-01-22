const chalk = require("chalk")
const { getDb } = require("../data/database")
const getDate = require("../util/getDate");
const { ObjectId } = require("mongodb");


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


   async createNew(cb) {
    const db = await getDb();
    const result = db.collection("notes").insertOne(this).then((val) => {
      console.log(val.insertedId)
      cb()
    })

  }

  static async fetchAll(cb) {
    const db = await getDb()
    db.collection('notes').find().toArray()
      .then((res) => {cb(null, res)})
      .catch((err) => {console.log(err) ;cb(err)})
  }

  static async fetchbyId(id, cb) {
    const db = await getDb()
    db.collection('notes').findOne({ _id: new ObjectId(id) })
      .then(res => cb(null, res))
      .catch(err => cb(err))
  }

  static async deleteNotes(list, cb) {
    const idList = list.map(id => {
      return new ObjectId(id)
    });
    const db = await getDb()
    const notesCollection = db.collection("notes");
    const deletedCollection = db.collection("deleted");

    notesCollection.find({ _id: { $in: idList } }).toArray()
      .then((rows) => {
        return deletedCollection.insertMany(rows);
      })
      .then(() => notesCollection.deleteMany({ _id: { $in: idList } }))
      .then(() => cb(null, { message: "Note(s) deleted", error: false }))
      .catch((err) => cb(err))
  }

  static async fetchDeleted(cb) {
    const db = await getDb();
    db.collection("deleted").find().toArray().then((res) => cb(res))
  }

  static async updateById(data, cb) {
    const db = await getDb();
    const objId = new ObjectId(data._id)
    db.collection("notes").replaceOne({ _id: objId }, { ...data, _id: objId })
      .then(() => cb())
      .catch((err) => cb(err))
  }
}
