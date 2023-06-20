const logger = require('./logger');

const requestLogger = (request, response, next) => {
	logger.info('----- middleware.js: 4 -----');
  logger.info('Method:', request.method);
  logger.info('Path: ', request.path);
  logger.info('Body: ', request.body);
  logger.info('---');
  next();
};

// The requested resource could not be found but may be available in the future.
// Subsequent requests by the client are permissible.
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
	return response.status(400).json({
		error: 'Token missing or invalid'
	});
  } else if (error.name === 'TokenExpiredError') {
	return response.status(401).json({
		error: 'Token expired'
	});
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
