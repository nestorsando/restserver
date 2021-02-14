// require('dotenv').config();

// const express = require( ' express ' )
// const app = express()
 
// app.get( '/', function(req, res) {
//     res.enviar( ' Hola mundo ' )
// })
 
// app.listen(process.env.PORT,()=>{
//     console.log('Servidor corriendo',process.env.PORT);
// });

exigir('dotenv').config();
const Server = require('./models/server');

const server = new servidor();

servidor. listen();