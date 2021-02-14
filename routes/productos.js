const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearProducto,
        obtenerProductos,
        obtenerProducto,
        actualizarProducto, 
        borrarProducto } = require('../controllers/productos');
const { existeCategoriaPorId, existeProductoPorId} = require('../helpers/db-validators');

const router = Router();
/**
 * {{url}}/api/categorias
 */

 // Obtener todas las categorias - publico

 router.get('/', obtenerProductos);

 //Obtener todas las categorias por ID - publico
 router.get('/:id',[
     check('id','No es un id de mongo válido').isMongoId(),
     check('id').custom(existeProductoPorId),
     validarCampos,
 ],obtenerProducto);

 //Crear categoria - privado cualquier persona con un token valido
 router.post('/',[
     validarJWT,
     check('nombre','El nombre es obligatorio').not().isEmpty(),
     check('categoria','No es un id de Mongo').isMongoId(),
     check('categoria'),custom(existeCategoriaPorId),
     validarCampos
 ],crearProducto);
 //Actualizar - privado - cualquiera con token valido
 router.put('/:id',[
     validarJWT,

     //check('categoria','No es un id de mongo').isMongoId(),
     check('id').custom(existeProductoPorId),
     validarCampos
 ],actualizarProducto);

 //Borrar una categoria - Admin

 router.delete('/:id',[
     validarJWT,
     esAdminRole,
     check('id','No es un id de mongo valido').isMongoId(),
     check('id').custom(existeProductoPorId),
     validarCampos
 ],borrarProducto);

 module.exports = router;

