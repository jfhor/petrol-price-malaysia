var express = require("express");
var request = require("request");
var cheerio = require('cheerio');
var app     = express();

app.get("/get-price", function(req, res){
	url = "http://petrolpricemalaysia.info/";

	request( url, function(error, response, html) {
		if(!error){
			var $ = cheerio.load(html);

			var response = { prices: [] };
			var title, price, subtitle;
			// var obj = { title : "", price : "", subtitle : "" };

			$("div#rpt_pricr").filter(function(){
				var data = $(this);

				data.children().first().children().each(function(index, item) {
					var obj = new Object();
					obj.title = $(item).children("div").first().text();
					obj.price = $(item).children("div").last().children().first().text();
					obj.subtitle = $(item).children("div").last().children().last().text();

					response.prices.push(obj);
				});

				res.json(response);
			});

		} else {
			console.error(error);
		}
	});
});

app.listen("8080")

console.log("Server started.");
