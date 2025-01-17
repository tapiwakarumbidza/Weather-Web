// Cities Database with Country Grouping
const cities = [
    {lat: 52.367, lon: 4.904, name: "Amsterdam", country: "Netherlands"},
    {lat: 39.933, lon: 32.859, name: "Ankara", country: "Turkey"},
    {lat: 56.134, lon: 12.945, name: "Åstorp", country: "Sweden"},
    {lat: 37.983, lon: 23.727, name: "Athens", country: "Greece"},
    {lat: 54.597, lon: -5.930, name: "Belfast", country: "Northern Ireland"},
    {lat: 41.387, lon: 2.168, name: "Barcelona", country: "Spain"},
    {lat: 52.520, lon: 13.405, name: "Berlin", country: "Germany"},
    {lat: 46.948, lon: 7.447, name: "Bern", country: "Switzerland"},
    {lat: 43.263, lon: -2.935, name: "Bilbao", country: "Spain"},
    {lat: 50.847, lon: 4.357, name: "Brussels", country: "Belgium"},
    {lat: 47.497, lon: 19.040, name: "Bucharest", country: "Romania"},
    {lat: 59.329, lon: 18.068, name: "Budapest", country: "Hungary"},
    {lat: 51.483, lon: -3.168, name: "Cardiff", country: "Wales"},
    {lat: 50.937, lon: 6.96, name: "Cologne", country: "Germany"},
    {lat: 55.676, lon: 12.568, name: "Copenhagen", country: "Denmark"},
    {lat: 51.898, lon: -8.475, name: "Cork", country: "Ireland"},
    {lat: 53.349, lon: -6.260, name: "Dublin", country: "Ireland"},
    {lat: 55.953, lon: -3.188, name: "Edinburgh", country: "Scotland"},
    {lat: 43.7696, lon: 11.255, name: "Florence", country: "Italy"},
    {lat: 50.110, lon: 8.682, name: "Frankfurt", country: "Germany"},
    {lat: 43.254, lon: 6.637, name: "French Riviera", country: "France"},
    {lat: 32.650, lon: -16.908, name: "Funchal", country: "Portugal"},
    {lat: 36.140, lon: -5.353, name: "Gibraltar", country: "Gibraltar"},
    {lat: 57.708, lon: 11.974, name: "Gothenburg", country: "Sweden"},
    {lat: 53.548, lon: 9.987, name: "Hamburg", country: "Germany"},
    {lat: 60.169, lon: 24.938, name: "Helsinki", country: "Finland"},
    {lat: 39.020, lon: 1.482, name: "Ibiza", country: "Spain"},
    {lat: 50.450, lon: 30.523, name: "Kyiv", country: "Ukraine"},
    {lat: 61.115, lon: 10.466, name: "Lillehammer", country: "Norway"},
    {lat: 38.722, lon: -9.139, name: "Lisbon", country: "Portugal"},
    {lat: 51.507, lon: -0.127, name: "London", country: "England"},
    {lat: 40.416, lon: -3.703, name: "Madrid", country: "Spain"},
    {lat: 39.695, lon: 3.017, name: "Mallorca", country: "Spain"},
    {lat: 53.480, lon: -2.242, name: "Manchester", country: "England"},
    {lat: 43.296, lon: 5.369, name: "Marseille", country: "France"},
    {lat: 27.760, lon: -15.586, name: "Maspalomas", country: "Spain"},
    {lat: 45.464, lon: 9.190, name: "Milan", country: "Italy"},
    {lat: 48.135, lon: 11.582, name: "Munich", country: "Germany"},
    {lat: 40.851, lon: 14.268, name: "Naples", country: "Italy"},
    {lat: 43.034, lon: -2.417, name: "Oñati", country: "Spain"},
    {lat: 59.913, lon: 10.752, name: "Oslo", country: "Norway"},
    {lat: 48.856, lon: 2.352, name: "Paris", country: "France"},
    {lat: 50.075, lon: 14.437, name: "Prague", country: "Czech Republic"},
    {lat: 64.146, lon: -21.942, name: "Reykjavík", country: "Iceland"},
    {lat: 56.879, lon: 24.603, name: "Riga", country: "Latvia"},
    {lat: 41.902, lon: 12.496, name: "Rome", country: "Italy"},
    {lat: 39.453, lon: -31.127, name: "Santa Cruz das Flores", country: "Portugal"},
    {lat: 28.463, lon: -16.251, name: "Santa Cruz de Tenerife", country: "Spain"},
    {lat: 57.273, lon: -6.215, name: "Skye", country: "Scotland"},
    {lat: 42.697, lon: 23.321, name: "Sofia", country: "Bulgaria"},
    {lat: 59.329, lon: 18.068, name: "Stockholm", country: "Sweden"},
    {lat: 59.437, lon: 24.753, name: "Tallinn", country: "Estonia"},
    {lat: 18.208, lon: 16.373, name: "Vienna", country: "Austria"},
    {lat: 52.229, lon: 21.012, name: "Warsaw", country: "Poland"},
    {lat: 53.961, lon: -1.07, name: "York", country: "England"},
    {lat: 47.376, lon: 8.541, name: "Zurich", country: "Switzerland"}
];

