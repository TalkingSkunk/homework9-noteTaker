// DEPENDENCIES----------------------------
const express = require('express');
const app = express(); // tell node we're creating express server
const fs = require('fs'); //file sharing
const path = require('path');
const uuid=require('node-uuid')

const PORT = process.env.PORT || 3000; // scan initial port
const database = './data/db.json'; // wire up the saved data

// will share any static html files with the browser
app.use(express.static('public'));

// handle data parsing for POST request
// accept incoming POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// DATA----------------------------
let noteArray = fs.existsSync(database) ?
    JSON.parse(fs.readFileSync(database)) : [] // parse the existing JSON; if not, create an array
    console.log('noteArray1', noteArray);

// API ROUTES----------------------------
function processingFunction(req, res) {
    res.send(noteArray)
};
app.get('/api/notes', processingFunction); //find the notes list in the path
// Push to JSON data array new input
app.post('/api/notes', function (req, res) {
    console.log('[POSTING TO /api/notes]', req.body);
    const newNote = req.body;
    newNote.id=uuid()
    console.log(`noteArray (Entry number: ${noteArray.length+1}), adding newNote: `, newNote);
    noteArray.push(newNote);
    // save to a file, as a string like localStorage
    fs.writeFileSync(database, JSON.stringify(noteArray))

    res.send({ message: `Saved.` })
});

// delete an entry from db.json
app.delete('/api/notes/:id', function(req, res){
    let noteId = req.params.id; // pinpoint the id of the array item
    console.log('Note to be deleted by title: ', noteId)
    noteArray = noteArray.filter( value => {return value.id !== noteId}) // filter and return only the untargeted notes
    fs.writeFileSync( database, JSON.stringify(noteArray) ) //rewrite the .json
    res.send( { message: `Successfully deleted `} )
})

// LISTENER----------------------------
app.listen(PORT, () => {
    console.log('Listening on PORT: ', PORT);
});