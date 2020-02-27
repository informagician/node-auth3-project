require('dotenv').config()
const express = require('express');
const Users = require('./model/users.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {jwtsecret} = require('./config/secrets')
const restricted = require('./middleware/restricted')

const server = express();

server.use(express.json());

server.get('/', (req,res) => {
    res.status(200).json({message:'its working!'})
})

server.post('/api/register', (req,res) => {
    let user = req.body
    user.password = bcrypt.hashSync(user.password,13)
    console.log(user)
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
    const userData = req.body

    Users.login(userData)
    .then(user => {
        if(user && bcrypt.compareSync(userData.password, user.password)) {
            const token = generateToken(user)
            res.status(200).json({message:"You are logged in",token})
        } else {
            res.status(401).json({errorMessage: 'Invalid Username or Password'})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage:'Something went wrong during login'})
    })
})

server.get('/api/list', restricted, (req,res) => {
    
    Users.list()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        console.log(err)

        res.status(500).json({errorMessage:'OOPS!'})
    })
})

const port = 5000;

server.listen(port, () => {
    console.log(`Server Listening @ ${port}`)
})



function generateToken(user){
    const payload = {
        subject: user.id,
        username: user.username,
        role: user.role
    }

    const options = {
        expiresIn: '1h'
    }

    return jwt.sign(payload, jwtsecret, options)
}