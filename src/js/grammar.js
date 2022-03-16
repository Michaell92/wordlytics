const axios = require("axios");

// GRAMMAR RESULTS
const accuracy = document.getElementById("grammar-accuracy");
const letters = document.getElementById("letter-count");
const words = document.getElementById("word-count");
const sentimentResult = document.getElementById("sentimentResult");

export default {
  checkGrammar: () => {
    axios
      .get("https://reqres.in/api/products")
      .then(function (response) {
        console.log("grammar");
      })
      .catch((err) => console.log(err));
  },

  count: () => {
    // TEXT
    const grammarText = document.getElementById("grammarText").value;

    // Initial count
    let letterCount = 0;
    let wordCount = 0;

    // Split by Letters
    const letterArr = grammarText.split("");

    // Split by words
    const wordArr = grammarText.split(" ");

    // Count letters
    for (let i = 0; i < letterArr.length; i++) {
      if (letterArr[i] !== " ") letterCount++;
    }

    // Count words
    for (let i = 0; i < wordArr.length; i++) {
      if (wordArr[i] !== "") wordCount++;
    }

    // Add to html
    letters.innerHTML = letterCount;
    words.innerHTML = wordCount;
  },

  sentiment: () => {
    console.log("sentiment");
  },

  // Reset results
  reset: () => {
    accuracy.innerHTML = "";
    letters.innerHTML = "";
    words.innerHTML = "";
    sentiment.innerHTML = "";
    grammarText.value = "";
  },
};
