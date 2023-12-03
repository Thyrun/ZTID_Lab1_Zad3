// Requiring module
const express = require("express");
var path = require('path');

const app = express();

// funkcja uwierzytelniajaca
function authentication(req, res, next) {
	var authheader = req.headers.authorization;
	console.log(req.headers);
  // jezeli brak naglowka to rzuc 401 brak uwierzytelnienia
	if (!authheader) {
		var err = new Error('You are not authenticated!');
		res.setHeader('WWW-Authenticate', 'Basic');
		err.status = 401;
		return next(err)
	}
  // rozbicie sobie zakodowanego loginu i hasla
	var auth = new Buffer.from(authheader.split(' ')[1],
	'base64').toString().split(':');
	var user = auth[0];
	var pass = auth[1];
  // sam etap sprawdzania poprawnosci danych
	if (user == '' && pass == '') {

		// If Authorized user
		next();
	} else {
		var err = new Error('You are not authenticated!');
		res.setHeader('WWW-Authenticate', 'Basic');
		err.status = 401;
		return next(err);
	}

}

// First step is the authentication of the client
app.use(authentication)
app.use(express.static(path.join(__dirname, 'public')));

// Server nasluchuje na porcie 3000 wiec w przegladarce pod localhost:3000 wyswietli sie strona
app.listen((3000), () => {
	console.log("Server is Running");
})
