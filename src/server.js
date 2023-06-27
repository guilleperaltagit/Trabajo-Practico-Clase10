const express = require("express")
const path = require("path")

require("dotenv").config()

const { leerTodos, leerUno, create, destroy, update } = require("./database/data.manager.js")

const server = express()

server.use(express.json())
server.use(express.urlencoded({extended: true}))

// Bienvenida
server.get("/", (req, res) => {
    res.status(200).send("<h1>Bienvenido a la web de COCHES<h1>")
})

//Obtener el listado de todos los coches
server.get("/coches", (req, res) => {
    leerTodos()
        .then((todos) => res.status(200).send(todos))
        .catch((error) => res.status(500).send(error.message))
})

//Obtener un coche específico por ID
server.get("/coches/:id", (req, res) => {
    const {id} = req.params
    leerUno(Number(id))
        .then((coche) => res.status(200).send(coche))
        .catch((error) => res.status(400).send(error.message))
})

//Crear un nuevo coche
server.post("/coches", (req, res) => {
    const { marca, color } = req.body
    create(marca, color)
        .then((coche) => res.status(201).send(coche))
        .catch((error) => res.status(400).send(error.message))
})

//Actualizar un coche específico por ID
server.put("/coches", (req, res) => {
    const { id, marca, color } = req.body
    update({id: Number(id), marca, color})
        .then((coche) => res.status(200).send(coche))
        .catch((error) => res.status(400).send(error.message))    
})

//Eliminar un coche específico por ID
server.delete("/coches", (req, res) => {
    const { id } = req.body
    destroy(Number(id))
        .then((coche) => res.status(200).send(coche))
        .catch((error) => res.status(400).send(error.message))
})

server.listen(process.env.SERVER_PORT, process.env.SERVER_URL, console.log(`EscuchandoServer escuchando en http://${process.env.SERVER_URL}:${process.env.SERVER_PORT}`))
