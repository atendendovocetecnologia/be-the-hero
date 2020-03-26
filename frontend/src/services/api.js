import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333',
})

export default api;    /* assim os outros arquivos podem importar este aqui */