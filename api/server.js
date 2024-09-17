const express= require( 'express');
const helmet = require('helmet');

const Schemes = require('./schemes/schemes-model');

const server = express();
server.use(helmet());
server.use(express.json());

server.get('/schemes', (req, res, next) => {
	Schemes.getAll().then(
		result => {
			res.status(200).json(result);
		},
		error => next(error))
});

server.get('/schemes/:id', (req, res, next) => {
	const id = parseInt(req.params.id);

	if (isNaN(id)) {
		return next({ status: 400, message: "invalid id" });
	}

	Schemes.getById(id).then(
		result => {
			if (result)
				return res.status(200).json(result);
			else
				return next({ status: 404, message: "id not found" });
		},
		error => next(error))
});

server.post('/schemes', (req, res, next) => {
	const { name, colors } = req.body;

	if (!name || typeof name !== 'string' || name.length === 0)
		return next({ status: 400, message: "name is required" });
	else if (!colors || !Array.isArray(colors) || colors.length === 0)
		return next({ status: 400, message: "colors are required" });

	const scheme = { name, colors };

	Schemes.add(scheme).then(
		result => {
			res.status(201).json(result);
		},
		error => next(error))
});

server.delete('/schemes/:id', (req, res, next) => {
	const id = parseInt(req.params.id);

	if (isNaN(id)) {
		return next({ status: 400, message: "invalid id" });
	}

	Schemes.remove(id).then(
		result => {
			if (result)
				return res.status(200).json(result);
			else
				return next({ status: 404, message: "id not found" });
		},
		error => next(error))
});

server.use((err, req, res, next) => {
	if (err) {
		res.status(err.status).json({ message: err.message });
	}
	else {
		res.status(500).json({ message: "An error occured!" });
	}
});

module.exports = server;
