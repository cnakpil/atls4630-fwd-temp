// pull weather data from OpenWeatherMap API and insert the values into the weather widget
function weather() {
  //get the user's geolocation using geolocation API
  //geolocation code from MDN Web Docs: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
  };

  function success(pos) {
    var crd = pos.coords;
    let latitude = crd.latitude;
    let longitude = crd.longitude;
    // get weather based on user's lat/lon
    getWeather(latitude, longitude);
  }

  function error(err) {
    //note: `` creates a template literal. can use the ${} form of embedding code in strings this way
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  //weather API AJAX call
  function getWeather(lat, lon) {
    const apiKey = "ca43d7e77aea23aaed476c34dbc2f17d";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    // ajax fetch request
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // do stuff with the data - get data needed and input into html
        // document.getElementById("temp").innerHTML = Math.round(data.main.temp);
        // document.getElementById("humidity").innerHTML = data.main.humidity;
        // document.getElementById("wind").innerHTML = data.wind.speed;
        // document.getElementById("wthr").innerHTML = data.weather[0].description;
        // choose icon set to use based on which stylesheet is active
        // all icons by P Thanga Vignesh from the Noun Project
        // const themeStyle = theme.getAttribute("href");
        let icon = "";
        icon = `images/icons/${data.weather[0]["icon"]}.svg`;
        console.log(icon);
        // if (themeStyle == "light_theme.css")
        //   icon = `assets/lightWeatherIcons/${data.weather[0]["icon"]}.svg`;
        // if (themeStyle == "dark_theme.css")
        //   icon = `assets/darkWeatherIcons/${data.weather[0]["icon"]}.svg`;
        document.getElementById("icon").src = icon;
      })
      .catch(() => {
        // on error, print msg to console
        console.log("ajax error");
      });
  }
  // run geolocation
  navigator.geolocation.getCurrentPosition(success, error, options);
}

// run weather function every 10 minutes after initial run, default to fahrenheit
weather();
setInterval(weather, 600000);
