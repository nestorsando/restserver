const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { login, googleSignin } = require('../controllers/auth');

const router = Router();

router.post('/login',[
    ckeck('correo','EL correo es obligatorio').isEmail(),
    check('passwrod','la contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.post('/google',[
    check('id_token','El id_token es necesario').not().isEmpty(),
    validarCampos
],googleSignin);

module.exports = router;