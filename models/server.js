const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const {dbConnection} = require('../database/config');
const { profileEnd } = require('console');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
            uploads: '/api/uploads',
        }

        //Conectar a base de datos

        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Ruta de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());
        
        //Lecturas y parseo del body
        this.app.use(express.json());

        //Directorio Público
        this.app.use(express.static('public'));

        //Fileupload - carga de archivos
        this.app.use( 'fileUpload'({
            useTempFile: true,
            tempFileDir: '/tmp',
            createParentPath: true
        }));
    }

    routes(){
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.auth, require('../routes/buscar'));
        this.app.use( this.paths.auth, require('../routes/categorias'));
        this.app.use( this.paths.auth, require('../routes/productos'));
        this.app.use( this.paths.auth, require('../routes/usuarios'));
        this.app.use( this.paths.auth, require('../routes/uploads'));
    }

    listen(){
        this.Serverapp.listen( this.port,() => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;