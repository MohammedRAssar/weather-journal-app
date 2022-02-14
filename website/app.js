/* Global Variables */
const baseURL		= 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
const apiKey		= '&appid=35738482ec8fed3ff1c2378d02e4615b&units=imperial';
const date 			= document.getElementById('date');
const temp 			= document.getElementById('temp');
const content 		= document.getElementById('content');
const generate 		= document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
// [ + 1 ] to get the correct number of the month - .getMonth() start counts from 0  
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

/*
** Add click Event Listener to the "Generate" button.
** generateAction() function will start doing all the magic ones the user clicks on the button.
** [1] Capture zip input field value
** [2] Capture feelings textarea input value
** [3] Simple validation to check if zip field is not empty => alert if empty
** [4] GET data from Weather API
** [5] POST data to server API endpoint
** [6] Update UI with the fetched data
*/

generate.addEventListener('click', generateAction)

function generateAction() {
	const zipCode		= document.getElementById('zip').value;
	const userFeelings	= document.getElementById('feelings').value;
	// Uncomment below line to test that you capture the zipCode && userFeelings correctly
	//console.log(zipCode + " " + userFeelings); 
	if(!zipCode) {
		alert("Enter ZIP Code!")
	} else {
		/**
		 * Run getCurrentWeather() function, then
		 * Run postData() function, then
		 * Run UpdateUI() function
		 */
		getCurrentWeather(baseURL, zipCode, apiKey)
		.then(function(i) {
			// POST fetched data to the created route in server
			postData('/postdata', {
				// Temperature from API
				temp: i.main.temp,
				// Date is previously defined 
				newDate: newDate,
				// userFeelings is from (feelings) input
				userFeelings: userFeelings,
			})
		})
		.then( () => {
			// After GET data from Weather API and POST it to the server API endpoint => Update the UI with the fetched data
			updateUI()
		})
		
	}
}

// GET Weather
const getCurrentWeather = async (baseURL, zipCode, apiKey) => {
	const res = await fetch(baseURL+zipCode+apiKey);
	try {
		const data = await res.json();
		return data;
	} catch (err) {
		console.log("Error: ".err);
	}
}

// POST function
const postData = async (url = "", data = {}) => {
	const request = await fetch(url, {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
};

// Dynamically Update UI async function
const updateUI = async () => {
		// Retrieve data from server
		const request = await fetch("/getdata");
		try {
			const data = await request.json();
			// Dynamically change the DOM with the data
			temp.innerHTML		= "Temperature is: " + Math.round(data.temp) + ' degrees';
			content.innerHTML	= "I'm Feeling: " + data.userFeelings;
			date.innerHTML		= "Date: "+ data.newDate;
		} catch(err) {
			console.log("Error: ".err);
	}
};