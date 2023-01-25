const c = console.log

async function getData(url){
    const response = await fetch(url);
    const data = await response.json()
    return data
}

function getLocation(city, country, state){

    const url = `https://api.weatherapi.com/v1/current.json?key=878f515b0dee4c9b8b3185638231701&q=${country}, ${state}, ${city}&aqi=no`

    getData(url).then((value) => {
        addValues(value)
        addBackground(value)
    })
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        var url = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + lat + "&lon=" + lng;

        fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                var country = data.address.country;
                var state = data.address.state;
                var city = data.address.town || data.address.city;
                // console.log("Country: " + country + ", State: " + state + ", City: " + city);

                getLocation(city, country, state)
                insertLocation(city)
            });
    });
} else {
    alert("Geolocation is not supported by this browser.");
}

function insertLocation(loc){
    const input = document.getElementById("location-id")
    input.value += loc
}

function addValues(value){
    const celsi = document.querySelector('.temp_c')
    const feih  = document.querySelector('.temp_f')
    const humid = document.querySelector('.humi')
    const current = value.current

    var tempC       = document.createElement('h4')
    var tempF       = document.createElement('h4')
    var humidity    = document.createElement('h4')

    tempC.innerHTML = current.temp_c
    tempF.innerHTML = current.temp_f
    humidity.innerHTML = current.humidity

    celsi.appendChild(tempC)
    feih.appendChild(tempF)
    humid.appendChild(humidity)
}

function addBackground(val){
    const weather = {
        partlyCloud : 'https://images.pexels.com/photos/414659/pexels-photo-414659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        clear: 'https://images.pexels.com/photos/296234/pexels-photo-296234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        cloudy: 'https://images.pexels.com/photos/414659/pexels-photo-414659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        overcast: 'https://i.pinimg.com/564x/ef/d5/9f/efd59faf3143484ed8687e131f079df0.jpg',
        mist: 'https://i.pinimg.com/564x/ea/38/9e/ea389e33117550f19be7e3606f86398a.jpg',
        rain: 'https://hips.hearstapps.com/hmg-prod/images/its-raining-heavily-wearing-an-umbrella-during-the-royalty-free-image-1660153348.jpg',
        heavyRain: 'https://s7d2.scene7.com/is/image/TWCNews/heavy_rain_jpg-11'
    }


    const container = document.querySelector('.image')
    var condition   = val.current.condition.code
    var bg          = 'https://images.pexels.com/photos/296234/pexels-photo-296234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

    switch(condition){
        case 1003:
            bg = weather.partlyCloud; 
        break;
        case 1000:
            bg = weather.clear;
        break;

        case 1006: bg = weather.cloudy; break;
        case 1009: bg = weather.overcast; break;
        case 1030: bg = weather.mist; break;
        case 1180: bg = weather.rain; break;
        case 1183: bg = weather.rain; break;
        case 1186: bg = weather.rain; break;
        case 1189: bg = weather.heavyRain; break;
        case 1192: bg = weather.heavyRain; break; 
        case 1195: bg = weather.heavyRain; break;

        default :'https://images.pexels.com/photos/296234/pexels-photo-296234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    }

    container.style.backgroundImage = `url(${bg})`

    c(container)
    c(val)
    c(condition)

    addCondition(val.current.condition.text)
}

function addCondition(con){
    const place = document.querySelector('.condition')

    place.innerHTML = con
}
