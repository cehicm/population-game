const api_url = "https://restcountries.eu/rest/v2/";

//TO DO:
//Clear up and reconfigure code
// ADD CAtch

//In the future:
// to be able to add more players

function getData() {
  fetch(api_url)
    .then((data) => {
      return data.json();
    })
    .then(skipCountry);
}

playerOneScore = 0;
playerTwoScore = 0;

function skipCountry(data) {
  let random = data[Math.floor(Math.random() * data.length)];

  document.querySelector(".country-pic").src = random.flag;

  const population = random.population;

  document.querySelector(".country-name").innerHTML = random.name;

  const nativeName = document.querySelector(".country-name-native");
  nativeName.innerHTML = random.nativeName;

  function getShowResults(data) {
    let player1 = document.getElementById("player-one-input").value;
    let player2 = document.getElementById("player-two-input").value;

    const resultSpan = document.querySelector(".results-correct");

    //Player chosen units
    let playerOneUnitValue = document.getElementById("player-one-unit-value");
    let playerTwoUnitValue = document.getElementById("player-two-unit-value");

    const value1 = playerOneUnitValue.value;
    const value2 = playerTwoUnitValue.value;

    let playerOneTotal = player1 * value1;
    let playerTwoTotal = player2 * value2;

    if (player1.trim() === "" || player2.trim() === "") {
      resultSpan.innerHTML = "One or two empty values";
    } else if (playerOneTotal === playerTwoTotal) {
      resultSpan.innerHTML = "It's a tie!";
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

      document.getElementById("current-score").innerHTML = `Current score:
      <p> P1: ${playerOneScore} </p> <p> P2: ${playerTwoScore} </p>`;
    }
  }
  const resultBtn = document.getElementById("result-btn");
  resultBtn.addEventListener("click", getShowResults, { once: true });
}

const skipBtn = document.getElementById("skip-btn");
skipBtn.addEventListener("click", getData, true);

getData();
