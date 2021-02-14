const path = require('path');
const {v4: uuidv4} = require('uuid');

const subirArchivo = (files, extensionesValidas = ['png','jpg','jpeg','gif'], carpeta = '') => {
    
    return new Promise ((resolve, reject) => {
        
        const {archivo} = files;
        const extension = nombreCortado[nombreCortado.leght -1];

        //Validar la extension

        if(!extensionesValidas.includes(extension)){
            return reject(`La extension ${extension} no es pemritida - ${extensionesValidas}`);

        }

        const nombreTemp = uuidv4() +'.'+ extension;
        const uploadPath = path.join(__dirname, '../uploads/',carpeta,nombretemp);

        archivo.mv(uploadPath,(err) => {
            if(err){
                reject(err);
            }

            resolve ( nombreTemp);
        })

    })
}

module.exports = {
    subirArchivo
}