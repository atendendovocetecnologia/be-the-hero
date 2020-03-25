const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// permite que todas as aplicações front-end podem acessar
app.use(cors());

// em producao - definir qual endereço vai pode acessar a nossa aplicação
//app.use(cors({
//    origin: 'http://tecnologia.atendendovoce.com.br'
//}));

// para fazer com o express entenda que vou utilizar json nas requisições
// antes de todas as requisições, estou dizendo para o express ir no corpo da minha requisição
// e converter o json em um objeto do javascript - próprio para evitar undefined ao usar Request Body
app.use(express.json());
app.use(routes);

app.listen(3333);