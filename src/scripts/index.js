const api_url = "https://restcountries.eu/rest/v2/";

//TO DO:
//In the future:
// to be able to add more players

//Globs
const playerForm = document.getElementById("player-form");
const resultBtn = document.getElementById("result-btn");
const counterShow = document.getElementById("counter");

playerOneScore = 0;
playerTwoScore = 0;

async function getData() {
  await fetch(api_url)
    .then((data) => data.json())
    .then(skipCountry)
    .catch((err) => {
      if (err.response) {
        console.error("Failed with response", err.response.data);
      } else if (err.request) {
        console.error("Failed request", err);
      } else {
        console.error("Failed in general", err);
      }
    });
}

skipCountry = (data) => {
  const random = data[Math.floor(Math.random() * data.length)];
  const population = random.population;

  document.querySelector(".country-pic").src = random.flag;

  document.querySelector(".country-name").innerHTML = random.name;

  const nativeName = document.querySelector(".country-name-native");
  nativeName.innerHTML = random.nativeName;

  function getShowResults() {
    const player1 = document.getElementById("player-one-input").value;
    const player2 = document.getElementById("player-two-input").value;
    const resultSpan = document.querySelector(".results-correct");

    //Player chosen units & Total
    const playerOneUnitValue = document.getElementById("player-one-unit-value")
      .value;
    const playerTwoUnitValue = document.getElementById("player-two-unit-value")
      .value;

    const playerOneTotal = player1 * playerOneUnitValue;
    const playerTwoTotal = player2 * playerTwoUnitValue;

    if (player1.trim() === "" || player2.trim() === "") {
      resultSpan.innerHTML = "One or two empty values";
    } else if (playerOneTotal === playerTwoTotal) {
      resultSpan.innerHTML = "It's a tie!";
    } else {
      resultSpan.innerHTML = `The correct number is ${population.toLocaleString()}`;
      const playerWin = document.querySelector(".results-player-win");

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

      //counter function
      const counter = 4;
      function countdown(counter) {
        if (counter > 0) {
          counter--;
          setTimeout(function () {
            countdown(counter);
          }, 1000);
          counterShow.innerHTML = counter;
        }
        if (counter === 0) {
          counterShow.innerHTML = "";
        }
      }

      countdown(counter);

      //Reset form
      setTimeout(() => {
        playerForm.reset();
        skipCountry(data);
        playerWin.innerText = "";
        resultSpan.innerText = "";
        document.querySelector(".container").classList.add("hide-me");
      }, 3000);
    }
  }

  resultBtn.addEventListener("click", getShowResults, { once: true });
};

resultBtn.addEventListener("click", getData(), true);
