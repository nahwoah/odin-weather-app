"use strict";
import "./style.css";
import cloudy from "./icons/partial-sun.png"
import rain from "./icons/rain.png"
import sunny from "./icons/sun.png"
import night from "./icons/night.png"
import cloudyNight from "./icons/partial-night.png"

const submit = document.querySelector("#submit");
const changeFormat = document.querySelector(".changeFormat");
const location = document.querySelector("#location");
const dateFrom = document.querySelector("#date-from");
const dateTo = document.querySelector("#date-to");
const condo = document.querySelector(".conditions");
const main = document.querySelector(".main");

let weather = null;
let format = "F";

async function getWeather(url) {
  try {
    const response = await fetch(url);
    // const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london/2026-09-21/2026-09-22?key=S6U4DB6HQPTK6HVPCERJVCRLQ");
    //   ("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]/[date1]/[date2]?key=YOUR_API_KEY")
    weather = await response.json();
    return weather;
  } catch (error) {
    console.error(error);
  }
}

changeFormat.addEventListener("click", function () {
  if (weather){
    const temps = document.querySelectorAll(".temperature")
    const tempsList = document.getElementsByClassName("temperature");
    console.log(tempsList)
    console.log(temps)
    temps.forEach(element => {
      console.log(element)
    });
  }


  if (format === "F") {
    // temperature.textContent = ((day.temp - 32)/1.8) + "C"
    format = "C"
  } else {
    // temperature.textContent = day.temp + "F"
    format = "F"
  }
})

// getWeather()

function drawConditions(weather) {
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

function drawDays(weather) {
  const days = weather.days
  for (const day of days) {
    const dayContainer = document.createElement("div")
    dayContainer.classList = "dayContainer"
    const dayTitle = document.createElement("p");
    dayTitle.classList = "title"
    const dateObj = new Date(day.datetime);
    const icon = document.createElement("img");
    const longDate = dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    dayTitle.textContent = longDate

    // const datetimeLabel = document.createElement("span");
    // datetimeLabel.textContent = "datetime: "
    // const dt = document.createElement("span");

    switch (day.icon) {
      case "clear-day":
        icon.src = sunny;
      case "clear-night":
        icon.src = night;
      case "partly-cloudy-day":
        icon.src = cloudy;
      case "partly-cloudy-night":
        icon.src = cloudyNight;
      case "rain":
        icon.src = rain;
    }

    // dt.textContent = day.datetime + " ";
    // dt.appendChild(icon)
    // datetimeLabel.appendChild(dt)



    const tempLabel = document.createElement("span");
    const temperature = document.createElement("span");
    temperature.classList.add("temperature");
    temperature.textContent = day.temp
    tempLabel.textContent = "Temperature: "
    tempLabel.appendChild(temperature)

    tempLabel.textContent += "F"



    const humidityLabel = document.createElement("span");
    const humidity = document.createElement("span");
    humidity.textContent = day.humidity
    humidityLabel.textContent = "Humidity: ";
    humidityLabel.appendChild(humidity);
    humidityLabel.textContent += "%"

    dayContainer.append(dayTitle, icon, tempLabel, humidityLabel)
    main.append(dayContainer)
  }
}

submit.addEventListener("click", async function (event) {
  event.preventDefault()
  const location_value = location.value
  const dateFrom_value = dateFrom.value
  const dateTo_value = dateTo.value
  let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location_value}/${dateFrom_value}/${dateTo_value}?key=S6U4DB6HQPTK6HVPCERJVCRLQ`
  weather = await getWeather(url)
  drawConditions(weather)
  drawDays(weather)
})



// console.log("hello")
