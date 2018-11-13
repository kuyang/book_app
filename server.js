'use strict'

require(`dotenv`).config();
const cors = require(`cors`)
const express = require(`express`)
const ejs = require(`ejs`)
const superagent = require(`superagent`)

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.urlencoded({ extended: true }))

app.set(`view engine`, `ejs`)

app.get('/', (req, res)=>{
    res.render('pages/index')
})

app.get('*',(req, res) => {
    res.status(404).send({ status: res.status, message: 'Something not working!!'})
})

app.listen(PORT, () => {
    console.log(`The server is running on Port: ${PORT}`)
})
