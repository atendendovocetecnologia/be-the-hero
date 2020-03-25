const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();

        //console.log(count); // enviar isto pelo cabeçalho da requisição

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset( (page-1) * 5)
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]);

        response.header('X-Total-Count', count['count(*)'])    

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;
        
        //const result = await connection('incidents').insert({
        const [id] = await connection('incidents').insert({    
            title,
            description,
            value,
            ong_id,
        });

        //const id = result[0];
        return response.json({ id });
    },

    async delete(request, response) {
        // pego o id do caso
        const { id } = request.params;

        // pego o id da ong para evitar que uma outra ong apague casos que não pertencem a ela
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();     // traz apenas 1 resultado
 
        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.' })     // Não autorizado -- estudar http status code
        }    

        await connection('incidents').where('id', id).delete();
        return response.status(204).send();

    }
}