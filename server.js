'use strict'

require(`dotenv`).config();
const cors = require(`cors`)
const express = require(`express`)
const ejs = require(`ejs`)
const superagent = require(`superagent`)

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set(`view engine`, `ejs`)

const Book = function(book){
    this.title = book.volumeInfo.title
    this.author = book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'none'
    this.bookPic = book.volumeInfo.imageLinks.thumbnail
    this.subtitle = book.volumeInfo.subtitle
}

// *** ROUTES ***
app.get('/', (req, res)=>{
    res.render('pages/index')
})

app.post('/search', (req, res) => {
    const data = req.body
    let url = `https://www.googleapis.com/books/v1/volumes?q=+`
    req.body.parameter === 'title' ? url += `intitle:${data.searchText}` : url += `inauthor:${data.searchText}`
    superagent.get(url)
        .then(book => {
            let booksArray = book.body.items.map(val => {
                return new Book(val)
            })
            res.render('pages/resultsPage',  { books: booksArray})
        })
        .catch(err => res.send({ error: err, message: 'Something is broken!'}))
})


app.get('*',(req, res) => {
    res.status(404).send({ status: res.status, message: 'Something not working!!'})
})

app.listen(PORT, () => {
    console.log(`The server is running on Port: ${PORT}`)
})
