const express = require("express");
const { v1: uuidv1 } = require('uuid');
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));




//API routes://
app.get("/api/notes", (req, res) => {
  let notesContent = JSON.parse(fs.readFileSync("db/db.json"));
  res.json(notesContent);
  console.log(notesContent);

})

app.post("/api/notes", (req, res) => {
  let notesContent = JSON.parse(fs.readFileSync("db/db.json"));
  const noteObj = req.body;
  noteObj.id = uuidv1();
  notesContent.push(noteObj);
  fs.writeFileSync("db/db.json", JSON.stringify(notesContent));

  res.json(notesContent)

})

app.delete("/api/notes/:id", (req, res) => {
  let notesContent = JSON.parse(fs.readFileSync("db/db.json"));
  const cleanedNotes = notesContent.filter(function(noteObj) {
    return noteObj.id !== req.params.id;
  });
 fs.writeFileSync("db/db.json", JSON.stringify(cleanedNotes));

 res.json(cleanedNotes)

})

// HTML routes://

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// If no matching route is found default to home
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});


app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
})
