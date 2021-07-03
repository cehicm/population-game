const api_url = "https://restcountries.eu/rest/v2/";

// HANDLE IT WITH A PROMISE
let apiResponse = fetch(api_url)
  .then((data) => data.json())
  .then(function skipCountry(data) {
    const skipBtn = document.getElementById("skip-btn");
    skipBtn.addEventListener("click", skipCountry);

    function skipCountry() {
      // Math.random for item and then get then name
      //use data.forEach to get individual item, then turn all of them into an array and do math.Random on them

      let random = data[Math.floor(Math.random() * data.length)];
      console.log(random);
      console.log(random.name);

      const countryName = document.querySelector(".country-name");
      countryName.innerHTML = random.name;

      //   const nativeName = document.querySelector(".country-native-name");
      //   nativeName.innerHTML = random.nativeName;

      const countryFlag = document.querySelector(".country-pic");
      countryFlag.src = random.flag;

      const countryPopulation = document.querySelector(".country-population");

      const population = random.population;
      countryPopulation.innerHTML = population.toLocaleString();

      //Get Player Results
      const getShowResults = () => {
        const resultSpan = document.querySelector(".results-correct");
        //Player number input
        let player1 = document.getElementById("player-one-input").value;
        let player2 = document.getElementById("player-two-input").value;

        //Player chosen units
        let playerOneUnitValue = document.getElementById(
          "player-one-unit-value"
        );
        let playerTwoUnitValue = document.getElementById(
          "player-two-unit-value"
        );

        const value1 = playerOneUnitValue.value;
        const value2 = playerTwoUnitValue.value;

        const playerOneTotal = player1 * value1;
        const playerTwoTotal = player2 * value2;

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
          }

          if (
            Math.abs(parseInt(population) - playerOneTotal) >
            Math.abs(parseInt(population) - playerTwoTotal)
          ) {
            playerWin.innerText = "Player 2 wins!";
          }
        }
      };

      const resultBtn = document.getElementById("result-btn");
      resultBtn.addEventListener("click", getShowResults);
    }
  });
