const blog = require('../models/blog');
const Blog = require('../models/blog');

const initialBlog = [
	{
		title: "World",
		author: "kujtim",
		url: "weeweewee.postman.com",
		likes: 12,
	},
	{
		title: "Hello",
		author: "sadiku",
		url: "weeweewee.manpost.com",
		likes: 5,
	}
];

const nonExistingId = async () => {
	const blog = new Blog({ title: 'willremovethissoon' })
	await blog.save()
	await blog.remove()
  
	return blog._id.toString()
}
  
const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

module.exports = {
	nonExistingId,
	blogsInDb,
	initialBlog,
}