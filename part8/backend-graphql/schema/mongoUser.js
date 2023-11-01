const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.schema({
  user: {
    type: String,
    require: true,
    minlength: 3,
  },
  favoriteGenre: {
    type: String,
  },
});
