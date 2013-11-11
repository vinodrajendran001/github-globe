var github = require('octonode');

// github.auth.config({
// 	username: 'neildahlke',
// 	password: '9p9yuyKicGUO'
// }).login(['user', 'repo', 'gist'], function (err, id, token) {
// 	console.log(id, token);
// });

var client = github.client(),
	username = process.argv[2] || "",
	repo = process.argv[3] || "",
	ghuser = client.user(username),
	ghrepo = client.repo(username+"/"+repo);

client.limit(function (err, left, max) {
  console.log(left); // 4999
  console.log(max);  // 5000
});

// client.get('/users/' + username, function (err, status, body) {
//   console.log(body);
// });

// client.get('/users/' + username + "/" + repo, function (err, status, body) {
//   console.log(body);
// });


// ghrepo.info(function(data) {
// 	console.log(data);
// });


ghrepo.contributors(function(err, data) {
	// console.log(err, data);
	for (var c in data) {
		var contributor = data[c];
		// console.log(contributor);
		client.get('/users/' + contributor.login, function (err, status, body) {
		 	console.log(contributor.login + " - " +body.location);
		});
	}
});