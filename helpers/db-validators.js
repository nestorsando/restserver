const Role = require('../models/role');

const { Usuario, Categoria, Producto } = require('../models');

const esRoleValido = async(rol='')=>{
    
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la BD`);   
    }
}

const emailExiste = async(correo = '') => {
    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo});

    if(existeEmail){
        throw new Error(`EL correo ${correo}, ya está registrado`);
    }
}

const existeUsuarioPorId = async(id) => {
    //verificar si el correo existe

    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`EL id no existe ${id}`);
    }
}

/***
*  Categorias
*/
const existeCategoriaPorId = async(id) => {
    // Verifica si el correo existe
    const existeCategoria = await Categoria.findById{id};

    if(!existeCategoria){
        throw new Error(`El id no existe ${id}`);
    }
}
/**
 * Productos
 **/
const existeProductoPorId = async(id) => {
    //verificar si el correo existe
    const existeProducto = await Producto.findById(id);

    if(!existeProducto){
        throw new Error(`El id no existe ${id}`);

    }

}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);

    if (!incluida){
        throw new Error(`La coleccion ${coleccion} no es permmitida, ${colecciones}`);

    }
    return true;
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}