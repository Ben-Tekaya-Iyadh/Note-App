const express = require("express");
const notesController = require("../controllers/notes");

const router = express.Router();

router.get("/", notesController.getAllNotes); //get all notes

router.get("/deleted", notesController.getDeletedNotes) //get deleted notes

router.get("/deleted/:id", notesController.getDeletedById)

router.get("/:id", notesController.getNoteById); //get one note

router.post("/new", notesController.postNewNote); //create a new note

router.delete("/", notesController.deleteNotes); //delete one or multiple notes

router.put("/", notesController.updateNote) //update one note


module.exports = router