const mongoose = require('mongoose');

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
});

blogSchema.set('toJSON', {
  transform: (document, returnObject) => {
    const id = returnObject._id.toString();
    returnObject.id = id;

    delete returnObject._id;
    delete returnObject._v;
  },
});

module.export = mongoose.model('Blog', blogSchema);
