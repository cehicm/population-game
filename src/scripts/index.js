const api_url = "https://restcountries.eu/rest/v2/";
//for or forEach to handle all 250 countries

let apiResponse = fetch(api_url)
  .then((response) => response.json())
  .then(function (data) {
    const name = data[0].name;
    document.querySelector(".country-name").innerHTML = name;

    const nativeName = data[0].nativeName;
    document.querySelector(".country-native-name").innerHTML = nativeName;

    const img = document.querySelector(".country-pic");
    img.src = data[0].flag;

    const population = data[0].population;
    document.querySelector(
      ".country-population"
    ).innerHTML = population.toLocaleString();

    //Get Player Results
    const getResults = () => {
      const resultSpan = document.querySelector(".results-correct");
      //Player number input
      let player1 = document.getElementById("player-one-input").value;
      let player2 = document.getElementById("player-two-input").value;

      //Player chosen units
      let playerOneUnitValue = document.getElementById("player-one-unit-value");
      let playerTwoUnitValue = document.getElementById("player-two-unit-value");

      const value1 = playerOneUnitValue.value;
      const value2 = playerTwoUnitValue.value;

      const playerOneTotal = player1 * value1;
      const playerTwoTotal = player2 * value2;

      if (player1 === "" || player2 === "") {
        resultSpan.innerHTML = "One or two empty values";
      } else {
        resultSpan.innerHTML = `The correct number is ${population.toLocaleString()}`;

        const playerWin = document.querySelector(".player-win");

        if (
          Math.abs(population - playerOneTotal) <
          Math.abs(population - playerTwoTotal)
        ) {
          playerWin.innerText = "Player 1 wins!";
        }

        if (
          Math.abs(population - playerOneTotal) >
          Math.abs(population - playerTwoTotal)
        ) {
          playerWin.innerText = "Player 2 wins!";
        }
      }
    };

    const resultBtn = document.getElementById("result-btn");
    resultBtn.addEventListener("click", getResults);
  });

//get the inputs and compare them to the population number

//calculate total population - player input, which one is closer to 0 is the winner

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
