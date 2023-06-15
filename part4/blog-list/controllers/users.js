const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const { response } = require('../app');
const User = require('../models/user');

userRouter.get('/', async (request, response) => {
	const users = await User.find({});

	response.json(users);
});

userRouter.post('/', async (request, response) => {
	const { usernanme, name, password } = request.body;

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const user = new User({
		usernanme,
		name,
		passwordHash,
	});

	const savedUser = await user.save();

	response.status(201).json(savedUser);
});

module.exports = userRouter;