
function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

//display Temp/humid/wind/icon/date
function showTemperature(response) {
  console.log(response);
  let temperature = document.querySelector("#temperature");
  
  temperature.innerHTML = Math.round(celsiusTemperature);
  console.log(response);

  let humidity = document.querySelector("#humidity");
  let humidityRound = Math.round(response.data.main.humidity);
  humidity.innerHTML = ` Humidity: ${humidityRound} %`;

  let wind = document.querySelector("#wind");
  let windRound = Math.round(response.data.wind.speed);
  wind.innerHTML = ` Wind: ${windRound} km/h`;

   let dateElement = document.querySelector("#date");
   dateElement.innerHTML=formatDate(response.data.dt * 1000);

   let iconElement = document.querySelector("#icon");
   iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
   iconElement.setAttribute("alt", response.data.weather[0].description);

   celsiusTemperature = response.data.main.temp;
}

//search city
function searchCity(event) {
 event.preventDefault();
  let city = document.querySelector("#city");
  let typeCity = document.querySelector("#type-city");
  city.innerHTML = typeCity.value;

  let apiKey = "c25c2e288aa866c69cd6db4b9732a68a";
  let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${typeCity.value}&units=metric&appid=${apiKey}`;

  axios.get(apiurl).then(showTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

navigator.geolocation.getCurrentPosition(searchCity);

//search current city

function clickCurrentButton(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "c25c2e288aa866c69cd6db4b9732a68a";
  let apiurl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiurl).then(showCityName);
}

function showCityName(response) {
  let currentLocation = response.data.name;
  console.log(response.data);
  let cityName = document.querySelector("#city");
  cityName.innerHTML = `${currentLocation}`;

  let temperature = document.querySelector("#temperature");
  let temperatureRound = Math.round(response.data.main.temp);
  temperature.innerHTML = temperatureRound;

  let humidity = document.querySelector("#humidity");
  let humidityRound = Math.round(response.data.main.humidity);
  humidity.innerHTML = ` Humidity: ${humidityRound} %`;

  let wind = document.querySelector("#wind");
  let windRound = Math.round(response.data.wind.speed);
  wind.innerHTML = ` Wind: ${windRound} km/h`;

  let weatherDescription= document.querySelector("#weather-description")
  weatherDescription.innerHTML= response.data.weather[0].description;
}

function showCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(clickCurrentButton);
}
let currentCity = document.querySelector("#current-button");
currentCity.addEventListener("click", showCity); 


//convert Celsius to F
function convertToFahrenheit(event) {
  event.preventDefault();

  let temperature = document.querySelector("#temperature");
  
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);
