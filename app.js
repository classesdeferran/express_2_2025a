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

app.get('/api/paises', (req, res) => {
    // Salida esperada :
    // [{"pais": "Italia", "total-ventas": 3000},{"pais": "Francia", "total-ventas": 3000}]
    let resultado = []
    let ventasPais = {}

    for (let i = 0; i < jsonData.length; i++) {
        // datos de cada iteración
        let pais = jsonData[i].pais
        let venta = jsonData[i].venta

        // crearemos un objeto cuya clave será el nombre del país
        // y el valor el total de las ventas
        if (!ventasPais[pais]) {
            ventasPais[pais] = 0
        }
        // acumulamos las ventas en cada iteración
        ventasPais[pais] += venta
    }

    console.log(ventasPais);

    // Añadimos los objetos de cada país al array
    for (let pais in ventasPais) {
        resultado.push({
            "pais": pais,
            "total-ventas": ventasPais[pais]
        })
    }
    // salida al navegador
    res.json(resultado)
    
})

// Deben salir las ventas por paises en el año 2022
app.get('api/anyo/2022', (req, res) => {
//
})

app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`);
})

