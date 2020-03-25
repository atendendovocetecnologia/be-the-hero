const express = require('express');

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
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;