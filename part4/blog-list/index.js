const app = require('./app');
const config = require('./utils/config');
const logger = require('./utils/logger');

app.get('/', (request, response) => {
	response.send('<h1>Part 4</h1>')
});

// ---------------
// TOIMII TALLA

// const PORT = 3001;

// app.listen(PORT, () => {
// 	console.log(`running on the ${PORT}`)
// });
// ----------------

app.listen(config.PORT, () => {
  logger.info(`Server is running on port ${config.PORT}`);
});

