var User = require('./user-model.js');

module.exports = function(app){
    app.get('/', function(req, res) {
		res.status(404);
        res.json({ message: 'Invalid Route' });
    });

	app.post('/users', function(req, res) {
		var user = new User();
		user.name = req.param('name');

		user.save(function (err) {
			if (err) res.send(err);

			res.json({ message: 'User created!' });
		});
	});

	app.get('/users', function(req, res) {
		User.find(function(err, bears) {
			if (err) res.send(err);

			res.json(bears);
		});
	});

	app.get('/user/:user_id', function(req, res){
		User.findById(req.params.user_id, function(err, user) {
			if (err) res.send(err);

			res.json(user);
		});
	});

	app.post('/user/:user_id', function(req, res){
		User.findById(req.params.user_id, function(err, user) {
			if (err) res.send(err);

			user.name = req.param('name');
			user.save(function(err) {
				if (err) res.send(err);

				res.json({ message: 'User updated!' });
			});
		});
	});

	app.delete('/user/:user_id', function(req, res){
		User.remove({
			_id: req.params.user_id
		}, function(err, user) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});
};
