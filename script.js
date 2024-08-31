async function getWeather() {
    // Get the city name by the user//
    const city = document.getElementById('city').value;
    //API key for OpenWeatherMap
    const apiKey ='102e9e025ba4f26dca06c015ba528dd5' ;
    //Construct the API URL with the city and API key 
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    //show the loading spinner
    document.getElementById('load-spinner').style.display="block";

    document.getElementById('weather-info').innerHTML ='';// Removes the previous weather info

    try {
        const response = await fetch(url); // Fetch the weather data from the API
        const data = await response.json(); // Convert the responce to JSON format

        setTimeout(() =>{
        document.getElementById('load-spinner').style.display="none"; //Hide the loading spinner
        displayWeather(data); // Call function to display the weather data
        setweatherbackground(data.weather[0])
        }, 2000);

    } catch (error) {
        // hide the spinner if the spinner occurs error
        document.getElementById('load-spinner').style.display="none";
        // log any errors to the console 
        console.error('Error fetching the weather data:' , error)
        document.getElementById('weather-info').innerHTML = '<p>Failed to fetch weather data. Please try again.</p>';
    }
}

function displayWeather(data) {
    //get the html element where the weather info will be displayed 
    const weatherInfo = document.getElementById('weather-info');

    // check if the API response is successful 
    if (data.cod === 200) {

        // Extract temperature and weather description from the data 

        const temp = data.main.temp;
        const description = data.weather[0].description;

        //Display the city name, temperature , and description in the html
        weatherInfo.innerHTML = `<h2>${data.name}</h2><p>${temp}°C , ${description}</p>`;
    } else {

        // Display the error message that city is not found
        weatherInfo.innerHTML = `<p> City is not found. Please enter the valid city </p>`
    }
}

function setweatherbackground(weather) {
    const weathercondition = weather.main.toLowerCase();
    const body = document.body;

    //reset classes
    body.className ='';

    if (weathercondition === 'clear'){
        body.classList.add('weather-app-sunny');
    }else if (weathercondition === 'haze'){
        body.classList.add('weather-app-haze');
    }else if (weathercondition.includes('clouds')){
        body.classList.add('weather-app-overcast');
    }else if (weathercondition === 'rain'){
        body.classList.add('weather-app-rainy');
    }else if (weathercondition === 'Thunderstorm'){
        body.classList.add('weather-app-storm');
    }
}

const themeToggleBtn = document.getElementById('themeToggleBtn');
const body = document.body;

themeToggleBtn.addEventListener('click',()=>{
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');

    if ( body.classList.contains('dark-mode')){
        themeToggleBtn.textContent = 'Light mode';
    }else {
        themeToggleBtn.textContent ='Dark mode';
    }
});

//setting initial theme as user prefrence 

window.onload = function(){
    if ( body.classList.contains('dark-mode')){
        themeToggleBtn.textContent = 'Light mode';
    }else {
        themeToggleBtn.textContent ='Dark mode';
    }
};
