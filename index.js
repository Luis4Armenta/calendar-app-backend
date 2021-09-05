const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
const { validateJWT } = require('./middlewares/validate-jwt');
require('dotenv').config();

const app = express();
dbConnection();

app.use(cors());

app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', validateJWT, require('./routes/events'));

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
