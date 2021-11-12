const url="https://api.openweathermap.org/"
const apiKey="6d4fc80269858a6fe681da83b4e07c54"
const weekDataUrl="data/2.5/onecall?"
const geoUrl="geo/1.0/direct?"
function generateWeeklyResponse(lat,lon){
    return `${url}${weekDataUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&lang=ru`
}
function generateGeoResponse(city){
    return `${url}${geoUrl}q=${city}&&appid=${apiKey}`
}
export default {generateWeeklyResponse, generateGeoResponse}