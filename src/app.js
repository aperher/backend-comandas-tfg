require('dotenv').config();
const express = require('express');
const router = require('./routes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 80;

app.use(cors());
app.use("/v1", router);

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});