const { rejects } = require("assert")
const fs = require("fs")
const path = require("path")

const rutaJson = path.join(__dirname, "data.json")

function leer() {
    return new Promise((resolve, reject) => {
        fs.readFile(rutaJson, "utf-8", (error, contenido) => {
            if (error) reject(new Error("Error. No se pudo leer el archivo"))
            resolve(JSON.parse(contenido))
        })
    })
}

function escribir(contenido) {
    return new Promise((resolve, reject) => {
        fs.writeFile(rutaJson, JSON.stringify(contenido, null, "\t"), "utf-8", (error) => {
            if (error) reject(new Error("Error. No se pudo escribir el archivo"))
            resolve(true)
        })
    })
}

async function leerTodos() {
    const todos = await leer()
    return todos
}

async function leerUno(id) {
    if(!id) throw new Error("Error. ID indefinido")
    const todos = await leer()
    const coche = todos.find((item) => item.id === id)
    if (!coche) throw new Error("Error. El ID no existe")
    return coche
}

async function create(marca, color, anio) {
    let todos = await leer()
    let nuevoID = 0
    todos.forEach(item => {
        if (item.id > nuevoID) nuevoID = item.id        
    });
    nuevoID++
    nuevoCoche = {id: nuevoID, marca, color, anio}
    todos.push(nuevoCoche)
    await escribir(todos)
    return nuevoCoche
}

async function update(coche) {
    if (!coche.id || !coche.marca || !coche.color || !coche.anio) throw new Error("Error. ID, marca, color o año indefinido")
    const todos = await leer()
    const index = todos.findIndex((item) => item.id === coche.id)
    if (index === -1) throw new Error("Error. El ID no existe")
    todos[index] = coche
    await escribir(todos)
    return coche
}

async function destroy(id) {
    if (!id) {throw new Error("Error. ID indefinido")}
    let todos = await leer()
    const coche = todos.find((item) => item.id === id)
    const index = todos.findIndex((item) => item.id === id )
    if (!coche) throw new Error("Error. ID no válido")
    todos.splice(index, 1)
    await escribir(todos)
    return coche
}

module.exports = { leerTodos, leerUno, create, destroy, update }

