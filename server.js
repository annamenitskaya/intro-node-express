var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

// ==========================
// routes
// ==========================

app.get("/", function(request, response) {
	response.send('hi there');
});

//============================
// server 
// ===========================

app.listen(port, function() {
	console.log("Server is running on port: " + port) })
 