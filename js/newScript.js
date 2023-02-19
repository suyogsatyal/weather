const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '3b7415200amsh34b325e5077b472p12768djsnbff6fbf09ea3',
    'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
  }
};

const elements = {
  request: document.getElementById('request'),
  cityName: document.getElementById('cityName'),
  loader: document.getElementById('loader'),
  warn: document.getElementById('warning'),
  data: document.getElementById('data'),
  mainContent: document.getElementById('mainContent'),
  rturn: document.getElementById('return'),
  cityData: document.getElementById('cityData'),
  temp: document.getElementById('temp'),
  humid: document.getElementById('humid'),
  feel: document.getElementById('feel'),
  success: document.getElementById('success')
};

const showLoader = () => {
  elements.loader.classList.remove('hidden');
};

const hideLoader = () => {
  elements.loader.classList.add('hidden');
};

const showData = (weatherData, city) => {
  elements.data.classList.remove('hidden');
  elements.data.classList.add('flex');
  elements.mainContent.classList.remove('flex');
  elements.mainContent.classList.add('hidden');
  elements.cityData.innerText = city;
  elements.temp.innerHTML = `${weatherData?.temp}<sup>o</sup>C`;
  elements.humid.innerHTML = `${weatherData?.humidity}%`;
  elements.feel.innerHTML = `${weatherData?.feels_like}<sup>o</sup>C`;
};

const showMainContent = () => {
  elements.data.classList.add('hidden');
  elements.data.classList.remove('flex');
  elements.mainContent.classList.add('flex');
  elements.mainContent.classList.remove('hidden');
  elements.cityName.value = '';
};

const warning = () => {
  elements.warn.classList.remove('hidden');
};

const success = () => {
  elements.success.classList.remove('hidden');
};

const hideWarning = () => {
  elements.warn.classList.add('hidden');
  elements.success.classList.add('hidden');
};

const requestCityData = (city) => {
  fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`, options)
    .then(response => response.json())
    .then(response => {
      const weatherData = response;
      console.log(weatherData);
      if (weatherData?.temp != null) {
        showData(weatherData, city);
      } else if (weatherData?.error === 'An unexpected error occured.') {
        warning();
      } else {
        elements.warn.innerText = 'API Unreachable';
      }
      hideLoader();
    })
    .catch(err => {
      console.error(err);
      hideLoader();
      warning();
    });
};

const noteCity = () => {
  const city = elements.cityName.value;
  const formattedCity = city.charAt(0).toUpperCase() + city.slice(1);
  console.log(formattedCity);
  showLoader();
  hideWarning();
  requestCityData(formattedCity);
};

elements.request.addEventListener('click', noteCity);
elements.rturn.addEventListener('click', showMainContent);
