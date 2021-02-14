const { response } = require('express');
const bcryptjs  = require('bcryptjs ');

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/goole-verify');

const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try{
        
        //Verifica si el email existe
        const usuario = await Usuario.findOne({correo});
        if (!usuario){
            return res.status(400).json({
                msg: 'Usuario / Pasword no son correctos - correo'
            });
        }
        // si el usuario está activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Pasword no son correctos - estado falo'

            });
        }
        
        // verifica la contraseña
        const  validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Pasword no son correctos - password'
            });
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        })

    }catch ( error){
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const googleSignin = async(req, res = response) => {
    
    const { id_token } = req.body;

    try{
        const { correo, nombre, img } = await googleVerify(id_token);
        let usuario = await Usuario.findOne({correo});

        if(!usuario){
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            },

            usuario = new Usuario(data);
            await usuario.save();
        }

        // Si el usuario en DB
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        //Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });

    }catch(error){
        res.status(400).json({
            msg: 'Token de google no es valido'
        })
    }
}

module.exports = {
    login,
    googleSignin
}