const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '3b7415200amsh34b325e5077b472p12768djsnbff6fbf09ea3',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};

request = document.getElementById('request');
cityName = document.getElementById('cityName')
loader = document.getElementById('loader');
warn = document.getElementById('warning');
data = document.getElementById('data');
mainContent = document.getElementById('mainContent');
rturn = document.getElementById('return');

let showLoader = () => {
    loader.classList.remove('hidden');
}

let hideLoader = () => {
    loader.classList.add('hidden');
}

let showData = () => {
    data.classList.remove('hidden');
    data.classList.add('flex');
    mainContent.classList.remove('flex');
    mainContent.classList.add('hidden');
    console.log(weatherData.temp);
    document.getElementById('cityData').innerText = city;
    document.getElementById('temp').innerHTML = `${weatherData.temp}<sup>o</sup>C`;
    document.getElementById('humid').innerHTML = `${weatherData.humidity}%`;
    document.getElementById('feel').innerHTML = `${weatherData.feels_like}<sup>o</sup>C`;
}

let showMainContent = () => {
    data.classList.add('hidden');
    data.classList.remove('flex');
    mainContent.classList.add('flex');
    mainContent.classList.remove('hidden');
    cityName.value = ''
}

const warning = () => {
    warn.classList.remove('hidden');
}

const success = () => {
    document.getElementById('success').classList.remove('hidden');
}

const hideWarning = () => {
    warn.classList.add('hidden');
    document.getElementById('success').classList.add('hidden');
}


let requestCityData = (city) => {
    fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city, options)
        .then(response => response.json())
        .then(response => {
            weatherData = response;
            console.log(weatherData);
            //if the api gives a variable temp then the city exists 
            if (response.temp != null) {
                showData();//so the data will be shown to user
            }
            //if the city name is bogus, the api will respond with error 'an unexpected error occured.'
            else if (response.error == 'An unexpected error occured.') {
                warning();//if city name is bogus, warning flag will be set to enter a valid city name
            }
            else {//this is the case for when api is not responding
                document.getElementById('warning').innerText = "API Unreachable";
            };
            hideLoader();
        })
        .catch(err => {
            console.error(err);
            hideLoader();
            warning();
        });
}

let noteCity = () => {
    city = cityName.value;
    city = city.charAt(0).toUpperCase() + city.slice(1);
    console.log(city);
    showLoader();
    hideWarning();
    requestCityData(city);
    // hideLoader();
}



request.addEventListener('click', noteCity);
rturn.addEventListener('click', showMainContent);