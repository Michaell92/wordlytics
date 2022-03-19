const axios = require("axios");

// API options
import options from "./optionsAPI.js";

// GRAMMAR RESULTS
const accuracy = document.getElementById("grammar-accuracy");
const letters = document.getElementById("letter-count");
const words = document.getElementById("word-count");
const sentimentResult = document.getElementById("sentimentResult");

export default {
  checkGrammar: () => {
    // TEXT
    const grammarText = document.getElementById("grammarText").innerText;

    // Call api
    axios
      .request(options.grammar(grammarText))
      .then(function (res) {
        // Get mistakes and calculate accuracy
        grammarCorrection(res, grammarText);
      })
      .catch((err) => console.log(err));
  },

  count: () => {
    // TEXT
    const grammarText = document.getElementById("grammarText").innerText;

    // Count
    let letterCount = countLetters(grammarText);
    let wordCount = countWords(grammarText);

    // Edit html
    letters.innerHTML = letterCount;
    words.innerHTML = wordCount;
  },

  sentiment: () => {
    const grammarText = document.getElementById("grammarText").innerText;

    axios
      .request(options.sentiment(grammarText))
      .then(function (res) {
        getSentiment(res);
      })
      .catch((err) => console.log(err));
  },

  // Reset results
  reset: () => {
    accuracy.innerHTML = "";
    letters.innerHTML = "";
    words.innerHTML = "";
    sentiment.innerHTML = "";
    grammarText.innerText = "";
  },
};

// CORRECT MISTAKES AND CALCULATE ACCURACY
function grammarCorrection(response, grammarText) {
  // Basic info
  const mistakes = response.data.spellingErrorCount;
  const wordCount = countWords(grammarText);

  // Calculate accuracy
  const accuracyCalc = Math.round(100 - (mistakes / wordCount) * 100);

  // Edit css
  let color = "";
  accuracyCalc > 50
    ? (color = "green")
    : accuracyCalc < 50
    ? (color = "red")
    : (color = "gray");

  accuracy.style.color = color;

  // Add to html
  accuracy.innerHTML = accuracyCalc + " " + "%";

  // Offer alternative words and fix grammar
  if (response.data.elements) {
    fixGrammar(response.data.elements[0].errors, grammarText);
  }
}

function fixGrammar(errors, text) {
  const textArr = text.split(" ");

  // Create error free text
  let errorFreeText = "";

  // Replace errors with suggestions
  for (let i = 0; i < errors.length; i++) {
    let temp = text.replace(
      errors[i].word,
      "<span class='green'>" + errors[i].suggestions[0] + "</span>"
    );

    // Error corrected and replaced old text
    errorFreeText = temp;

    // Replace text for correction with new text
    text = errorFreeText;
  }

  // Replace html
  document.getElementById("grammarText").innerHTML = errorFreeText;
}

function countLetters(grammarText) {
  // Initial count
  let letterCount = 0;

  // Split by Letters
  const letterArr = grammarText.split("");

  // Count letters
  for (let i = 0; i < letterArr.length; i++) {
    if (letterArr[i] !== " ") letterCount++;
  }

  return letterCount;
}

function countWords(grammarText) {
  // Initial count
  let wordCount = 0;

  // Split by words
  const wordArr = grammarText.split(" ");

  // Count words
  for (let i = 0; i < wordArr.length; i++) {
    if (wordArr[i] !== "") wordCount++;
  }

  return wordCount;
}

function getSentiment(res) {
  let positive = null;
  const pos = res.data.pos_percent;
  const neg = res.data.neg_percent;

  pos > neg
    ? sentimentResult.setAttribute("src", "./img/happy.png")
    : neg > pos
    ? sentimentResult.setAttribute("src", "./img/sad.png")
    : sentimentResult.setAttribute("src", "./img/neutral.png");
}
