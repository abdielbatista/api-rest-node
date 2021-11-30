const router = require('express').Router();
const { application } = require('express');
const Person = require('../models/Person');

//create
router.post('/', async(req,res)=>{

    //req.body
    const {name, salary, approved} = req.body;

    if(!name){
        res.status(422).json({error: 'Nome obrigatório'})
        return
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

//extrair dado da requisição pela url
router.get('/:id', async(req, res) =>{

    const id = req.params.id
    
    try{
        const person = await Person.findOne({_id: id})

        if(!person){
            res.status(422).json({message: 'O usuário não foi encontrado!'})
            return
        }

        res.status(200).json(person)
    }catch(error){
        res.status(500).json({error: error})
    }
})

//update put e patch
router.patch('/:id', async(req, res)=>{
    const id = req.params.id;

    const {name, salary, approved} = req.body
    
    const person = {
        name,
        salary,
        approved,
    }

    try{

        const updatePerson = await Person.updateOne({_id: id}, person)

        if(updatePerson.matchedCount === 0){
            res.status(422).json({message: 'O usuário não foi encontrado!'})
            return
        }

        res.status(200).json(person)

    }catch(error){
        res.status(500).json({error: error})
    }
})

module.exports = router