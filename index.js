const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let auto = [
	{ id: 1, marca: 'Ferrari', modello: 'SF 90 H' },
	{ id: 2, marca: 'Alfa Romeo', modello: 'Stelvio' }
];

let nextId = 3;

app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );

app.use( bodyParser.urlencoded({ extended: false }) );

app.get('/', function (req, res) {
	res.sendFile( __dirname + '/public/index.html' );
});

app.get('/auto', function (req, res) {
	res.render('auto', {
          automobili: auto
        });
});

app.post('/auto', function (req, res) {
	const automobile = {
		id: nextId,
		marca: req.body.marca,
		modello: req.body.modello
	};
	nextId++;
	auto.push(automobile);

	res.redirect('/auto');
});

app.post('/elimina-auto', function (req, res) {
	const id = req.body.id;
	const autoFiltrate = auto.filter( function (automobile) {
		return automobile.id != id;
	});
	auto = autoFiltrate;

	res.redirect('/auto');
});

app.listen(3000);