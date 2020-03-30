const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

/**
 * Rota / Recurso
 */

/**
 * Métodos HTTP  
 * GET: Buscar/listar uma informação do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */ 

 /**
  * Tipos de arâmetros
  * Query Params: parâmetros nomeados enviados na rota, após o símbolo de interrogação (filtros,paginação). Ex: /users?name=Marcio&idade=46
  * Route Params: Parâmetros utilizados para identificar recursos. Ex: /users/:id ou /users/1
  * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
  */

  /**
   * SQL: MySQL, SQLite, PostgreSQL, Oracle, SQL Server - mantem a estrutura para os dados - Focamos no SQLite, em seguida o MongoDB
   * NoSQL: MongoDB, CouchDB etc - Neste cada um tem a sua própria linguagem de comunicação
   */

  
  //routes.post('/ongs', async (request, response) => {    
    //return response.send('Hello World');

    //const params = request.query; // para query params
    //const params = request.params;  // para route params
    //const data = request.body;  // para request body
    
    //return response.json({ id });
//});

// criar uma sessão
routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index); 
//routes.post('/ongs', OngController.create);
// se a validação passar vai para o OngController.create
// posso inserir quantos caminhos eu quiser routes.post('/ongs', celebrate(), celebrate2(), OngController.create);
routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  }),  
}), OngController.create);

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),        /* como eu não conheço todos os headers que vão ser enviados usar unknown() */
}), ProfileController.index);

routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  }),
}), IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
}), IncidentController.delete);

module.exports = routes;