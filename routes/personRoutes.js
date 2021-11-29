const router = require('express').Router();
const { application } = require('express');
const Person = require('../models/Person');

//create
router.post('/', async(req,res)=>{

    //req.body
    const {name, salary, approved} = req.body;

    if(!name){
        res.status(422).json({error: 'Nome obrigatório'})
    }

    const person = {
        name, salary, approved
    }

    //creat
    try{
        //criando dados
        await Person.create(person)

        res.status(201).json({message: 'Pessoa Inserida no Sistema'})

    }catch(error){
        res.status(500).json({error: error});
    }

})

//read - leitura
router.get('/', async(req,res)=>{
    try{
        const people = await Person.find()

        res.status(200).json(people)
    }catch(error){
        res.status(500).json({error: error})
    }
})

module.exports = router