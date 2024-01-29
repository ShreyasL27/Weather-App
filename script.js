const weatherForm = document.querySelector(".weatherForm")
const cityName = document.querySelector(".cityName")
const card = document.querySelector(".card")
const apiKey = process.env.WEATHER_APP_API_KEY

weatherForm.addEventListener("submit", async event => {

    event.preventDefault()

    const city = cityName.value

    if (city) {
        try {
            const weatherData = await getWeatherData(city)
            displayWeatherInfo(weatherData)
        } 
        catch (error) {
            console.error(error)
            displayError(error)
        }
    }
    else {
        displayError("Please enter a valid city")
    }
})

async function getWeatherData(city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const response = await fetch(apiURL)
    // console.log(response)

    if (!response.ok) {
        throw new Error("Could not fetch weather data")
    }
    else {
        return await response.json()
    }
}

function displayWeatherInfo(data) {
    // console.log(data)
    const {name: city, main: {temp, humidity}, weather: [{description, id}]} = data
    
    card.textContent = ""
    card.style.display = "flex"

    const cityDisplay = document.createElement("h1")
    const tempDisplay = document.createElement("p")
    const humidityDisplay = document.createElement("p")
    const weatherType = document.createElement("p")
    const weatherEmoji = document.createElement("p")

    cityDisplay.textContent = city
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)} °C`
    humidityDisplay.textContent =`Humidity: ${humidity}%`
    weatherType.textContent = description
    weatherEmoji.textContent = getWeatherEmoji(id)

    cityDisplay.classList.add("cityDisplay")
    tempDisplay.classList.add("tempDisplay")
    humidityDisplay.classList.add("humidityDisplay")
    weatherType.classList.add("weatherType")
    weatherEmoji.classList.add("weatherEmoji")

    card.appendChild(cityDisplay)
    card.appendChild(tempDisplay)
    card.appendChild(humidityDisplay)
    card.appendChild(weatherType)
    card.appendChild(weatherEmoji)
}

function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return `⛈️`
        case (weatherId >= 300 && weatherId < 400):
            return `🌧️`
        case (weatherId >= 500 && weatherId < 600):
            return `🌧️`
        case (weatherId >= 600 && weatherId < 700):
            return `❄️`
        case (weatherId >= 700 && weatherId < 800):
            return `🌫️`
        case (weatherId === 800):
            return `🌞`  
        case (weatherId > 800 && weatherId < 810):
            return `☁️`
        default:
            return `❓`
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p")
    errorDisplay.textContent = message
    errorDisplay.classList.add("errorDisplay");

    card.textContent = ""
    card.style.display = "flex"
    card.appendChild(errorDisplay)
}