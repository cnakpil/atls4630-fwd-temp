// pull weather data from OpenWeatherMap API and insert the values into the weather widget
function weather() {
  //get the user's geolocation using geolocation API
  //geolocation code from MDN Web Docs: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
  var options = {
    enableHighAccuracy: true,
    // timeout: 5000,
  };

  function success(pos) {
    var crd = pos.coords;
    let latitude = crd.latitude;
    let longitude = crd.longitude;
    // get weather based on user's lat/lon
    console.log(latitude + ", " + longitude);
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

        // change top text depending on pop value
        // learning arrow function syntax

        // normal function version
        function textSwap(test) {
          // if (test === 8) {return "images/there-is-an.svg"}
          // else if (test === 11) {return "images/there-is-an.svg"}
          // else if (80 <= test < 90) {return "images/there-is-an.svg"}
          // else {return "images/there-is.svg"};
          if((test != 8) && (test != 11) && ((test < 80)||(test => 90))){
            console.log("not vowel")
            return "images/there-is.svg";
          } else{
            console.log("vowel")
            return "images/there-is-an.svg"
          }
        }

        // arrow function version
        // const textSwap = (test) => {
        //   return (test === 8) ? "images/there-is-an.svg"
        //     : (test === 11) ? "images/there-is-an.svg"
        //     : (80 <= test < 90) ? "images/there-is-an.svg"
        //     : "images/there-is.svg";
        // };

        // save top-text information
        let whichText = textSwap(pop);
        console.log(whichText);
        let topText = document.getElementById("top-text");

        // set html elements to new values
        document.getElementById("icon").src = icon;
        document.getElementById("percent").innerHTML = `${pop}%`;
        topText.src = whichText;
      })
      .catch(() => {
        // on error, print msg to console
        console.log("ajax error");
      });
  }
  // run geolocation
  navigator.geolocation.getCurrentPosition(success, error, options);
}

// run weather function every 5 minutes after initial run, default to fahrenheit
weather();
setInterval(weather, 300000);
