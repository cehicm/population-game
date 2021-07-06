const api_url = "https://restcountries.eu/rest/v2/";

//TO DO:
// MAKE A START SCREEN: 
//First screen with open btn, opaque bg
//Clear up and reconfigure code
//Update CSS for new layout
//block second click for results


//Shorten the code for getting player results

let getData = fetch(api_url)
  .then((data) => data.json())
  .then(function getData(data) {
    let playerOneScore = 0;
    let playerTwoScore = 0;
 

    function skipCountry() {
      let random = data[Math.floor(Math.random() * data.length)];

      const countryPopulation = document.querySelector(".country-population");

      const population = random.population;
      countryPopulation.innerHTML = population.toLocaleString();

      const countryName = document.querySelector(".country-name");
      countryName.innerHTML = random.name;

      //   const nativeName = document.querySelector(".country-native-name");
      //   nativeName.innerHTML = random.nativeName;

      const countryFlag = document.querySelector(".country-pic");
      countryFlag.src = random.flag;

        //Get Player Results
    const getShowResults = (e) => {
 e.stopImmediatePropagation()
      
      let player1 = document.getElementById("player-one-input").value;
      let player2 = document.getElementById("player-two-input").value;
      const resultSpan = document.querySelector(".results-correct");
      //Player number input

      //Player chosen units
      let playerOneUnitValue = document.getElementById("player-one-unit-value");
      let playerTwoUnitValue = document.getElementById("player-two-unit-value");

      const value1 = playerOneUnitValue.value;
      const value2 = playerTwoUnitValue.value;

      let playerOneTotal = player1 * value1;
      let playerTwoTotal = player2 * value2;

      if (player1 === "" || player2 === "") {
        resultSpan.innerHTML = "One or two empty values";
      } else {
        resultSpan.innerHTML = `The correct number is ${population.toLocaleString()}`;
        let playerWin = document.querySelector(".results-player-win");

        if (
          Math.abs(parseInt(population) - playerOneTotal) <
          Math.abs(parseInt(population) - playerTwoTotal)
        ) {
          playerWin.innerText = "Player 1 wins!";
          
          playerOneScore++;
        } 
        
         if (
          Math.abs(parseInt(population) - playerOneTotal) >
          Math.abs(parseInt(population) - playerTwoTotal)
        ) {
          playerWin.innerText = "Player 2 wins!";
         
          playerTwoScore++;
        }
        document.getElementById(
          "current-score"
        ).innerHTML = `P1: ${playerOneScore} --- P2: ${playerTwoScore}`;
      }
      
    };
    const resultBtn = document.getElementById("result-btn");
    resultBtn.addEventListener("click", getShowResults);
    }

  

    const skipBtn = document.getElementById("skip-btn");
    skipBtn.addEventListener("click", skipCountry);
  });
