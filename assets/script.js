function weatherInfo() {
  let cityName = $("#cityValue").val()
  let apiKey = "6c5b1d4ebd6321ec8c97f9ecea056e02";
  let queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    apiKey;

  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
      //Name of city 
      let cityName = (response.name)
      console.log(cityName)
      $("#currentCity").text(cityName)
    //Current temperature converted from Kelvis to Fahrenheit
    let currentTemp = Math.round(1.8 * (response.main.temp - 273) + 32);
    console.log(currentTemp + "F");
    $("#currentTemp").text("Temperature: " + currentTemp + "F")

    //Current Humidity
    let currentHumidity = response.main.humidity;
    console.log(currentHumidity);
    $("#currentHumid").text("Humidity: " + currentHumidity + "%")

    //Current Wind Speed  //mesasured in unit
    let currentWindSpeed = Math.floor(response.wind.speed * 2.2369);
    console.log(currentWindSpeed + " mph");
    $("#currentWind").text("Wind Speed: " + currentWindSpeed + "mph")

//longitude and latitude
    let long = (response.coord.lon)
    let lat = (response.coord.lat)
    console.log(long + "long")
    console.log(lat + "lat")

   //UV Ray Index
   urlForUV = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&appid=6c5b1d4ebd6321ec8c97f9ecea056e02"
    $.ajax({
        url: urlForUV,
        method: "GET",
    }).then(function (uvIndex) {
   let currentUVIndex = Math.round(uvIndex.value) 
        $("#currentUV").text("UV Index: " + currentUVIndex)
})
  });
}
  


$("#searchBtn").on("click", weatherInfo);





// function weatherInfoApi() {


// let queryUrl = "http://api.weatherapi.com/v1/current.json?key=09d44509473c4934b0d141746200711LIVE&q=London"

// $.ajax({
//     url: queryUrl,
//     method: "GET",
// }).then(function (response) {
//     console.log(response)



// })}

// $("#searchBtn").on("click", weatherInfoApi);