// DOM Elements
const citySelect = document.getElementById('citySelect');
const getWeatherButton = document.getElementById('getWeather');
const forecastCards = document.getElementById('forecastCards');
const loader = document.getElementById('loader');
const weatherGraphic = document.querySelector('.weather-graphic');
const selectedCityElement = document.getElementById('selectedCity');

// Populate City Dropdown with Country Groups
function populateCityDropdown() {
    // Group cities by country
    const cityGroups = cities.reduce((groups, city) => {
        if (!groups[city.country]) {
            groups[city.country] = [];
        }
        groups[city.country].push(city);
        return groups;
    }, {});

    // Sort countries alphabetically
    const sortedCountries = Object.keys(cityGroups).sort();

    // Clear existing options
    citySelect.innerHTML = '<option value="">Select a city</option>';

    // Create option groups for each country
    sortedCountries.forEach(country => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = country;

        // Sort cities within each country
        cityGroups[country]
            .sort((a, b) => a.name.localeCompare(b.name))
            .forEach(city => {
                const option = document.createElement('option');
                option.value = `${city.lat},${city.lon}`;
                option.textContent = city.name;
                optgroup.appendChild(option);
            });

        citySelect.appendChild(optgroup);
    });
}

// Weather mapping for icons
const weatherMapping = {
    'clearday': 'icons/clearday.png',  
    'pcloudyday': 'icons/pcloudyday.png',
    'mcloudyday': 'icons/mcloudyday.png',
    'cloudyday': 'icons/cloudyday.png',
    'humidday': 'icons/humidday.png',
    'lightrainday': 'icons/lightrainday.png',
    'oshowerday': 'icons/oshowerday.png',
    'ishowerday': 'icons/ishowerday.png',
    'lightsnowday': 'icons/lightsnowday.png',
    'rainday': 'icons/rainday.png',
    'snowday': 'icons/snowday.png',
    'rainsnowday': 'icons/rainsnowday.png',
    'tstormday': 'icons/tstormday.png',
    'tsrainday': 'icons/tsrainday.png',
    'windday': 'icons/windday.png',
};

// Utility Functions
const formatDate = (timepoint) => {
    const today = new Date();
    const date = new Date(today.getTime() + (timepoint * 3 * 60 * 60 * 1000));
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};
const createForecastCard = (data) => {
    const card = document.createElement('div');
    card.className = 'forecast-card';
    
    // Map the weather condition to icon name, use 'unknown.png' if no match
    const weatherType = weatherMapping[data.weather.toLowerCase()] || 'icons/unknown.png'; // Fallback to unknown.png
    
    card.innerHTML = `
        <div class="date">${formatDate(data.timepoint)}</div>
        <div class="weather-icon" data-weather="${weatherType}">
            <img src="${weatherType}" alt="${data.weather}" class="weather-icon-img">
        </div>
        <div class="temp">${data.temp2m}°C</div>
        <div class="weather-info">
            <div>Weather: ${data.weather}</div>
            <div>Wind: ${data.wind10m.speed} m/s</div>
            <div>Humidity: ${data.rh2m}%</div>
        </div>
    `;
    
    return card;
};



// Fetch and update weather functions
async function fetchWeatherData(lat, lon) {
    try {
        const response = await fetch(
            `http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civil&output=json`
        );
        if (!response.ok) throw new Error('Weather data not available');
        return await response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

function updateWeatherGraphic(lat, lon) {
    const graphicUrl = `http://www.7timer.info/bin/astro.php?lon=${lon}&lat=${lat}&ac=0&lang=en&unit=metric&output=internal&tzshift=0`;
    weatherGraphic.innerHTML = `<img src="${graphicUrl}" alt="Weather forecast graphic">`;
}

function updateWeatherDisplay(weatherData, cityName) {
    forecastCards.innerHTML = '';
    selectedCityElement.textContent = cityName;
    
    // Display daily forecasts (taking data points every 8 steps to get daily data)
    for (let i = 0; i < weatherData.dataseries.length; i += 8) {
        const forecastCard = createForecastCard(weatherData.dataseries[i]);
        forecastCards.appendChild(forecastCard);
    }
}

// Event handler for getting weather
async function handleGetWeather() {
    const selectedOption = citySelect.options[citySelect.selectedIndex];
    if (!selectedOption.value) {
        alert('Please select a city');
        return;
    }
    
    const [lat, lon] = selectedOption.value.split(',');
    const cityName = `${selectedOption.textContent}, ${selectedOption.parentElement.label}`;
    
    loader.style.display = 'block';
    forecastCards.innerHTML = '';
    
    try {
        updateWeatherGraphic(lat, lon);
        const weatherData = await fetchWeatherData(lat, lon);
        updateWeatherDisplay(weatherData, cityName);
    } catch (error) {
        forecastCards.innerHTML = `
            <div class="error-message">
                Failed to fetch weather data. Please try again later.
            </div>
        `;
    } finally {
        loader.style.display = 'none';
    }
}

// Event Listeners
getWeatherButton.addEventListener('click', handleGetWeather);

// Initialize
populateCityDropdown();