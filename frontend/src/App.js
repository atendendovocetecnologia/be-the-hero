//import React, { useState } from 'react';
import React from 'react';

//import Header from './Header';
import './global.css';

//import Logon from './pages/Logon';
import Routes from './routes';


function App() {
  //let counter = 0;
  
  //let counter = useState(0);
  //const [counter, setCounter] = useState(0);
  // useState retorna um Array[valor, funcaoDeAtualizacao]

  /*
  function increment() {
    //counter++;
    setCounter(counter+1);
    //console.log(counter);
  }
  return (
    <div>
      <Header>Contador: {counter}</Header>
      <button onClick={increment}>Incrementar</button>
    </div>
  );
  */

  /*
  return (
    <Logon />
  );
  */

  return (
    <Routes />
  )
}

export default App;
