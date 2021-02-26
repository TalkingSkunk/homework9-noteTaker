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
    console.log('noteArray2', noteArray)
    res.send(noteArray)
};
app.get('/api/notes', processingFunction); //find the notes list in the path
// Push to JSON data array new input
app.post('/api/notes', function (req, res) {
    console.log('[POSTING TO /api/notes]', req.body);
    const newNote = req.body;
    //{title:,text:,id:}
    newNote.id=uuid()
    console.log(`noteArray (Entry number: ${noteArray.length+1}), adding newNote: `, newNote);
    noteArray.push(newNote);
    // save to a file, as a string like localStorage
    fs.writeFileSync(database, JSON.stringify(noteArray))

    res.send({ message: `Reserved for *${newNote.name}*` })
});

// delete an entry from db.json
app.delete ( 'api/notes/:id', (req,res)=>{
    const noteArrayId = getIndexById( req.params.id, noteArray);
    if (noteArrayId !== -1) {
        noteArray.splice (noteArrayId, 1);
        re.status (204).send();
    } else {
        res.status (404).send();
    }
})

// LISTENER----------------------------
app.listen(PORT, () => {
    console.log('Listening on PORT: ', PORT);
});



let noteList = [{id: "0000-0000-0000-0000", title: 'note1', text: 'note1 text'}];