//config inicial

const express = require('express');
const app = express();

//ler JSON
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json());

//rota inicial / endpoint
app.get('/',(req,res)=>{
    res.json({message: "Oi Humano!"})
})

//port
app.listen(3000)