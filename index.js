const c = console.log

async function getData(url){
    const response = await fetch(url);
    const data = await response.json()
    return data
}

function getLocation(){
    var loc = document.getElementById('location-id')

    const url = `http://api.weatherapi.com/v1/current.json?key=878f515b0dee4c9b8b3185638231701&q=Brazil, Bahia, ${loc.value}&aqi=no`

    // Campo Alegre de Lourdes

    getData(url).then((value) => {
        c('work');
        c(value.current)
    })
}