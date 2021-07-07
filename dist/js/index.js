"use strict";var api_url="https://restcountries.eu/rest/v2/";function getData(){fetch(api_url).then((function(e){return e.json()})).then(skipCountry)}function skipCountry(e){var t=e[Math.floor(Math.random()*e.length)];document.querySelector(".country-pic").src=t.flag;var n=t.population;document.querySelector(".country-name").innerHTML=t.name,document.querySelector(".country-name-native").innerHTML=t.nativeName,document.getElementById("result-btn").addEventListener("click",(function(e){var t=document.getElementById("player-one-input").value,r=document.getElementById("player-two-input").value,a=document.querySelector(".results-correct"),o=document.getElementById("player-one-unit-value"),c=document.getElementById("player-two-unit-value"),u=t*o.value,l=r*c.value;if(""===t.trim()||""===r.trim())a.innerHTML="One or two empty values";else if(u===l)a.innerHTML="It's a tie!";else{a.innerHTML="The correct number is ".concat(n.toLocaleString());var i=document.querySelector(".results-player-win");Math.abs(parseInt(n)-u)<Math.abs(parseInt(n)-l)&&(i.innerText="Player 1 wins!",playerOneScore++),Math.abs(parseInt(n)-u)>Math.abs(parseInt(n)-l)&&(i.innerText="Player 2 wins!",playerTwoScore++),document.getElementById("current-score").innerHTML="Current score:\n      <p> P1: ".concat(playerOneScore," </p> <p> P2: ").concat(playerTwoScore," </p>")}}),{once:!0})}playerOneScore=0,playerTwoScore=0;var skipBtn=document.getElementById("skip-btn");skipBtn.addEventListener("click",getData,!0),getData();