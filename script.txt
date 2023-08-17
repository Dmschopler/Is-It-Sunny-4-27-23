var cityNameEl = document.querySelector("#city-name-input");
var apiKey = "866c79c089aecc7b7bea15f60adf199c";
var currentWeather = "https://api.openweathermap.org/data/2.5/weather"























// var formSubmitHandler = function () {
//     event.preventDefault();

//     var city = cityNameEl.value.trim();

//     var apiUrl =
//       "http://api.openweathermap.org/data/2.5/weather?q=" +
//       city +
//       "&APPID=866c79c089aecc7b7bea15f60adf199c";
//     fetch(apiUrl)
//       .then(function (response) {
//         if (response.ok) {
//           response.json().then(function (data) {
//             console.log(data);
//           });
//         } else {
//           alert("Error: " + response.statusText);
//         }
//       })
//       .catch(function (error) {
//         alert("Unable to connect to GitHub");
//       });
//   };

