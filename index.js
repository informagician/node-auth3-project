const express = require('express');

const server = express();

server.use = express.json();

server.get('/', (req,res) => {
    res.status(200).json({message:'its working!'})
})

const port = 5000;

server.listen(port, () => {
    console.log(`Server Listening @ ${port}`)
})