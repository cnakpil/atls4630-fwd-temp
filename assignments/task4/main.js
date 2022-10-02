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
    const apiKey = "5fdc6a29c58d4a67b5b6e525703f0474";
    const url = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    // ajax fetch request
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // do stuff with the data - get data needed and input into html

        // get icon name
        let icon = "";
        icon = `images/icons/${data.list[0].weather[0]["icon"]}.svg`;
        console.log(icon);

        // get precipitation probability
        let pop = "";
        pop = data.list[0]["pop"] * 100;
        console.log(`${pop}%`);
        let test = 8;

        // change top text depending on pop value
        let topText = document.getElementById("top-text").src;
        test === 8
          ? (topText = "images/there-is-an.svg")
          : pop === 11
          ? (topText = "images/there-is-an.svg")
          : 80 <= pop < 90
          ? (topText = "images/there-is-an.svg")
          : (topText = "images/there-is.svg");

        // set html elements to new values
        document.getElementById("icon").src = icon;
        document.getElementById("percent").innerHTML = `${pop}%`;
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
