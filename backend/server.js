require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dataRoute = require('./routes/dataroute');
const cors = require('cors');
const port = process.env.PORT;
//express app
const app = express();
// middleware
app.use(express.json());
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});
//routes
app.use(cors());
app.use('/api/plugindata', dataRoute);
//connect to db
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		// listen for req
		app.listen(port, () => {
			console.log(`connected to db & listening to server on port ${port}`);
		});
	})
	.catch((error) => {
		console.log(error);
	});
