const notesList = document.querySelector('#notes')

let savedId = ''

const noteUI = note => {

    const div = document.createElement('div')

    div.innerHTML = `
    <div class="card card-body mb-2">
        <div class="d-flex justify-content-between">
            <h1 class="h3 card-title">${note.title}</h1>
            <div>
                <button class="btn btn-outline-secondary delete" data-id="${note.id}">DELETE</button>
                <button class="btn btn-outline-danger update" data-id="${note.id}">UPDATE</button>
            </div>
        </div>
        <p>${note.description}</p>
    </div>
    `;

    const btnDelete = div.querySelector('.delete')
    const btnUpdate = div.querySelector('.update')

    btnDelete.addEventListener('click', () => {
        console.log(btnDelete.dataset.id)
        deleteNote(btnDelete.dataset.id)
    })

    btnUpdate.addEventListener('click', () => {
        console.log(btnUpdate.dataset.id)
        getNote(btnUpdate.dataset.id)
    })

    return div;
}


const renderNotes = notes =>
{   
    notesList.innerHTML = ""  
    notes.forEach(note => {
        notesList.append(noteUI(note))
    })
    console.log(notes)
}

const appendNote = note => {
    notesList.append(noteUI(note))
}
