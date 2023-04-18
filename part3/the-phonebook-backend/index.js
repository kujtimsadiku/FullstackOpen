const express = require('express');
const morgan = require('morgan');
const app = express();


app.use(express.json())
app.use(morgan('tiny'))

let phonebook = [
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 1
      },
      {
        "name": "Matti Honkanen",
        "number": "040-7654321",
        "id": 2
      },
      {
        "name": "Kujtim Sadiku",
        "number": "040-1234567",
        "id": 3
      }
    ]

app.get('/', (req, res) => {
    res.send('<h1>Backend</h1>');
})
app.get('/api/persons', (req, res) => {
    res.json(phonebook);
})

app.get('/info', (req, res) => {
    const contactAmount = phonebook.length;
    const date = new Date();
    console.log(date);
    res.send(`<p>Phonebook has info for ${contactAmount} people</p></b>${date}`);
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const note = phonebook.find(note => note.id === id);

    if (note) {
        res.json(note);
    } else {
        res.status(404).end();
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    phonebook = phonebook.filter(note => note.id !== id);

    res.status(204).end();
})

const generateId = () => {
    let newId = Math.floor(Math.random() * 2000);
    let usedId = phonebook.some(note => note.id === newId);

    if (usedId) {
        return (generateId());
    } else {
        return (newId);
    }
}

const errorMessage = (res, message, errorCode) => {
        res.status(errorCode).json({
            error: message 
        })
}

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if (!body.name) {
        return (errorMessage(res, 'Name is missing!', 400));
    } else if (!body.number) {
        return (errorMessage(res, 'Number is missing!', 400));
    } else if (phonebook.some(person => person.name === body.name)) {
        return (errorMessage(res, 'Contact is already in phonebook!', 400));
    }

    const id = generateId();
    const newPerson = {
        name: body.name,
        number: body.number,
        id: id
    }

    console.log(newPerson);
    phonebook = phonebook.concat(newPerson);
    res.json(newPerson);
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`The server is runnning on port ${PORT}`);
})