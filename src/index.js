import express from 'express'
import {Server as webSocketServer} from 'socket.io'
import http from 'http'
import {v4 as uuid} from 'uuid'

let notes = []

const app = express() //configuro server express
const server = http.createServer(app) //creo modulo http - le doy config de app
const io = new webSocketServer(server) // creo servidor websocket - servidor io

app.use(express.static(__dirname + '/public'))

io.on('connection', (socket) => {
    console.log('nueva conexión:', socket.id)

    socket.emit('server:loadnote', notes)

    socket.on('client:newnote', newNote => {
     const note = {...newNote, id: uuid()}
     notes.push(note)
     
     socket.emit('server:newnote', note)
    }) 

    socket.on('client:deletenote', noteId => {
        notes = notes.filter(note => note.id != noteId)
        socket.emit('server:loadnote', notes)
    })

    socket.on('client:getnote', noteId => {
        let selectedNote = notes.find(note => note.id === noteId)
        console.log(selectedNote)
        socket.emit('server:selectednote', selectedNote)
    })

    socket.on('client:updatenote', updatedNote => {
        notes = notes.map(note => {
            if (note.id == updatedNote.id){
                note.title  = updatedNote.title
                note.description = updatedNote.description
                console.log(note)
            }
            return note
        })
        socket.emit('server:loadnote', notes)
    })
}) 

server.listen(3055)
console.log('Server on port', 3055)

//20:17

