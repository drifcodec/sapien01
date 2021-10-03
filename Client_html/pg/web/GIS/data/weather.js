var weather_list = [];
var cities = ['lubumbashi', 'lusaka', 'nelspruit', 'polokwane', 'kinshasa', 'pretoria', 'johannesburg', 'cape town', 'durban', 'maputo', 'mossel bay'];

function load_wearther() {
    for (i = 0; i < cities.length; i++) {
        var city = cities[i];
        axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=847dd7d4f3281970db62a2928b0be868', {
                headers: {
                    'Content-Type': 'json'
                }
            })
            .then(response => {
                weather_data = {};
                city_name = response.data.name
                icon = response.data.weather[0].icon
                status = response.data.weather[0].main
                description = response.data.weather[0].description
                weather_data.id = '.'
                weather_data.type = 'weather'
                weather_data.coords = { lat: response.data.coord.lat, lng: response.data.coord.lon }
                weather_data.content = `<h5>City: ${city_name}</h5>
                               <h5>Status: ${status}</h5>
                               <h5>Desc: ${description}</h5>`
                weather_data.iconImage = `icons_maps/weather/weather_${icon}.png`
                weather_list.push(weather_data)

            })
            .catch(error => console.error(error));
    }
};

load_wearther()
    /* 
    setInterval(function() {
        load_wearther()
        console.log("weather call made")
    }, weather_count) */