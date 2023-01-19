const c = console.log

const url = 'http://api.weatherapi.com/v1/current.json?key=878f515b0dee4c9b8b3185638231701&q=Brazil, Bahia, Campo alegre de Lourdes&aqi=no'

async function getData(){
    const response = await fetch(url);
    const data = await response.json()
    return data
}
getData().then((data) => c(data))