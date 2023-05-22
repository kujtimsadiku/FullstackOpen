const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
require('dotenv').config();
const Phonebook = require('./models/phonebook');

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(morgan('tiny'));


app.get('/api/persons', (request, response) => {
    Phonebook.find({ })
        .then(phonebook => {
            response.json(phonebook);
        });
});

app.get('/info', (req, res) => {
    const date = new Date().toString();
    Phonebook.find({})
        .then(person => {
            res.send(
                `<div>Phonebook has info for ${person.length} people</div>
                       <div>${date}</div>`
            );
        });
});

app.get('/api/persons/:id', (req, res, next) => {
    Phonebook.findById(req.params.id)
        .then(person => {
            if (person)
                res.json(person);
            else
                res.status(404).end();
        })
        .catch(error => next(error));
});

/*
    https://stackoverflow.com/questions/5809788/how-do-i-remove-documents-using-node-js-mongoose
    -- findOneAndRemove or findByIdAndRemove --
*/

app.delete('/api/persons/:id', (req, res, next) => {
    Phonebook.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch(error => next(error));
});

app.post('/api/persons', (req, res, next) => {
    const body = req.body;

    const person = new Phonebook({
        name: body.name,
        number: body.number,
    });

    person.save()
        .then(savedContact => {
            res.json(savedContact);
        })
        .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
    const person = request.body;

    const newPerson = {
        name: person.name,
        number: person.number,
    };
    Phonebook.findByIdAndUpdate(request.params.id, newPerson, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson);
        })
        .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);
const errorHandler = (error, request, response, next) => {
    console.log(error);

    if (error.name === 'CastError')
        return (response.status(400).send({ error: 'malformed id' }));
    else if (error.name === 'ValidationError')
        return (response.status(400).json({ error: error.message }));

    next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});