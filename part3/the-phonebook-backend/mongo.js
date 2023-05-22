const mongoose = require('mongoose');

if (process.argv.length<3) {
    console.log('give password as argument');
    process.exit(1);
}

const noteSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Phonebook = mongoose.model('Phonebook', noteSchema);

const name = process.argv[3];
const number = process.argv[4];

const phonebook = new Phonebook({
    name: name,
    number: number,
});

phonebook.save().then(result => {
    console.log(`Added ${result.name} number ${result.phoneNumber} to phonebook`);
    mongoose.connection.close();
});

Phonebook.find({}).then(result => {
    result.forEach(phonebook => {
        console.log(phonebook);
    });
    mongoose.connection.close();
});