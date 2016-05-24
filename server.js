var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var port = process.env.PORT || 3000;
var axios = require('axios');
var githubService = require('./services/githubService.js');
var projectInfoService = require('./services/projectInfoService.js');
var moment = require('moment');


// ==========================
// middleware & config 
// ==========================

app.set('views', 'views');

app.engine('hbs', exphbs({
	extname: 'hbs',
	defaultLayout: 'main',
	layoutsDir: './views/layouts',
	helpers: {
		json: function (context) {
			return JSON.stringify(context);
		},
		formatDate: function(date, format) {
			return moment(date).format(format);
		}
	}
}));
app.set('view engine', 'hbs');

app.use(express.static('public'));

// ==========================
// routes
// ==========================

app.get("/", function (request, response) {
	var favoriteNumbers = [5, 7, 16];
	var favoriteLinks = [
		{
			text: 'Facebook',
			url: 'http://facebook.com'
		},
		{
			text: 'Github',
			url: 'http://github.com'
		}
	];
	response.render('home', {
		title: "home page",
		favorites: favoriteNumbers,
		links: favoriteLinks
	});
});
app.get("/projects", function (request, response) {
	githubService.githubInfo()
	.then(function (results) {
		
	var repos = results.repos;
		repos.forEach(function(repo, index) {
	repos[index].hasPost = projectInfoService.fileExists(repo.name);	
			  
			
		});
		
	

			response.render('projects', {
				title: "My Projects",
				bio: results.bio,
				repos: results.repos
			}
			);
		})
.catch(function (err) {
	console.log('err: ', err);
});

});


app.get("/books", function (request, response) {
	var myBooks = [
		{
			text: 'JavaScript: The Good Parts',
			url: 'http://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742/ref=sr_1_5?ie=UTF8&qid=1462735324&sr=8-5&keywords=javascript',
			author: 'Douglas Crockford'
		},
		{
			text: 'The Principles of Object-Oriented JavaScript',
			url: 'http://www.amazon.com/Principles-Object-Oriented-JavaScript-Nicholas-Zakas/dp/1593275404/ref=sr_1_7?ie=UTF8&qid=1462735324&sr=8-7&keywords=javascript',
			author: 'Nicholas C. Zakas'
		},
		{
			text: "JavaScript Patterns",
			url: 'http://www.amazon.com/JavaScript-Patterns-Stoyan-Stefanov/dp/0596806752/ref=sr_1_9?ie=UTF8&qid=1462735324&sr=8-9&keywords=javascript',
			author: 'Stoyan Stefanov'
		}
		];

	response.render('books', {
		title: "My Books",
		books: myBooks
	});
});

app.get('/projects/:id', function (request, response) {
	var currentProjectName = request.params.id;
	var currentProject = {};

	projectInfoService.readFile(currentProjectName, function (err, results) {
		if (err) {
			currentProject = {
				post: currentProjectName + ' is invalid'
			};
		} else {
			currentProject = {
				name: currentProjectName,
				post: results,
				url: 'https://github.com/fierceblonde' + currentProjectName
			};
		}



		response.render('project', {
				title: 'My Projects: ' + currentProjectName,
				project: currentProject
			}

		);
	});
});



//============================
// server 
// ===========================

app.listen(port, function () {
	console.log("Server is running on port: " + port)
})