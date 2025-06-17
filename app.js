// DEPENDENCIAS
const express = require('express')
const app = express()

// PUERTO DE CONEXIÓN
process.loadEnvFile()
const PORT = process.argv[2] || process.env.PORT || 9999

// CARGAR LOS DATOS
const jsonData = require('./ventas.json')

app.get("/", (req, res) => {
    // Funciones asociadas a la respuesta:
    // envian datos al navegador (cliente)
    // res.send(string)
    // res.json(json)
    // res.sendFile(ruta de un fichero)
    res.send("<h1>Pruebas con Express</h1>")
})

app.get('/api', (req, res) => {
    res.json(jsonData)
})

app.get('/api/total-paises', (req, res) => {
    // Salida esperada :
    // [{"pais": "Italia", "total-ventas": 3000},{"pais": "Francia", "total-ventas": 3000}]




})

app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`);
})

