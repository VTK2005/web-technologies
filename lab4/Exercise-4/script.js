const cityInput = document.getElementById("city");
const btn = document.getElementById("btn");
const loader = document.getElementById("loader");
const errorMsg = document.getElementById("errorMsg");
const weatherCard = document.getElementById("weatherCard");

const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const condition = document.getElementById("condition");

let cache = {}; // caching last searched city result

async function fetchWeather(city) {
  const apiKey = "ce8b52967b6abfb3df9430307a37200b"; // Replace with your OpenWeather API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  loader.classList.remove("hidden");
  weatherCard.classList.add("hidden");
  errorMsg.textContent = "";

  try {
    if (cache[city.toLowerCase()]) {
      displayWeather(cache[city.toLowerCase()]);
      loader.classList.add("hidden");
      return;
    }

    const res = await fetch(url);

    if (res.status === 404) {
      errorMsg.textContent = "❌ City not found!";
      loader.classList.add("hidden");
      return;
    }

    if (!res.ok) {
      errorMsg.textContent = "⚠️ Server error occurred!";
      loader.classList.add("hidden");
      return;
    }

    const data = await res.json();

    cache[city.toLowerCase()] = data; // store in cache
    displayWeather(data);

  } catch (err) {
    errorMsg.textContent = "⚠️ Network error! Please try again.";
  } finally {
    loader.classList.add("hidden");
  }
}
const res = await fetch(url);

console.log("Response Status:", res.status);

const data = await res.json();
console.log("API Response Data:", data);

if (data.cod !== 200) {
  errorMsg.textContent = data.message;
  return;
}

cache[city.toLowerCase()] = data;
displayWeather(data);
  
function displayWeather(data) {
  cityName.textContent = data.name;
  temp.textContent = data.main.temp;
  humidity.textContent = data.main.humidity;
  condition.textContent = data.weather[0].main;

  weatherCard.classList.remove("hidden");
}

btn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (city === "") {
    errorMsg.textContent = "⚠️ Please enter a city name!";
    return;
  }

  fetchWeather(city);
});
