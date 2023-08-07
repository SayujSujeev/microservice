const express = require("express");
const Note = require("../models/notes");

const router = express.Router();

// Create a new note
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  const user = req.user.id;
  console.log(user);
  const note = new Note({
    title,
    content,
    user,
  });

  try {
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: "Error creating note", error: err });
  }
});

// Read all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes", error: err });
  }
});

// Read a specific note by ID
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Error fetching note", error: err });
  }
});

// Update a note by ID
router.put("/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Error updating note", error: err });
  }
});

// Delete a note by ID
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting note", error: err });
  }
});

module.exports = router;
