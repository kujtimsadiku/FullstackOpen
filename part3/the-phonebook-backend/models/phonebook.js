const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log(`Connecting to ${url}`);

mongoose.connect(url)
    .then(result => {
        console.log('Connected to MongoDB', result);
    })
    .catch(error => {
        console.log(`Connection failed! ${error.message}`);
    });

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String
});

phonebookSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString();

        delete returnedObj._id;
        delete returnedObj.__v;
    }
});

module.exports = mongoose.model('Phonebook', phonebookSchema);