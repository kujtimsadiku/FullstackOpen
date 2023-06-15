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
  
const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

module.exports = {
	blogsInDb,
	initialBlog,
}