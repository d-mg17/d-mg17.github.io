/* 
  Autor: DIEGO MARTINEZ GARCIA (github.com@d-mg17)
  06/13/2023
  Vanilla Weather App JavaScript
*/

// API Key from OpenWeatherMap in config.js
const apiKey = 'e6300e3f847782a77a571aaca32f005f'

// Getting the elements
const form = document.querySelector('form');
const input = document.getElementById("search-bar");
const msg = document.getElementById("msg");

// Custom icons for the weather
const icons_paths = {
  "01d": "images/sun.png",
  "01n": "images/moon.png",
  "02d": "images/partly-cloudy-day.png",
  "02n": "images/cloudy-night.png",
  "03d": "images/cloud.png",
  "03n": "images/cloud.png",
  "04d": "images/clouds.png",
  "04n": "images/clouds.png",
  "09d": "images/torrential-rain.png",
  "09n": "images/torrential-rain.png",
  "10d": "images/rain.png",
  "10n": "images/rain.png",
  "11d": "images/storm.png",
  "11n": "images/storm.png",
  "13d": "images/snow.png",
  "13n": "images/snow.png",
  "50d": "images/wind.png",
  "50n": "images/wind.png"
};

// Event listener for the form submission
form.addEventListener('submit', (e) => {

  // Preventing page reload
  e.preventDefault();

  // Getting the input value
  const inputVal = form.querySelector('input').value;

  var URL = '';

  //Spliting the input value into variables country Name and city Name
  if(inputVal.includes(",")){
    var cityName = inputVal.split(",")[0];
    var countryCode = inputVal.split(",")[1];

    // API URL 
    URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&appid=${apiKey}&units=imperial`;
    console.log(URL);
  }else{
    // API URL 
    URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=imperial`;
    console.log(URL);
  };

  // Fetching the API
  fetch(URL)
    .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const { main, name, sys, weather } = data;
        // console.log(main, name, sys, weather);
        const city = document.getElementById("city-name");
        city.innerText = name;
        console.log(name);

        const country = document.getElementById("country");
        country.innerText = sys.country;
        console.log(country);

        const temp = document.getElementById("temp");
        temp.innerHTML = `${Math.round(main.temp)}<span>°F</span>`;
        console.log(temp);

        const feels = document.getElementById("feels-like");
        feels.innerHTML = `Feels like: ${Math.round(main.feels_like)}<span>°F</span>`;
        console.log(feels);

        const description = document.getElementById("icon-description");
        description.innerText = weather[0]["description"];
        console.log(description);

        const weatherIcon = document.getElementById("weather-icon");
        const icon = icons_paths[weather[0]["icon"]];
        weatherIcon.src = "weather_app/" + icon;
        weatherIcon.alt = weather[0]["main"];

        form.reset();
        msg.textContent = "";
        input.focus();

      })
      .catch(() => {
        msg.innerHTML = "City not found or entered incorrectly.";
        msg.className = "help is-danger";
        input.className = "input has-text-centered is-rounded is-danger";
      });
});


