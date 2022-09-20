const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

const allNotes = requirer('./db/db.json');

// Set up body parsing, static, and route middleware
app.use(express.urlencoded({ extend:true }));
app.use(express.json());
app.use(express.static('public'));

//GET API
app.get('/api/notes',(req, res) => {
  res.json(allNotes.slice(1));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

function createNewNote (body, notesArray) {
  const newNote = body;
  if (!Array.isArray(notesArray))
  notesArray = [];

  if (notesArray.length === 0)
  notesArray.push(0);

  body.id = notesArray[0];
  notesArray[0]++;

  notesArray.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(noteArray, null, 2)
  );
  return newNote;
}

//POST api
app.post('api/notes', (req,res) => {
  const newNote = createNewNote(req.body, allNotes);
  res.json(newNote);
});

function deleteNote(id, notesArray) {
  for(let i = 0; i < notesArray.length; i++) {
    let note = notesArray[i];

    if (note.id == id) {
      notesArray.splice(i, 1);
      fs.writeFileSync(
        path.join(__dirname,'./db/db.json'),
        JSON.stringify(notesArray, null, 2)
      );

      break;
    }
  }
}

//DELETE api
app.delete('/api/notes/:id',(req, res) => {
  deleteNote(req.params.id, allNotes);
  res.json(true);
});

//set up listener
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}.`)
});