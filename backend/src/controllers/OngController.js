const crypto = require('crypto');   // é um pacote interno do Node JS

// como preciso usar a conexão com o banco de dados
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    }, 

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body
    
        const id = crypto.randomBytes(4).toString('HEX');
        //console.log(data);

        // inserindo o registro, o await aguarda ser finalizado para passar para próxima linha de código
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id });
    }
};