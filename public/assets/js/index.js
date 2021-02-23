async function getNotes() {
  // GET "/api/notes"
  const savedNotes = await fetch('/api/notes').then(r => r.json());

  // clear the prior listings
  document.querySelector('#savedNotes').innerHTML = '';

  // loop through and display the data in the savedNotes section
  let notesEntry;
  for (let i = 0; i < savedNotes.length; i++) {
    notesEntry = savedNotes[i]
    document.querySelector('#savedNotes').innerHTML += `
    <li class="list-group-item list-group-item-action mb-3">
      <div class="d-flex w-100 justify-content-between">
        <button onClick="readButton(${notesEntry})" class='btn btn-warning btn-sm'>${notesEntry.title}</button>
      </div>
    </li>`
  };
};

getNotes();
function readButton(notesEntry) {
  document.querySelector('#title').innerText = notesEntry.title;
  document.querySelector('#notes').innerText = notesEntry.notes;
};

function postUrl( url, data={} ){
  // post requires header, method + data to be sent
  const postData = { 
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify( data )
  }
  return fetch( url, postData ).then( res=>res.json() )
}

async function submitBtn( event ){
  event.preventDefault()

  const noteData = {
      title: document.querySelector('#title').value.trim(),
      notes: document.querySelector('#notes').value.trim()
  }
  // clear input forms
  document.querySelector('#title').value = ''
  document.querySelector('#notes').value = ''

  const result = await postUrl( '/api/notes', noteData )
  // once reservation result comes back display it
  alert( result.message )
}   