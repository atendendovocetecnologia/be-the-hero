const knex = require('knex');
const configuration = require('../../knexfile');

// devido os testes a configuração de desenvolvimento é desabilitada
//const connection = knex(configuration.development);
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

//console.log(config.connection.filename);

const connection = knex(config);

module.exports = connection;