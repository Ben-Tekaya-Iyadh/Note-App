const Note = require("../models/notes")
const isValidNote = require("../util/noteValidation");
const chalk = require("chalk");


exports.getAllNotes = (req, res) => {
  console.log(chalk.green("all notes"))
  Note.fetchAll((err, rows) => {
    if (err) {
      res.status(404).json({ message: "Error fetching notes!", error: true })
    } else {
      res.status(200).json(rows);
    }
  }
  );
}

exports.postNewNote = (req, res) => {
  const noteData = req.body;
  const isValid = isValidNote(noteData);

  if (isValid.valid) {
    const newNote = new Note(req.body);
    newNote.createNew((err) => {
      if (err) {
        res.status(403).send({ message: "Failed to created new note!", error: true })
      } else {
        res.status(201).send({ message: "Created", error: false })
      }
    })
  } else {
    res.status(400).send({ message: "One or many data fields are invalid.", failure: isValid.failure })
  }

}

exports.getNoteById = (req, res) => {
  const id = req.params.id;
  Note.fetchbyId(id, (err, note) => {
    if (err) {
      return res.status(404).send({ message: "Failed to load note!", error: true })
    }

    if (!note) {
      return res.status(404).send({ message: "Invalid id", error: true })
    }
    res.json(note)

  })
}

exports.deleteNotes = (req, res) => {
  const deleteList = req.body.deleteList
  Note.deleteNotes(deleteList, (err, result) => {
    if (err) {
      return res.status(400).json({ message: "Failed to delete Note(s)" })
    }
    res.status(200).json(result)
  })
}

exports.updateNote = (req, res) => {
  const id = req.params.id;
  Note.updateById(req.body, (err) => {
    if (err) {
      console.log(chalk.red("Failed to update note"))
      res.status(400).send({ message: "Failed to update note.", error: true })
    } else {
      res.status(200).json({ message: "Note updated.", error: false })
    }
  })
}

exports.getDeletedNotes = (req, res) => {
  Note.fetchDeleted((notes) => {
    res.status(200).json(notes)
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