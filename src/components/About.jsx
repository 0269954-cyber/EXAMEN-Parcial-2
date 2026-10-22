import React, { useContext } from 'react';
import MyContext from '../MyContext';

export const About = () => {
  const { autor } = useContext(MyContext);

  return (
    <div>
      <h1>About Page</h1>
      <p>Pagina de criptomonedas</p>
      <p>Autor: {autor}</p>
    </div>
  );
}
