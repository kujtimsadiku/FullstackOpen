const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  comments: {
    type: [],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnObject) => {
    const id = returnObject._id.toString();
    returnObject.id = id;

    delete returnObject._id;
    delete returnObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
