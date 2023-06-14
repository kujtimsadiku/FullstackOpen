const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');
const testHelper = require('./test_helper');

beforeEach(async () => {
	await Blog.deleteMany({})
	console.log('cleared');

	const blogObject = testHelper.initialBlog
		.map(blog => new Blog(blog)
	);

	const promiseArray = blogObject
		.map(blog => blog.save()
	);

	await Promise.all(promiseArray);
})

test('blogs are returned as json', async () => {
	console.log('entered test')
	await api
	  .get('/api/blogs')
	  .expect(200)
	  .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
	const response = await api.get('/api/blogs')
  
  
	expect(response.body).toHaveLength(testHelper.initialBlog.length)
})

test('a specific blog is within the returned blog', async () => {
	const response = await api.get('/api/blogs')
  
  
	const titles = response.body.map(r => r.title)
  
	expect(titles).toContain('World')
})

test('there are two blogs', async () => {
	const response = await api.get('/api/blogs')
  
	expect(response.body).toHaveLength(2)
})

test('a valid blog can be added ', async () => {
	const newBlog = {
		title: "wau",
		author: "body.author",
		url: "body.url",
		likes: "10",
	};

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await testHelper.blogsInDb();
	expect(blogsAtEnd).toHaveLength(testHelper.initialBlog.length + 1);

	const title = blogsAtEnd.map(r => r.title)
	expect(title).toContain('wau')
})

test('test without content is not added', async () => {
	const newBlog = {};

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)

	const blogsAtEnd = await testHelper.blogsInDb();
	expect(blogsAtEnd).toHaveLength(testHelper.initialBlog.length);
})

test('a specific blog can be viewed', async () => {
	const blogAtStart = await testHelper.blogsInDb();

	const blogToView = blogAtStart[0];

	const resultBlog = await api
		.get(`/api/blogs/${blogToView.id}`)
		.expect(200)
		.expect('Content-Type', /application\/json/);
	
	expect(resultBlog.body).toEqual(blogToView);
})

test('a blog can be deleted', async () => {
	const blogAtStart = await testHelper.blogsInDb();
	const noteToDelete = blogAtStart[0];

	await api
		.delete(`/api/blogs/${noteToDelete.id}`)
		.expect(204);

	const blogsAtEnd = await testHelper.blogsInDb();

	expect(blogsAtEnd).toHaveLength(testHelper.initialBlog.length - 1);

	const titles = blogsAtEnd.map(t => t.title);

	expect(titles).not.toContain(noteToDelete.title);
})

afterAll(async () => {
  await mongoose.connection.close()
})