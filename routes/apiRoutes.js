// Setting up dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
let db = require("../db/db.json");

// GET API notes
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../db/db.json"));
});

// POST API notes
router.post("/notes", (req, res) => {
  const { body } = req;
  const uniqueId = db.length.toString();
  const newNote = { ...body, id: uniqueId };
  db.push(newNote);

  fs.writeFile(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(db),
    (err) => {
      if (err) throw err;
      res.json(db);
    }
  );
});

// DELETE API notes
router.delete("/notes/:id", (req, res) => {
  const { id } = req.params;

  const deleteIndex = db.findIndex((note) => note.id === id);

  if (deleteIndex !== -1) {
    db.splice(deleteIndex, 1);
    fs.writeFile(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(db),
      (err) => {
        if (err) throw err;
        res.sendStatus(204);
      }
    );
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
