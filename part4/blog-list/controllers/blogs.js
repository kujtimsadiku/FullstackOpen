const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
	// response.send(`<h1>Testing purposes -- remember to take it off from blogs.js line 7</h1>`);
	const blogs = await Blog.find({});
	response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
	const body = request.body;
	
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	})
	
	const savedBlog = await blog.save();
	response.status(201).json(savedBlog);
});

blogsRouter.get('/:id', async (request, response, next) => {
	const blog = await Blog.findById(request.params.id);

	if (blog) {
		response.json(blog);
	} else {
		response.status(404).end();
	}
});

blogsRouter.delete('/:id', async (request, response, next) => {
	await Blog.findByIdAndRemove(request.params.id);
	response.status(204).end();
});

blogsRouter.put('/:id', (request, response, next) => {
	const body = request.body;

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	}

	Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
		.then(updateBlog => {
			response.json(updateBlog);
		})
		.catch(error => next(error));
});


module.exports = blogsRouter;
