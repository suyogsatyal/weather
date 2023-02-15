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

let showLoader = () =>{
    loader.classList.remove('hidden');
}

let hideLoader = () =>{
    loader.classList.add('hidden');
}

const warning = () =>{
    warn.classList.remove('hidden');
}

const hideWarning = () =>{
    warn.classList.add('hidden');
}

let requestCityData = (city) =>{
    fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city='+city, options)
    .then(response => response.json())
	.then(response => {
        console.log(response);
        if(response.error != null){
            warning();
        }
        hideLoader();
    })
	.catch(err => {
        console.error(err);
        hideLoader();
        warning();
    });
}

let noteCity = () =>{
    city = cityName.value;
    console.log(city);
    showLoader();
    hideWarning();
    requestCityData(city);
    // hideLoader();
}



request.addEventListener('click', noteCity);