// Setup empty JS object to act as the app API endpoint
projectData = {};

/*
** Dependencies
** Require Express to run server and routes
** Require installed package "body-parser"
** Require installed package "cors"
*/
const express 		= require('express');
const bodyParser 	= require('body-parser');
const cors 			= require('cors');

// Start up an instance of app
const app 			= express();

/* Middleware */
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server on port 8080
const port = 8080;

/*
 ** Utilizing .listen() method to check if the server is running.
 ** Creating the function on the second argument using Arrow Function.
 */

const server = app.listen(port, () => {
	console.log(`Server is running on localhost: ${port}`)
});

// GET ROUTE
app.get("/getdata", function(req, res) {
	res.send(projectData)
})

// POST ROUTE
app.post("/postdata", function(req, res) {
	const data = req.body;
	// Save data recieved from the client side in the app endpoint 
	projectData = {
		temp: data.temp,
		userFeelings: data.userFeelings,
		newDate: data.newDate,
	}
})

