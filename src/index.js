"use strict";
import "./style.css";
import cloudy from "./icons/partial-sun.png";
import rain from "./icons/rain.png";
import sunny from "./icons/sun.png";
import night from "./icons/night.png";
import cloudyNight from "./icons/partial-night.png";

const submit = document.querySelector("#submit");
const changeFormat = document.querySelector(".changeFormat");
const location = document.querySelector("#location");
const dateFrom = document.querySelector("#date-from");
const dateTo = document.querySelector("#date-to");
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
  if (weather) {
    const temps = document.querySelectorAll(".temperature");
    const tempSymolList = document.querySelectorAll(".tempsymbol");

    if (format === "F") {
      temps.forEach(element => {
        element.textContent = Math.round(((element.textContent - 32)/1.8) * 10) /10
      })
      tempSymolList.forEach((element) => {
        element.textContent = "C";
      });
      changeFormat.textContent = "Change to F"
      format = "C";
    } else {
      temps.forEach(element => {
        element.textContent = Math.round(((element.textContent * 1.8) + 32) * 10) /10
      })
      tempSymolList.forEach((element) => {
        element.textContent = "F";
      });
      changeFormat.textContent = "Change to C"
      format = "F";
    }
  }
});

// getWeather()

function drawConditions(weather) {
  const conditions = weather.currentConditions;

  const condo = document.createElement("div");
  condo.classList = "conditions";

  const title = document.createElement("span")
  title.textContent = "Current Conditions"
  title.classList = "title"

  const datetimeLabel = document.createElement("span");
  datetimeLabel.textContent = "Time: ";
  const dt = document.createElement("span");
  dt.textContent = conditions.datetime;
  datetimeLabel.appendChild(dt);

  const icon = document.createElement("img");
  switch (conditions.icon) {
    case "clear-day":
      icon.src = sunny;
      break;
    case "clear-night":
      icon.src = night;
      break;
    case "partly-cloudy-day":
      icon.src = cloudy;
      break;
    case "partly-cloudy-night":
      icon.src = cloudyNight;
      break;
    case "rain":
      icon.src = rain;
      break;
  }

  const tempLabel = document.createElement("span");
  const temperature = document.createElement("span");
  const tempSymbol = document.createElement("span");
  tempSymbol.classList = "tempsymbol";
  temperature.classList = "temperature";
  temperature.textContent = conditions.temp;
  tempLabel.textContent = "Temperature: ";
  tempSymbol.textContent = "F";
  tempLabel.appendChild(temperature);
  tempLabel.append(tempSymbol);

  const humidityLabel = document.createElement("span");
  const humidity = document.createElement("span");
  humidity.textContent = conditions.humidity;
  humidityLabel.textContent = "Humidity: ";
  humidityLabel.appendChild(humidity);

  main.appendChild(condo);

  condo.append(title, icon, datetimeLabel, tempLabel, humidityLabel);
}

function drawDays(weather) {
  const days = weather.days;
  for (const day of days) {
    const dayContainer = document.createElement("div");
    dayContainer.classList = "dayContainer";
    const dayTitle = document.createElement("p");
    dayTitle.classList = "title";
    const dateObj = new Date(day.datetime);
    const icon = document.createElement("img");
    const longDate = dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    dayTitle.textContent = longDate;

    switch (day.icon) {
      case "clear-day":
        icon.src = sunny;
        break;
      case "clear-night":
        icon.src = night;
        break;
      case "partly-cloudy-day":
        icon.src = cloudy;
        break;
      case "partly-cloudy-night":
        icon.src = cloudyNight;
        break;
      case "rain":
        icon.src = rain;
        break;
    }

    const tempLabel = document.createElement("span");
    const temperature = document.createElement("span");
    const tempSymbol = document.createElement("span");
    tempSymbol.classList = "tempsymbol";
    temperature.classList = "temperature";
    temperature.textContent = day.temp;
    tempLabel.textContent = "Temperature: ";
    tempSymbol.textContent = "F";

    tempLabel.appendChild(temperature);

    tempLabel.append(tempSymbol);

    const humidityLabel = document.createElement("span");
    const humidity = document.createElement("span");
    humidity.textContent = day.humidity;
    humidityLabel.textContent = "Humidity: ";
    humidityLabel.appendChild(humidity);
    humidityLabel.textContent += "%";

    dayContainer.append(dayTitle, icon, tempLabel, humidityLabel);
    main.append(dayContainer);
  }
}

submit.addEventListener("click", async function (event) {
  event.preventDefault();
  // throw new Error("SOURCE_MAP_TEST");

  main.replaceChildren();

  const location_value = location.value;
  const dateFrom_value = dateFrom.value;
  const dateTo_value = dateTo.value;
  let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location_value}/${dateFrom_value}/${dateTo_value}?key=S6U4DB6HQPTK6HVPCERJVCRLQ`;
  weather = await getWeather(url);
  if (weather.currentConditions){
    drawConditions(weather);
  }
  if (weather.days){
    drawDays(weather);
  }
});
