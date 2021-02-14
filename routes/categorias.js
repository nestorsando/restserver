const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria, 
    borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/categorias
 ***/
// Obtener una categoria por id - publico

router.get('/', obtenerCategorias);
router.get('/:id',[
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
],obtenerCategoria);

// Crear categoria - privado - cualquier persona con un token valido 
pouter.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//Actualizar - privado - cualquier con el token valido

router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],actualizarCategoria);

// Borar la categoria Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','NO es un id de Mongo valido'),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
],borrarCategoria);

module.exports = router;