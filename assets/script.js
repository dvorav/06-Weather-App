function weatherInfo() {
  let cityName = "minneapolis"  
  let apiKey = "6c5b1d4ebd6321ec8c97f9ecea056e02";
  let queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

  $.ajax( {
      url: queryUrl,
      method: "GET", }).then(function (response) {
          //Current temperature converted from Kelvis to Fahrenheit
           let currentTemp = Math.round(1.8 * (response.main.temp - 273) + 32)
           console.log(currentTemp + "F")

          console.log(response)
        //Current Humidity 
        let currentHumidity = response.main.humidity + "%";
        console.log(currentHumidity)

        //

          
      })}


$("#searchBtn").on("click", weatherInfo)

// function dayForcast() {


//     let cityName2 = "orlando"
//     let stateCode = "fl"
//     let apiKey2 = "6c5b1d4ebd6321ec8c97f9ecea056e02";
//     let queryUrl2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName2 +"," + stateCode + "&appid=" + apiKey2
//     console.log(queryUrl2)


//     $.ajax( {
//         url: queryUrl,
//         method: "GET", }).then(function (response) {
//             //Current temperature converted from Kelvis to Fahrenheit
//              let currentTemp = Math.round(1.8 * (response.main.temp - 273) + 32)
//              console.log(currentTemp + "F")
//               // 
//             console.log(response)
  
  
            
//         })

// }
// console.log(dayForcast)

