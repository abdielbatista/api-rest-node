//config inicial

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');


//ler JSON
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json());

//rota
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes)


//rota inicial / endpoint
app.get('/',(req,res)=>{
    res.json({message: "Oi Humano!"})
})

//porta
dotenv.config();
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose
.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.aewac.mongodb.net/banco-api?retryWrites=true&w=majority`
    )

.then(()=>{
    console.log('Conectado')
    app.listen(3000)
}).catch((err)=> console.log(err));

