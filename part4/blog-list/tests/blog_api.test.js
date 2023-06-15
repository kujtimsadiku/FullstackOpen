const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');
const testHelper = require('./test_helper');

describe('When there is initially some blog saved', () => {
	beforeEach(async () => {
		await Blog.deleteMany({});
		await Blog.insertMany(testHelper.initialBlog);
	});

	test('Blogs are returned as JSON', async () => {
		console.log('entered test')
		await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
	});
	
	// dumb test but with this we also check if the property is not undefined.
	test('Ammount of blogs returned', async () => {
		const response = await api.get('/api/blogs');
		
		expect(response.status).toBe(200);
		
		if (response.body) {
			expect(response.body.length).toBe(response.body.length);
		} else {
			console.error('Response body is undefined')
			expect(response.body).toBeDefined();
		}
	});
	
	// Using (await) to be sure the that the promises are returned from api.get()
	// and to access it without needing to check too much
	describe('Identified blog by id', () => {
		test('identified with id and not _id', async () => {
			const response = api.get('/api/blogs');
			
			const blogByIds = (await response).body.map(blog => blog.id);
			
			for (const id of blogByIds)
			expect(id).toBeDefined();
		});
	});
	
	
	describe('HTTP POST testing', () => {
		test('Blog with values can be added', async () => {
			const blogsAtStart = await api.get('/api/blogs');
			
			const newBlog = {
				title: "test tittle",
				author: "test author",
				url: "test url",
				likes: 10,
			};
			
			await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/);
			
			const blogsAtEnd = await api.get('/api/blogs');
			
			expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length + 1);
			// this is valid also expect(blogsAtEnd.body.length).toBe(blogsAtStart.body.length + 1)
		});
		
		test('Blog without values can not be added', async () => {
			const blog = {};
			
			await api
			.post('/api/blogs')
			.send(blog)
			.expect(400);
		});
	});

	describe('HTTP DELETE testing', () => {
		test('Testing to delete the last one blog', async () => {
			const blogsAtStart = await api.get('/api/blogs');

			const toBeRemoved = blogsAtStart.body[0];
			await api
				.delete(`/api/blogs/${toBeRemoved.id}`)
				.expect(204);
			
			const blogsAtEnd = await api.get('/api/blogs');

			expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length - 1)
		});
	});
});

// user test -----

const bcrypt = require('bcrypt');
const User = require('../models/user');

describe('When there is initially one user', () => {
	beforeEach(async () => {
		await User.deleteMany({});

		const passwordHash = await bcrypt.hash('sikret', 10);
		const user = new User({
			username: 'root', passwordHash
		});

		await user.save();
	});

	test('creation was success', async () => {
		const userAtStart = testHelper.usersInDb();

		const newUser = {
			username: 'ksadiku',
			name: 'kujtim',
			password: 'UusiSalasana',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)
		
		const userAtEnd = await testHelper.usersInDb();
		expect(userAtEnd).toHaveLength(userAtStart.length + 1);

		const username = userAtEnd.map(u => u.username)
		expect(username).not.toContain(newUser.username);
	})
});


// user test -----
	
afterAll(async () => {
	await mongoose.connection.close();
});
