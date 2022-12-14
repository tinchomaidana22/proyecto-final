//configuraciones
const express = require('express')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT
const routerCarrito = require('./routes/carrito')
const routerProductos = require('./routes/productos')
const routerProductosBuscador = require('./routes/productosBuscador')
const routerUpload = require('./routes/upload')

// <midware>
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
//</midware>

// <routes>
app.use('/api/productos',routerProductos )
app.use('/api/productosBuscador', routerProductosBuscador)
app.use('/api/carrito',routerCarrito )
app.use('/api/upload',routerUpload )
// </routes>


app.get('/', (req,res)=>{
    res.send('todo correcto')
})


app.listen(PORT, err=>{
    if (err) throw new Error(`Todo mal`)


    console.log(`todo bien, puerto ${PORT}`);
})