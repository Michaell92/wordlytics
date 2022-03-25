const axios = require("axios");
const menu = document.getElementById("nav-mobile");

// Starting points
let started = false;
let finished = false;
let time = 60;
let interval = null;

// Mobile menu logic
import clickMenu from "./mobileMenu.js";

// API options
import options from "./optionsAPI.js";

// SPEED
const start = document.getElementById("start");

// TEXT
const speedText = document.getElementById("speedText");
// Placeholder
const placeholder = speedText.getAttribute("data-placeholder");

const dummyText = document.getElementById("dummy-text");

// Placeholder function
// import placeHolder from "./placeholder.js";

// RESULTS
const speedAccuracy = document.getElementById("grammarAccuracy");
const mistakes = document.getElementById("mistakes");
const speed = document.getElementById("speed");
const timer = document.getElementById("timer");
const restart = document.getElementById("restart");

// Edit placeholder for main text
// placeHolder(speedText, placeholder);

// Event listeners

// Show/hide mobile menu
menu.addEventListener("click", clickMenu);

// Initiate speed test
start.addEventListener("click", speedTest);

// Check for mistakes while typing
speedText.addEventListener("keydown", compareUserText);

// Reset everything
restart.addEventListener("click", reset);

// Start test
function speedTest() {
  if (started) return;
  started = true;

  // Reset text
  speedText.innerText = "";

  // Change focus
  speedText.focus();

  // Initiate timer
  setTimer();

  addDummyText();
}

// Add dummy text for the test
function addDummyText() {
  axios
    .get("https://thesimpsonsquoteapi.glitch.me/quotes?count=10")
    .then((res) => {
      addToHTML(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

// Add dummy text to HTML
function addToHTML(res) {
  const quotes = res.data;
  let text = "";
  let finalText = "";

  // Loop quotes and concatonate them
  for (let i = 0; i < quotes.length; i++) {
    text += quotes[i].quote + " ";
  }

  //   Add spans and classes to letters
  for (let i = 0; i < text.length; i++) {
    finalText += "<span>" + text[i] + "</span>";
  }

  dummyText.innerHTML = finalText;

  // Change placeholder
  setPlaceholder("Start typing...");
}

// Count down the timer
function setTimer() {
  interval = setInterval(() => {
    time -= 1;

    timer.innerText = time;
    // Clear interval after time is finished
    if (time < 1) {
      finished = true;

      clearInterval(interval);
      processResults();
    }
  }, 1000);
}

// Check for mistakes live
function compareUserText(e) {
  //   Check if key is enumerabler character and if the test is started

  if ((!(e.key.length > 1) || e.keyCode === 8) && started && !finished) {
    //   Get index of the current key and dummy text letter
    const index = e.srcElement.innerText.length;
    const dummyTextLetter = dummyText.children[index];

    //   Handle backspace
    if (e.keyCode === 8) {
      dummyTextLetter.classList = "";
    } else {
      // Entered key
      const key = e.key;

      //   Compare dummy text letter and user typed letter
      const correct = dummyText.innerText[index] === key;

      //   Add styles for letters
      if (correct) {
        dummyTextLetter.classList = "green";
      } else {
        dummyTextLetter.classList = "red";
      }
    }
  }
}

// Calculate results
function processResults() {
  let userMistakes = 0;
  // Create word arrays
  const dummyWords = dummyText.innerText.split(" ");
  const userWords = speedText.innerText.split(" ");
  const length = userWords.length;

  // Mistakes
  for (let i = 0; i < length; i++) {
    if (userWords[i] !== dummyWords[i]) userMistakes++;
  }

  // Accuracy
  const accuracy = Math.round(100 - (userMistakes / length) * 100);

  // Edit css
  let color = "";
  accuracy > 50
    ? (color = "green")
    : accuracy < 50
    ? (color = "red")
    : (color = "gray");

  speedAccuracy.style.color = color;
  if (userMistakes === 0) mistakes.style.color = "green";

  // HTML
  mistakes.innerText = userMistakes;
  speedAccuracy.innerText = accuracy + "%";
  speed.innerText = length + " " + "words per min";
}

// Reset everything to default
function reset() {
  speedText.innerText = "";
  if (!started) return;

  started = false;

  //   Clear timer
  clearInterval(interval);

  // Reset timer
  timer.innerText = 60;
  time = 60;

  // Reset text
  setPlaceholder("Press start to begin...");
  dummyText.innerText = "Waiting...";

  speedAccuracy.innerText = "";
  speed.innerText = "";
  mistakes.innerText = "";
}

function setPlaceholder(text) {
  speedText.setAttribute("data-placeholder", text);
}
