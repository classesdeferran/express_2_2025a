// DEPENDENCIAS
const express = require("express");
const app = express();

// PUERTO DE CONEXIÓN
process.loadEnvFile();
const PORT = process.argv[2] || process.env.PORT || 9999;

// CARGAR LOS DATOS
const jsonData = require("./ventas.json");

app.get("/", (req, res) => {
  // Funciones asociadas a la respuesta:
  // envian datos al navegador (cliente)
  // res.send(string)
  // res.json(json)
  // res.sendFile(ruta de un fichero)
  res.send("<h1>Pruebas con Express</h1>");
});

// http://localhost:8888/api?orden=desc
app.get("/api", (req, res) => {
    console.table(req.query);
    let orden = ""
    if (req.query.length > 0) { orden = req.query.orden.toLocaleLowerCase()}    
    if (orden == "desc") {
        return res.json(jsonData.sort( (a, b) => b.anyo - a.anyo))
    } 
    res.json(jsonData);
});

app.get("/api/paises", (req, res) => {
  // Salida esperada :
  // [{"pais": "Italia", "total-ventas": 3000},{"pais": "Francia", "total-ventas": 3000}]
  let resultado = [];
  let ventasPais = {};

  for (let i = 0; i < jsonData.length; i++) {
    // datos de cada iteración
    let pais = jsonData[i].pais;
    let venta = jsonData[i].venta;

    // crearemos un objeto cuya clave será el nombre del país
    // y el valor el total de las ventas
    if (!ventasPais[pais]) {
      ventasPais[pais] = 0;
    }
    // acumulamos las ventas en cada iteración
    ventasPais[pais] += venta;
  }

  console.log(ventasPais);

  // Añadimos los objetos de cada país al array
  for (let pais in ventasPais) {
    resultado.push({
      pais: pais,
      "total-ventas": ventasPais[pais],
    });
  }
  // salida al navegador
  res.json(resultado);
});

// parámetro de url : /api/paises/italia/2024, /api/paises/francia, /api/paises/andorra
app.get('/api/paises/:nombrePais', (req, res) => {
    // console.log(req.params); 
    let nombrePais = req.params.nombrePais.toLocaleLowerCase()
    let resultado = []

    for (let objeto of jsonData){
        let pais = objeto.pais.toLocaleLowerCase()
        if (pais == nombrePais) {
            resultado.push(objeto)
        }
    }
    // datos alternativos
    let resultadoFilter = jsonData.filter(dato => dato.pais.toLocaleLowerCase() == nombrePais)
    console.log(resultadoFilter);
    // para cuando no haya coincidencia (el país no figura en los datos)
    if (resultadoFilter.length == 0) return res.status(404).json({"mensaje": `No tenemos datos de ${nombrePais}`})
    res.status(200).json(resultadoFilter)
})

// /api/paises/italia/2024
app.get('/api/paises/:nombrePais/:anyo', (req, res) => {
    console.table(req.params);
    let nombrePais = req.params.nombrePais.toLocaleLowerCase()
    let anyo = req.params.anyo
    let resultadoFilter = jsonData.filter(dato => dato.pais.toLocaleLowerCase() == nombrePais && dato.anyo == anyo)
    console.log(resultadoFilter);
    if (resultadoFilter.length == 0) return res.status(404).json({"mensaje": `No tenemos datos de ${nombrePais} en ${anyo}`})
    res.status(200).json(resultadoFilter)
})


// Deben salir las ventas por paises en el año 2022
app.get("/api/anyo/2022", (req, res) => {
  let resultado = [];
  for (let objeto of jsonData) {
    if (objeto["anyo"] == 2022) {
      resultado.push(objeto);
    }
  }
  res.json(resultado)
});

// /api/anyos/2024
app.get('/api/anyos/:anyo', (req, res) => {

})

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`);
});
