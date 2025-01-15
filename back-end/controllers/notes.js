const { json } = require("body-parser");
const Note = require("../models/notes")
const isValidNote = require("../util/noteValidation")


exports.getAllNotes = (req, res) => {
  res.send("Hello")
  // Note.fetchAll((err, rows) => {
  //   if (err) {
  //     res.status(404).send();
  //   } else {
  //     console.log(rows)
  //     res.json(rows);
  //   }
  // });
}

exports.postNewNote = (req, res) => {
  const noteData = req.body;
  const isValid = isValidNote(noteData);

  if (isValid.valid) {
    const newNote = new Note(req.body);
    newNote.createNew((err) => {
      if (err) {
        console.log(err)
        res.status(400).end()
      }
      res.status(201).send({ message: "Created", error: false })
    })
  } else {
    res.status(400).send({ message: "One or many data fields are invalid.", failure: isValid.failure })
  }

}

exports.getNoteById = (req, res) => {
  const id = req.params.id;
  Note.fetchbyId(id, (err, note) => {
    if (err || !note) {
      res.status(404).send({ message: "Invalid note id", error: true })
    } else {
      res.json({ ...note, attachement: JSON.parse(note.attachement) })
    }
  })
}

exports.deleteNotes = (req, res) => {
  const deleteList = req.body.deleteList
  Note.deleteNotes(deleteList, (result) => {
    res.json(result)
  })
}

exports.updateNote = (req, res) => {
  const id = req.params.id;
  Note.updateById(req.body, (err) => {
    if (err) {
      console.log(chalk.red("Failed to update note"))
      res.status(400).send({ message: "Failed to update note.", error: true })
    } else {
      res.status(202).json({ message: "Note updated.", error: false })
    }
  })
}

exports.getDeletedNotes = (req, res) => {
  console.log("requesting deleted")
  Note.fetchDeleted((err, notes) => {
    if (err) {
      console.log(err)
      res.status(400).send()
    } else {
      res.status(200).json(notes)
    }
  })
}

exports.getDeletedById = (req, res) => {
  const id = req.params.id
  Note.fetchDeletedById(id, (err, note) => {
    if (err) {
      console.log(chalk.red("Failed to fetch note", id), err);
      res.status(404).send({ message: "Not Found", error: true })
    } else {
      res.json({ ...note, attachement: JSON.parse(note.attachement) })
    }
  })
}
