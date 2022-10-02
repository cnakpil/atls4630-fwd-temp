# APIs and JSON

## Assignment Goal

Create a webpage that uses the fetch API (built into the browser) to send requests any third party API, and display the JSON data that the third party API returns to you on the webpage in a creative fashion.

## Proposal

Make a weather app that takes inspiration from Karen, of the movie Mean Girls, using the Geolocation API and the OpenWeatherMap API. The app only shows two pieces of information: the precipitation probability
and the icon data that corresponds to the current weather conditions in the user's location.
API data is refreshed every 5 minutes and will display default data if users do not want to allow the app to access their location data.

### To-do

- [x] Code HTML and CSS
- [x] Geolocation API request
- [x] OpenWeatherAPI fetch request

### Stretch Goals

- [x] Update grammer to suit all possible precipitation percentages
- [ ] Change to a Geocode/GeoIP service instead of geolocation to get user location via IP without needing to request their location
- [ ] Improve mobile responsiveness

---

### Resources

- [MDN Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- [OpenWeatherMap Hourly Forecast API](https://openweathermap.org/api/hourly-forecast)
- [IP Geolocation API](https://ip-api.com/)
- [MDN Conditional Operator Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)
