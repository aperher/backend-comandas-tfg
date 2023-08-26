require('dotenv').config();
const express = require('express');
const router = require('./routes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 80;

// middlewares
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// routes
app.use("/v1", router);

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

