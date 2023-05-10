const express = require('express');
const { conectarDB } = require('./db/connection');
const router = require('./routes/userRoutes');
const { authRouter } = require('./routes/authRoute');
const { categoriasRouter } = require('./routes/categoriasRoutes');

require('dotenv').config();

const app = express();


app.use(express.json());
app.use(express.static('public'));

//CONEXION A DB
conectarDB();

//RUTAS
app.use('/api/user', router);
app.use('/auth/user', authRouter);
app.use('/api/categorias',categoriasRouter);

app.listen('4000',()=>{
    console.log('Server running on port 4000');
})