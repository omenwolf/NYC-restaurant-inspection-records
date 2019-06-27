const express = require('express');
const app = express();
const hbs = require('hbs');
const morgan = require('morgan'); // morgan is a HTTP request logger middleware
const axios = require('axios');
const bodyParser = require('body-parser'); // adds body object to request so app can access POST parameters
const querystring = require('querystring');
const _ = require('lodash');
const path = require('path');
const compression = require('compression');

app.use(compression());
app.use(bodyParser.json());
// TODO: assess on the extended rule set to false by default
app.use(bodyParser.urlencoded({ extended: false }));

// TODO: change source directory to partials, changing server folder directory
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// log all HTTP requests in the console
app.use(morgan('dev'));

app.use(express.static(__dirname));

const port = process.env.PORT || 8080;

// token acquired by OpenNYC Data API
const token = process.env.API_TOKEN || require('./token');
const socrataUrl = 'https://data.cityofnewyork.us/resource/9w7m-hzhe.json';

// SET ROUTES
// =======================================

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Restaurant Inspection Records'
	});
});

app.get('/search', (req, res) => {
	res.render('search.hbs', {
		pageTitle: 'Advanced Search'
	});	
});

app.post('/search', (req, res) => {
	var {zipcode} = req.body;
	var {borough} = req.body;

	var data = req.body;
	var businessName = data.dba.toUpperCase();

	// If businessName includes single quote mark, change it to double quote
	// This prevents socrataQuery from throwing an error
	if (_.includes(businessName, "'")) {
		businessName = businessName.replace(/'/g, "''");
	}

	var socrataQuery = `$$app_token=${token}`;

	// if data.dba contains a value, add socrataQuery to urlQuery
	if (data.dba.length > 0) {
		socrataQuery += `&$where=DBA%20like%20%27%25${businessName}%25%27`;
	}

	// Remove business name query
	delete data.dba;

	// Remove zipcode query string if it's empty
	if (data.zipcode === undefined || data.zipcode.length === 0) {
		delete data.zipcode;
	}

	// Merge query strings. Exclude undefined query strings.
	var urlQuery = querystring.stringify(_.merge(data));

	axios(`${socrataUrl}?${socrataQuery + "&" + urlQuery}`)
		.then((response) => {
			let searchResults = response.data;
			if (searchResults.length === 0) {
				return res.render("results.hbs", {
					pageTitle: 'Search Results',
					numberResults: 'Your search returned no results.'
				});
			} else {
				res.render("results.hbs", {
					pageTitle: 'Search Results',
					body: searchResults,
					numberResults: `Your search returned ${searchResults.length} results.`
				});
			}
		})
		.catch((err) => {
			// res.status(err.response.status);
			res.render("error.hbs", {
				pageTitle: 'Something went wrong!',
				errorMessage: 'There seems to be an error. Let\'s go home and try something else.'
			});
		});

});

app.get('/report-violations', (req, res) => {
	res.render('reportViolations.hbs', {
		pageTitle: 'Report Violations'
	});
});

// Verify domain ownership for Loader.io
// TODO: changes to test directory for server folder directory change
app.get('/loaderio-fa3d7d398a3f4e83e9200e551ad73854.txt', (req, res) =>
  res.sendFile(path.resolve(__dirname, './test/loaderio-fa3d7d398a3f4e83e9200e551ad73854.txt'))
);

app.use((req, res) => {
	res.status(404);
	res.render('404.hbs', {
		pageTitle: 'Page Not Found'
	});
});

// Start server
app.listen(port, () => {
	// console.log(`App is running on http://localhost: ${port}`);
});