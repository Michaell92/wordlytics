const menu = document.getElementById("nav-mobile");

// Mobile menu logic
import clickMenu from "./mobileMenu.js";
// Analyze text
import grammarObj from "./grammar.js";
// Placeholder function
// import placeHolder from "./placeholder.js";

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
// const placeholder = grammarText.getAttribute("data-placeholder");

// Edit placeholder for main text
// placeHolder(grammarText, placeholder)

// Event listeners

// Show/hide mobile menu
menu.addEventListener("click", clickMenu);

// Analyze text
check.addEventListener("click", checkTogglers);

// Reset results
reset.addEventListener("click", grammarObj.reset);

// Check for active togglers and analyze text
function checkTogglers(e) {
  e.preventDefault();

  if (grammarText.innerText === "") return;

  if (grammar.checked) {
    grammarObj.checkGrammar();
  }

  if (count.checked) {
    grammarObj.count();
  }

  if (sentiment.checked) {
    grammarObj.sentiment();
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
