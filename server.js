const PORT = process.env.PORT || 3002;
const fs = require('fs');
const path = require('path');
const { json } = require('express')

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function Note (title, text) {
  this.title = title
  this.text = text
}

// connected to notes html once button is clicked user redirected
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')))

app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')))

app.get('api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    data  = JSON.parse(data);
    res.json(data)
  })

  
}) 

app.post('/api/notes', (req, res) => {
  const newNote = req.body;

  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err; 
  })

  const noteContent = JSON.stringify(newNote)

  fs.writeFile('./db/db.json', noteContent, (err) => {
    err ? console.error(err) : console.log('success')
  })
});

app.listen(PORT, () => {
  console.log(`App listening ${PORT}`);
})