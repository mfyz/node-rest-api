var express = require('express'),
    app = express(),
	mongoose = require('mongoose');

app.set('port', 9002);

mongoose.connect('mongodb://apiuser:asdqwe@ds029197.mongolab.com:29197/node-rest-api');

require("./routes.js")(app);

app.use(function(req, res) {
    res.status(404);
	res.json({ message: 'Not Found' });
});

app.use(function(err, req, res, next) {
	console.error(err.stack);
});

app.listen(app.get('port'));
console.log('Server started at port ' + app.get('port'));