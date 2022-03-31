const socket = io()

const saveNote = (title, description) => {

    socket.emit('client:newnote', {
        title, description
    })
}

const deleteNote = id => {
    socket.emit('client:deletenote', id)
}

const getNote = id => {
    socket.emit('client:getnote', id)
}

const updateNote = (id, title, description) => {
    let button = document.querySelector('#buttonBox')
    button.textContent = 'Add'
    socket.emit('client:updatenote', {
        id,
        title,
        description
    })
}

socket.on('server:newnote', appendNote)

socket.on('server:loadnote', renderNotes)

socket.on('server:selectednote', note => {
    let title = document.querySelector('#title')
    let description = document.querySelector('#description')
    let button = document.querySelector('#buttonBox')

    console.log(title)
    console.log(description)
    console.log(button.textContent)

    title.value = note.title
    description.value = note.description
    button.textContent = 'Update'
    savedId = note.id


})