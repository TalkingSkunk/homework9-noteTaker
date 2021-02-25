let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;


noteTitle = document.querySelector("#title");
noteText = document.querySelector("#notes");
saveNoteBtn = document.querySelector(".save-note");
newNoteBtn = document.querySelector(".new-note");

// Show an element
const show = (elem) => {
    elem.style.display = "inline";
};

// Hide an element
const hide = (elem) => {
    elem.style.display = "none";
};
const handleRenderSaveBtn = () => {
    if (!noteTitle.value.trim() || !noteText.value.trim()) {
        hide(saveNoteBtn);
    } else {
        show(saveNoteBtn);
    }
};
handleRenderSaveBtn();

const handleNewNoteView = () => {
    document.querySelector('#title').value = '';
    document.querySelector('#notes').value = '';
}


async function getNotes() {
    // GET "/api/notes"
    console.log('Welcome to the notes.html')
    const savedNotes = await fetch('/api/notes').then(r => r.json());
    console.log('savedNotes', savedNotes)
    // clear the prior listings
    document.querySelector('#savedNotes').innerHTML = '';

    // loop through and display the data in the savedNotes section
    for (let i = 0; i < savedNotes.length; i++) {
        let notesEntry = savedNotes[i]
        document.querySelector('#savedNotes').innerHTML += `
          <li class="list-group-item list-group-item-action mb-3">
            <div class="d-flex w-100 justify-content-between">
              <button onClick="readButton(event, ${i})" class='btn btn-warning btn-sm'>${notesEntry.title}</button>
            </div>
          </li>`
    };

};
getNotes();

async function readButton(e, i) {
    const savedNotes = await fetch('/api/notes').then(r => r.json());
    console.log(`array secrets`, savedNotes[i]);
    e.preventDefault();
    document.querySelector('#title').value = savedNotes[i].title;
    document.querySelector('#notes').value = savedNotes[i].notes;
};

saveNoteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let newNote = {
        title: document.querySelector('#title').value.trim(),
        notes: document.querySelector('#notes').value.trim()
    }
    fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNote),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data) {
                alert('You have submitted your notes');
                document.querySelector('#title').value = '';
                document.querySelector('#notes').value = '';
                location.reload();
            }
        })
        .catch((error) => {
            console.error('error: ', error)
        })
})

newNoteBtn.addEventListener("click", handleNewNoteView);
noteTitle.addEventListener("keyup", handleRenderSaveBtn);
noteText.addEventListener("keyup", handleRenderSaveBtn);