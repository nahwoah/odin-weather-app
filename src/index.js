"use strict";
import "./style.css";

const submit = document.querySelector("#submit");
const location = document.querySelector("#location");
const dateFrom = document.querySelector("#date-from");
const dateTo = document.querySelector("#date-to");
const condo = document.querySelector(".conditions")


async function getWeather(url) {
  try {
    const response = await fetch(url);
    // const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london/2026-09-21/2026-09-22?key=S6U4DB6HQPTK6HVPCERJVCRLQ");
    //   ("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]/[date1]/[date2]?key=YOUR_API_KEY")
    const weather = await response.json();
    console.log(weather);
    return weather;
  } catch (error) {
    console.error(error);
  }
}

// getWeather()

function drawConditions(weather){
  console.log(weather, "drawCondo")
  const conditions = weather.currentConditions


  const datetimeLabel = document.createElement("span");
  datetimeLabel.textContent = "datetime: "
  const dt = document.createElement("span");
  dt.textContent = conditions.datetime
  datetimeLabel.appendChild(dt)

  const tempLabel = document.createElement("span");
  const temperature = document.createElement("span");
  temperature.textContent = conditions.temp
  tempLabel.textContent = "Temperature: "
  tempLabel.appendChild(temperature)

  const humidityLabel = document.createElement("span");
  const humidity = document.createElement("span");
  humidity.textContent = conditions.humidity
  humidityLabel.textContent = "Humidity: "
  humidityLabel.appendChild(humidity)

  condo.append(datetimeLabel, tempLabel, humidityLabel)
}

submit.addEventListener("click", async function (event) {
  event.preventDefault()
  const location_value = location.value
  const dateFrom_value = dateFrom.value
  const dateTo_value = dateTo.value
  let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location_value}/${dateFrom_value}/${dateTo_value}?key=S6U4DB6HQPTK6HVPCERJVCRLQ`
  const weather = await getWeather(url)
  drawConditions(weather)
})

// console.log("hello")
