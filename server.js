var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var port = process.env.PORT || 3000;

// ==========================
// middleware & config 
// ==========================

app.set('views', 'views');

app.engine('hbs', exphbs ({
extname: 'hbs',
defaultLayout: 'main',
layoutsDir: './views/layouts'
}));
app.set('view engine', 'hbs');

app.use(express.static('public'));

// ==========================
// routes
// ==========================

app.get("/", function(request, response) {
	var favoriteNumbers = [5, 7, 16];
	var favoriteLinks = [
		{ text: 'Facebook', url: 'http://facebook.com' },
		{ text: 'Github', url: 'http://github.com'}
	];
	response.render('home', {
	title: "home page",
	favorites: favoriteNumbers,
	links: favoriteLinks });
});
app.get("/projects", function(request, response) {
	response.render('projects', {title: "My Projects"});
});
app.get("/books", function(request, response) {
	var myBooks = [
		{ text: 'JavaScript: The Good Parts',
		  url: 'http://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742/ref=sr_1_5?ie=UTF8&qid=1462735324&sr=8-5&keywords=javascript',
		  author: 'Douglas Crockford'},
		{ text: 'The Principles of Object-Oriented JavaScript',
		  url: 'http://www.amazon.com/Principles-Object-Oriented-JavaScript-Nicholas-Zakas/dp/1593275404/ref=sr_1_7?ie=UTF8&qid=1462735324&sr=8-7&keywords=javascript',
		  author: 'Nicholas C. Zakas' },
		{ text: "JavaScript Patterns",
		url: 'http://www.amazon.com/JavaScript-Patterns-Stoyan-Stefanov/dp/0596806752/ref=sr_1_9?ie=UTF8&qid=1462735324&sr=8-9&keywords=javascript', 
		author: 'Stoyan Stefanov' }
		];
	
	response.render('books', {
		title: "My Books",
	    books: myBooks});
});

//============================
// server 
// ===========================

app.listen(port, function() {
	console.log("Server is running on port: " + port) })
 