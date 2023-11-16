const apiKey = "7732de9b6ea843cb8ef00214231311"
const apiUrl = "https://api.weatherapi.com/v1/current.json?q="

const searchInput = document.querySelector('.search input')
const searchBtn = document.querySelector('.search button')

const errorTag = document.querySelector('.error')
const weather = document.querySelector('.weather')
const weatherIcon = document.querySelector('.weather-icon')

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&key=${apiKey}`)
    const data = await response.json()
    console.log(data)
    if(response.ok === false) {
        errorTag.style.display = 'block'
        weather.style.display = 'none'
    } else {
        selectAndInnerHTML('.city', data.location.name)
        selectAndInnerHTML('.humidity', data.current.humidity + "%")
        selectAndInnerHTML('.wind', data.current.wind_mph + " Mph")
        selectAndInnerHTML('.temperature', Math.round(data.current.temp_c) + "°C")
        weather.style.display = 'block'
        errorTag.style.display = 'none'

        if(data.current.condition.text === 'Clear') {
            weatherIcon.src = 'images/clear.png'
        }
        else if(data.current.condition.text === 'Overcast') {
            weatherIcon.src = 'images/clouds.png'
        }
        else if(data.current.condition.text === 'Patchy rain possible') {
            weatherIcon.src = 'images/rain.png'
        }
        else if(data.current.condition.text === 'Mist') {
            weatherIcon.src = 'images/mist.png'
        }
        else if(data.current.condition.text === 'Light drizzle') {
            weatherIcon.src = 'images/drizzle.png'
        }
        else if(data.current.condition.text === 'Snow') {
            weatherIcon.src = 'images/snow.png'
        }

    }

}
searchBtn.addEventListener('click', () => {
    const city = searchInput.value
    checkWeather(city)
    searchInput.value = ''
})

/**
 * 
 * @param {string} selectTag 
 * @param {string} innerHTML 
 */
function selectAndInnerHTML(selectTag, innerHTML) {
    document.querySelector(selectTag).innerHTML = innerHTML
}
