function currentWeatherInfo() {
  let cityName = $("#cityValue").val();
  let apiKey = "6c5b1d4ebd6321ec8c97f9ecea056e02";
  let queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=imperial&appid=" +
    apiKey;
console.log(queryUrl)
  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    //Name of city
    let cityName = response.name;
    // console.log(cityName);
    $("#currentCity").text(cityName);
    //Current temperature
    let currentTemp = Math.round(response.main.temp);
    // console.log(currentTemp + "F");
    $("#currentTemp").text("Temperature: " + currentTemp + "F");

    //Current Humidity
    let currentHumidity = response.main.humidity;
    // console.log(currentHumidity);
    $("#currentHumid").text("Humidity: " + currentHumidity + "%");

    //Current Wind Speed  //mesasured in unit
    let currentWindSpeed = Math.floor(response.wind.speed * 2.2369);
    // console.log(currentWindSpeed + " mph");
    $("#currentWind").text("Wind Speed: " + currentWindSpeed + "mph");

    //longitude and latitude
    let long = response.coord.lon;
    let lat = response.coord.lat;
    
    // console.log(long + "long");
    // console.log(lat + "lat");

    //UV Ray Index
    urlForUV =
      "https://api.openweathermap.org/data/2.5/uvi?lat=" +
      lat +
      "&lon=" +
      long +
      "&units=imperial&appid=6c5b1d4ebd6321ec8c97f9ecea056e02";
    $.ajax({
      url: urlForUV,
      method: "GET",
    }).then(function (uvIndex) {
      let currentUVIndex = Math.round(uvIndex.value);
      $("#currentUV").text("UV Index: " + currentUVIndex);

   
    });


    let forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=current,minutely,hourly,&cnt=6&units=imperial&appid=6c5b1d4ebd6321ec8c97f9ecea056e02"
 $.ajax({
   url: forecastUrl,
   method: "GET",
 }).then( function(forecast) {
   console.log(forecast)
   for(let i = 0; i < 7; i++) {
    let forecastTemp = forecast.daily[i].temp.day
    console.log(forecastTemp + "F")
    let forecastHumid = parseInt(forecast.daily[i].wind_speed)
    console.log(forecastHumid + "mph")
    


    }
  
 })

    });

  
 

}
//i guess this one...




// function forecastWeather() {
//   let cityName2 = $("#cityValue").val();

//   let apiKey = "6c5b1d4ebd6321ec8c97f9ecea056e02";
//   let queryUrl =
//     "http://api.openweathermap.org/data/2.5/forecast?q=" +
//     cityName2 +
//     "&units=imperial&appid=" +
//     apiKey;


//     console.log(queryUrl)


// }
$("#searchBtn").on("click", currentWeatherInfo);
// $("#searchBtn").on("click", forecastWeather);


// $("#searchBtn").on("click", function hello() {;
// let city = $("#cityValue").val()
// console.log(city + "bitch")  })
