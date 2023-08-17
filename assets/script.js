const APIKey = "866c79c089aecc7b7bea15f60adf199c";
const cityName = document.getElementById('floatingText');
const searchBtn = document.getElementById('search-btn');
const clearBtn = document.getElementById('clear-btn');
const recentSearch = document.getElementById('recent-search');
const currentDay = document.getElementById('current-day');
const currentContainer = document.getElementById('current-container');
const forecastContainer = document.querySelector('.forecast-container');
const forecastTitle = document.getElementById('forecast-title');

const saveSearch = (event) => {
    event.preventDefault();
    const savedCities = localStorage.getItem('recentCities');
    let recentCities = [];
    if (savedCities) {
        recentCities = JSON.parse(savedCities);
    }
    if (cityName.value.trim() !== '' && !recentCities.includes(cityName.value)) {
        geocode(cityName.value).then (
            response => {
                if (!response) {
                    alert('Please enter a valid city');
                } else {
                    recentCities.push(cityName.value);
                    localStorage.setItem('recentCities', JSON.stringify(recentCities));
                    const recentCity = document.createElement('button');
                    recentCity.textContent = cityName.value;
                    recentCity.classList.add('btn', 'btn-secondary', 'd-block', 'w-100', 'my-3');
                    recentSearch.appendChild(recentCity);
                    recentCity.addEventListener('click', () => {
                        geocode(recentCity.textContent);
                    });
                    cityName.value = "";}
                    currentContainer.removeAttribute('hidden');
                    forecastTitle.removeAttribute('hidden');
            }
        )
    }
}

const geocode = (searchValue) => {
    return fetch (`https://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=${APIKey}`)
    .then(response => response.json())
    .then (data => {
        currentWeather(data[0].lat, data[0].lon);
        forecast(data[0].lat, data[0].lon);
        return data;
    })
    .catch((error) => {
        console.error('Error', error);
    });
}

const currentWeather = (lat, lon) => {
    fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`)
    .then(response => response.json())
    .then (data => {
        currentDay.innerHTML = '';
        let name = document.createElement('h3');
        name.textContent = data.name;
        let date = document.createElement('h3');
        date.textContent = '(' + new Date(data.dt * 1000).toLocaleDateString() + ')';
        let icon = document.createElement('img');
        icon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        icon.setAttribute('class', 'icon-size')
        let temp = document.createElement('p');
        temp.textContent = 'Temp: ' + data.main.temp + '°F';
        let wind = document.createElement('p');
        wind.textContent = 'Wind: ' + data.wind.speed + ' MPH';
        let humidity = document.createElement('p');
        humidity.textContent = 'Humidity: ' + data.main.humidity + '%';
        currentDay.append(name, date, icon, temp, wind, humidity);
    })
}

const forecast = (lat, lon) => {
    fetch (`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`)
    .then(response => response.json())
    .then (data => {
        forecastContainer.innerHTML = '';
        for (let i = 4; i < data.list.length; i = i+8) {
            let forecastCard = document.createElement('div'); 
            forecastCard.setAttribute('class', 'col-12 col-md-5 col-lg-3 col-xl-2 p-1 mb-2 ms-2 custom-card text-light')
            let date = document.createElement('h4');
            date.textContent = new Date(data.list[i].dt * 1000).toLocaleDateString();
            let icon = document.createElement('img');
            icon.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`);
            icon.setAttribute('class', 'icon-size')
            let temp = document.createElement('p');
            temp.textContent = 'Temp: ' + data.list[i].main.temp + '°F';
            let wind = document.createElement('p');
            wind.textContent = 'Wind: ' + data.list[i].wind.speed + ' MPH';
            let humidity = document.createElement('p');
            humidity.textContent = 'Humidity: ' + data.list[i].main.humidity + '%';
            forecastCard.append(date, icon, temp, wind, humidity);
            forecastContainer.append(forecastCard);
        }
    })
}

const displayRecentSearches = () => {
    recentSearch.innerHTML = '';
    const savedCities = localStorage.getItem('recentCities');
    if (!savedCities) {
        return;
    }
    const recentCities = JSON.parse(savedCities);
    recentCities.forEach(city => {
        const recentCity = document.createElement('button');
        recentCity.textContent = city;
        recentCity.classList.add('btn', 'btn-secondary', 'd-block', 'w-100', 'my-3');
        recentSearch.appendChild(recentCity);
        recentCity.addEventListener('click', () => {
            geocode(recentCity.textContent);
            currentContainer.removeAttribute('hidden');
            forecastTitle.removeAttribute('hidden');
        });
    });
}

const clearSearchHistory = () => {
    recentSearch.innerHTML = '';
    localStorage.removeItem('recentCities');
}

cityName.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        saveSearch(event);
    }
});

searchBtn.addEventListener('click', saveSearch);
clearBtn.addEventListener('click', clearSearchHistory);
displayRecentSearches();
