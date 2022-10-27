import apiKey from './config/key.js';

const input = document.querySelector('.input');
const searchButton = document.querySelector('.btn-search');
const main = document.querySelector('.output');
const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
let cityData;

async function getWeatherCity(city) {
    await fetch(url(city))
    .then(response => response.json())
    .then(data => {
        cityData = data;
        console.log(cityData);
    })
    .catch(err => console.log(err));

    setTimeout(function() {
        main.innerHTML = createOutput(cityData);
    }, 1000);
}

function createOutput(city) {
    let temperatureCelsius = convertTemperature(city.main.temp);

    let output = `<img class="icon" src="https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png"/>
                  <h2 class="temperature">${temperatureCelsius} °C</h2>
                  <small class="description">${city.weather[0].main}</small>`;

    return output;
}

function convertTemperature(temperatureKelvin) {
    return Math.floor(temperatureKelvin - 273.15);
}

searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    const city = input.value;

    if(city) {
        getWeatherCity(city);
    }
});