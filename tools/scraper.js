// scraper.js
// ==========
var request = require("request");
var cheerio = require("cheerio");

module.exports = {
	grabPrices : function (options, callback) {
		var url = "http://petrolpricemalaysia.info/";
		var result = [];

		if (typeof callback === "function") {
			request(url, function(error, response, html) {
				if(!error){
					var $ = cheerio.load(html);

					$("div#rpt_pricr").filter(function(){
						var data = $(this);

						data.children().first().children().each(function(index, item) {
							var obj 	 = new Object();
							obj.title 	 = $(item).children("div").first().text();
							obj.price 	 = $(item).children("div").last().children().first().text();
							obj.subtitle = $(item).children("div").last().children().last().text();
							obj.key 	 = obj.title.toLowerCase().replace(/\s/g,"");

							result.push(obj);
						});
					});

					if (options != null && options.key) {
						result = result.find(item => {return item.key == options.key});
					}

					callback(result);

				} else {
					console.error(error);
				}
			});
		}
	}
};
