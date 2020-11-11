function currentWeatherInfo() {
  let cityName = $("#cityValue").val();
  let apiKey = "6c5b1d4ebd6321ec8c97f9ecea056e02";
  let queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=imperial&appid=" +
    apiKey;
  console.log(queryUrl);
  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    //Name of city
    let cityName = response.name;
    // console.log(cityName);
    $("#currentCity").text(cityName);
    $("#currentCity").addClass("text-uppercase font-weight-bold");

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
      // Less than 2
      if (currentUVIndex <= 2) {
        $("#currentUV").addClass(
          "border border-success p-2 bg-success rounded"
        );
      }
      // Between 3 - 5
      else if (3 <= currentUVIndex <= 5) {
        $("#currentUV").addClass(
          "border border-warning p-1 bg-intense rounded"
        );
      }
      // 6 or 7
      else if (currentUVIndex == 6 || currentUVIndex == 7) {
        $("#currentUV").addClass("border border-danger p-1 bg-danger rounded");
      }
      //Greater than 7
      else if (currentUVIndex > 7) {
        $("#currentUV").addClass("p1 bg-intense rounded");
      }
    });

    //5 day forecast
    let forecastUrl =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      long +
      "&exclude=current,minutely,hourly,&cnt=6&units=imperial&appid=6c5b1d4ebd6321ec8c97f9ecea056e02";
    $.ajax({
      url: forecastUrl,
      method: "GET",
    }).then(function (forecast) {
      //console.log(forecast)
      for (let i = 0; i < 7; i++) {
        let forecastTemp = Math.round(forecast.daily[i].temp.day);
        let forecastHumid = parseInt(forecast.daily[i].wind_speed);
        $("#temp" + i).text("Temperature: " + forecastTemp + " F");
        $("#humid" + i).text("Humidity: " + forecastHumid + "%");
      }
    });
    //Time for forecase
    for (let i = 1; i < 6; i++) {
      let m = moment();
      m.add(i, "d");

      let format = m.format("MMM D");
      $("#day" + i).text(format);
    }
  });
}
$("#searchBtn").on("click", currentWeatherInfo);

//function of save button
/* save name from input and create a new button for the city, also once clicked it erases what is in the input, also when clicked it puts values in local storage and buttons get values */
$("#saveBtn").on("click", function () {
  //This empties input and adds a btn element to the page
  let cityNameValue = $("#cityValue").val();
  $("#cityValue").val(" ");
  //creating button with classes and ids
  $("ul").append(
    '<button class="btn btn-primary m-1" id=' +
      cityNameValue +
      ">" +
      cityNameValue +
      "</button>"
  );
  //Sets items to local storage

  localStorage.setItem("cityTemp1", $("#currentCity").text());
  localStorage.setItem("cityHumid1", $("#currentHumid").text());
  localStorage.setItem("cityWind1", $("#currentWind").text());
  localStorage.setItem("cityUV1", $("#currentUV").text());
  for (let i = 1; i <= 5; i++) {
    //Grabbing temp from forecast
    localStorage.setItem("cityForcastTemp" + i, $("#temp" + i).text());
  }
});
