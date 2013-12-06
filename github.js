var https = require('https'),
	fs = require('fs'),
	username = process.argv[2] || "",
	repo = process.argv[3] || "",
	secret = "419d65bc738657a08e40",
	client_secret = "32861ef9bebeea8b0e9e9f63975a913d1fd6847d",
	cOptions = {
		hostname : "api.github.com",
		port : 443,
		path : "/repos/"+username+"/"+repo+"/contributors?client_id="+secret+"&client_secret="+client_secret,
		headers : {
			"User-Agent" : "Github Globe"
		}
	};

https.get(cOptions,function(cRes) {
	cRes.on('data', function(d) {
		var cJ = JSON.parse(d),
			dStr = "";
		for (var c in cJ) {
			var contributor = cJ[c],
				uOptions = {
					hostname : "api.github.com",
					port : 443,
					path : "/users/"+contributor.login+"?client_id="+secret+"&client_secret="+client_secret,
					headers : {
						"User-Agent" : "Github Globe"
					}
				},
				numRetrieved = 0;

			https.get(uOptions,function(uRes) {
				uRes.on('data', function(d) {
					var uJ = JSON.parse(d);
					dStr += d;
					numRetrieved++;
					if (numRetrieved == cJ.length) writeData(dStr)
				});
			}).on('error', function(e) {
				console.error(e);
			});
		}
	});
});

function writeData(data) {
	var title = "data/"+username+"_"+repo+".json";
	fs.writeFile(title, data, function(err) {
	    if (err) {
	        console.log(err);
	    } else {
	        console.log("The file was saved!");
	    }
	});
}