const { pool } = require("../utils/dbConnection")
const format =require("pg-format")


const getInventario = async ({limit =6 , page=0 , order_by="id_ASC"}) =>{
    console.log("Limit:", limit, "Page:", page , "Order By:", order_by)

    const [campo, orden] = order_by.split("_")
    let offset = page*limit;

    let formattedQuery = format("SELECT * FROM INVENTARIO ORDER BY %s %s LIMIT %s OFFSET %s", campo, orden, limit, offset) 
    const result = await pool.query(formattedQuery)
    return result.rows
}

const getFilteredInventario = async ({precio_min, precio_max, categoria, metal}) =>{
    

    let filtros = []

    if(precio_min){filtros.push(`precio>= ${precio_min}`)}
    if(precio_max){filtros.push(`precio<= ${precio_max}`)}
    if(categoria){filtros.push(`categoria= '${categoria}'`)}
    if(metal){filtros.push(`metal= '${metal}'`)}

    let consulta = "SELECT * FROM INVENTARIO"
    if(filtros.length > 0){
        filtros = filtros.join(" AND ")
        consulta += ` WHERE ${filtros}`
    }
     const result = await pool.query(consulta)
        return result.rows
}

const prepararHATEOAS = async(listaRecursos)=>{
   
     const totalJoyas = listaRecursos.length;

    const stockTotal = listaRecursos.reduce(
        (total, joya) => total + joya.stock,
        0
    );

    const results = listaRecursos.map((j) => { 
        return { nombre: j.nombre, href: `joyas/joya/${j.id}` }
    })

    return {
        totalJoyas,
        stockTotal,
        results
    }


}

module.exports ={getInventario,getFilteredInventario,prepararHATEOAS} 



