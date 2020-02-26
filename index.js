const express = require('express');
const Users = require('./model/users')
const server = express();

server.use(express.json());

server.get('/', (req,res) => {
    res.status(200).json({message:'its working!'})
})

server.post('/api/register', (req,res) => {
    const user = req.body
    //console.log(user)
    Users.register(user)
    .then(id => {
        res.status(201).json(id)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage:'Something went wrong during register'})
    })
})

server.post('/api/login', (req,res) => {
    const user = req.body
    Users.login(user)
    .then(id => {
        res.status(201).json(id)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage:'Something went wrong during register'})
    })
})

const port = 5000;

server.listen(port, () => {
    console.log(`Server Listening @ ${port}`)
})