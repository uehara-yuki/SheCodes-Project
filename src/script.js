//feature 1 homework week 4

let date = document.querySelector("#date");

let now = new Date();
now.getDay();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

date.innerHTML = `${day} ${hours} : ${minutes}`;

//feature 2- homework week 4

//bonus feature- homework week 4

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);

//homework week 5- Your task
function showTemperature(response) {
  let temperature = document.querySelector("#temperature");
  let temperatureRound = Math.round(response.data.main.temp);
  temperature.innerHTML = temperatureRound;
  console.log(response);

  let humidity = document.querySelector("#humidity");
  let humidityRound = Math.round(response.data.main.humidity);
  humidity.innerHTML = ` Humidity: ${humidityRound} %`;

  let wind = document.querySelector("#wind");
  let windRound = Math.round(response.data.wind.speed);
  wind.innerHTML = ` Wind: ${windRound} km/h`;
}

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

//homework week 5- Bonus point

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
}

function showCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(clickCurrentButton);
}
let currentCity = document.querySelector("#current-button");
currentCity.addEventListener("click", showCity); 

