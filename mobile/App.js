import React from 'react';
import intl from 'intl';
import 'intl/locale-data/jsonp/pt-BR'; /* obtem a internacionalização do pt-BR, ou seja, do Brasil */

// importar minhas rotas
import Routes from './src/routes';

export default function App() {
  return (
    <Routes />
  );
}
