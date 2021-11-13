const PORT = process.env.PORT || 3002;
const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

const notesTaken = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  res.json(notesTaken.slice(1));
}); 
// connected to notes html once button is clicked user redirected
app.get('/notes', (req, res) => { res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('*', (req, res) => {res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

function makeNewNote(body, notesArray) {
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
    JSON.stringify(notesArray, null, 2)
  );
  return newNote;
}

// controls the data that is saved on body and returns new note to add to list
app.post('/api/notes', (req, res) => {
  const newNote = makeNewNote(req.body, notesTaken);
  res.json(newNote);
});  

app.listen(PORT, () => {
  console.log(`App listening ${PORT}`);
})