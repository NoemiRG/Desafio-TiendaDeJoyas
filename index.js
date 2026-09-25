const express = require('express')
const cors = require('cors')
const { checkConnection } = require('./utils/dbConnection')
const { getInventario,getFilteredInventario,prepararHATEOAS} = require('./controllers/inventario.controller')
const app = express()
const fs = require("fs")
 
app.use(cors())
app.use(express.json())

app.listen(3000, async () => {
    console.log('Servidor 3000')
    const hora = await checkConnection()
    console.log('Hora de la base de datos:', hora)
});



app.get("/joyas",consoleRoute, async (req, res) => {
    const params = req.query
    try {
        const result = await getInventario(params)
        const HATEOAS = await prepararHATEOAS(result, params.limit, params.page)
        
        res.json(HATEOAS);
    } catch (error) {
        res.send("Error obteniendo inventario: " + error.message)
    }
})

app.get("/joyas/filter",consoleRoute, async(req,res)=>{
  const params = req.query
  const result = await getFilteredInventario(params)
  res.json(result)
})

function consoleRoute (req, res, next){
  const route = req.route.path
  let archivoPrevio = fs.readFileSync("routes.log", "utf-8")
  let nuevoArchivo = archivoPrevio += ` RUTA CONSULTADA A LAS ${Date.now()} - ${route}`
  fs.writeFileSync("routes.log", nuevoArchivo)
  next()
}


