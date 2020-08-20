const express = require('express');
const app = express();

const catalog = require('./database');

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json()); 

const morgan = require('morgan');
app.use(morgan('dev'));

app.disable('etag');

app.get('/books', (req, res, next) => {
    res.status(200).send(catalog);
});

app.get('/books/:search', (req, res, next) => {
    const search = req.params.search;

    if (!isNaN(Number(search)) && catalog[Number(search) - 1]) {
        res.status(200).send([catalog[Number(search) - 1]]);
    } else {
        let searchResults = [];

        for (let i = 0; i < catalog.length; i++) {
            if (catalog[i].title.toLowerCase().includes(search) || catalog[i].author.toLowerCase().includes(search) || catalog[i].altAuthorSpelling.toLowerCase().includes(search) || catalog[i].id === Number(search)) {
                searchResults.push(catalog[i]);
            }
        }

        if (searchResults.length >= 1) {
            res.status(200).send(searchResults);
        } else {
            res.status(404).send();
        }
    }
});

app.post('/admin/add', (req, res, next) => {
    const newBook = req.body;

    catalog.push(newBook);
    res.status(201).send({status: 201});
});

app.put('/admin/update', (req, res, next) => {
    const updatedBook = req.body;

    if (updatedBook.id <= catalog.length) {
        catalog[updatedBook.id - 1] = updatedBook;
        res.status(200).send({status: 200});
    } else {
        res.status(404).send({status: 404});
    }
});

app.delete('/admin/delete', (req, res, next) => {
    const bookId = req.body.id;

    if (bookId <= catalog.length) {
        catalog.splice(bookId - 1, 1);
        res.status(204).send({status: 204});
    } else {
        res.status(404).send({status: 404});
    }
});

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log();
});