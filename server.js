var express = require("express");
var app     = express();
var scraper	= require('./tools/scraper.js')

app.get("/prices", function(req, res){
	// use callbacks due to async request behaviour
	scraper.grabPrices(null, function(result) {
		res.json(result);
	});
});

app.get('/prices/:key', function(req, res) {
    scraper.grabPrices({ "key" : req.params.key }, function(result) {
		res.json(result);
	});
});

// required by Openshift for health checking
app.get('/health', function(req, res) {
    res.writeHead(200);
    res.end();
});

app.get('/', function(req, res) {
    res.json({});
});

app.get('/*', function(req, res) {
    res.redirect('/');
});

// use openshit / c9 system variable for hosting
var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000;
var hostname = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || "localhost";
app.listen(port, hostname);

console.log("Server started. Server listening at " + hostname + ":" + port);
