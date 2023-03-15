require('dotenv').config();
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

console.log(process.env.PORT);

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});