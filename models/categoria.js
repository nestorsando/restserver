const{Shema, model} = require('mongoose');

const CategoriaShema = Shema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.types.ObjectId,
        ref: 'Usuario',
        required: true

    }
})

CategoriaShema.methods.toJSON = function(){
    const {_v,estado,...data} = this.ObjectId();
    return data;
}
module.exports = model('Categoria',CategoriaShema);