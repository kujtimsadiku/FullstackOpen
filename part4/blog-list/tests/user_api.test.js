
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const bcrypt = require('bcrypt');
const User = require('../models/user');
const helper = require('./test_helper');

describe('When there is initially one user', () => {
	beforeEach(async () => {
		// await User.deleteMany({});

		const passwordHash = await bcrypt.hash('sikret', 10);
		const user = new User({
			username: 'root',
			passwordHash: passwordHash,
		});

		await user.save();
	});

	test('creation was success', async () => {
		const userAtStart = await helper.usersInDb();

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
		
		const userAtEnd = await helper.usersInDb();
		expect(userAtEnd).toHaveLength(userAtStart.length + 1);

		const username = userAtEnd.map(u => u.username);
		expect(username).toContain(newUser.username);
	})

	test('creation fails with proper statuscode and message if username is already taken', async () => {
		const userAtStart = await helper.usersInDb();

		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'Salainen',
		};

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(result.body.error).toContain('expected `username` to be unique');

		const userAtEnd = await helper.usersInDb();
		expect(userAtEnd).toHaveLength(userAtStart.length);
	})
})

afterAll(async () => {
	await mongoose.connection.close();
});
