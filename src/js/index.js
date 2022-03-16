const menu = document.getElementById("nav-mobile");

// Mobile menu logic
import clickMenu from "./mobileMenu.js";
// Analyze text
import analyze from "./grammar.js";

// GRAMMAR
// BUTTONS
const check = document.getElementById("check");
const reset = document.getElementById("reset");

// GRAMMAR TOGGLERS
const grammar = document.getElementById("grammar");
const count = document.getElementById("count");
const sentiment = document.getElementById("sentiment");

// TEXT
const grammarText = document.getElementById("grammarText");

// SPEED
const start = document.getElementById("start");
const restart = document.getElementById("restart");

// TEXT
const speedText = document.getElementById("speedText");

// RESULTS
const speedAccuracy = document.getElementById("grammarAccuracy");
const mistakes = document.getElementById("mistakes");
const speed = document.getElementById("speed");
const speedSentiment = document.getElementById("speedSentiment");

// Event listeners

// Show/hide mobile menu
menu.addEventListener("click", clickMenu);

// Analyze text
check.addEventListener("click", checkTogglers);

// Reset results
reset.addEventListener("click", analyze.reset);

// Check for active togglers and analyze text
function checkTogglers(e) {
  e.preventDefault();

  if (grammarText.value === "") return;

  if (grammar.checked) {
    analyze.checkGrammar();
  }

  if (count.checked) {
    analyze.count();
  }

  if (sentiment.checked) {
    analyze.sentiment();
  }
}

// Functions
// async function analyze() {
//     try {
//         const response = await axios.get('https://reqres.in/api/products/3')
//         console.log(response)
//     } catch (err) {
//         console.log(err)
//     }

// }
