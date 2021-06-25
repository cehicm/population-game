const api_url = "https://restcountries.eu/rest/v2/";

fetch("https://restcountries.eu/rest/v2/")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data[0].flag);

    const name = data[0].name;
    document.querySelector(".country-name").innerHTML = name;

    const nativeName = data[0].nativeName;
    document.querySelector(".country-native-name").innerHTML = nativeName;

    const img = document.querySelector(".country-pic");
    img.src = data[0].flag;
  });

//turn response into blob
//use the data[0].flag for src

// async function getCountry() {
//   const response = await fetch(api_url);
//   const data = await response.json();

//   const name = data[0].name;
//   document.querySelector(".country-name").innerHTML = name;

//   const nativeName = data[0].nativeName;
//   document.querySelector(".country-native-name").innerHTML = nativeName;

//   const countryPic = data[0].flag;

//   document.querySelector(".country-pic").innerHTML = countryPic;

//   console.log(data);
//   console.log(data[0].name);
//   console.log(data[0].nativeName);
//   console.log(data[0].flag);
// }

// getCountry();
