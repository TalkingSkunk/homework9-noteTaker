// DEPENDENCIES----------------------------
const express = require('express');
const app = express(); // tell node we're creating express server
const fs = require('fs'); //file sharing
const path = require('path');

const PORT = process.env.PORT || 3000; // scan initial port
const database = './data/db.json'; // wire up the saved data

// handle data parsing for POST request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// DATA----------------------------
let noteArray = fs.existsSync(database) ?
    JSON.parse(fs.readFileSync(database)) : [] // parse the existing JSON; if not, create an array
    console.log('noteArray1', noteArray);

// API ROUTES----------------------------
function processingFunction(req, res) {
    console.log('noteArray2', noteArray)
    res.send(noteArray)
};
app.get('/api/notes', processingFunction); //find the notes list in the path
// Push to JSON data array new input
app.post('/api/notes', function (req, res) {
    console.log('[POSTING TO /api/notes]', req.body);
    const newNote = req.body;
    console.log(`noteArray (Entry number: ${noteArray.length+1}), adding newNote: `, newNote);
    noteArray.push(newNote);
    // save to a file, as a string like localStorage
    fs.writeFileSync(database, JSON.stringify(noteArray))

    res.send({ message: `Reserved for *${newNote.name}*` })
});

// HTML ROUTES----------------------------
app.get('/notes/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
// if no matching route is found, then default to index.html
app.get(['/index', '*'], (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// LISTENER----------------------------
app.listen(PORT, () => {
    console.log('Listening on PORT: ', PORT);
});
