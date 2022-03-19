export default {
  grammar: (query) => {
    return {
      method: "POST",
      url: "https://jspell-checker.p.rapidapi.com/check",
      headers: {
        "x-rapidapi-host": "jspell-checker.p.rapidapi.com",
        "x-rapidapi-key": "d59beff77cmshb1e154aff1f2ff1p130552jsn8595b2f69074",
      },
      data: {
        language: "enUS",
        fieldvalues: query,
        config: {
          forceUpperCase: false,
          ignoreIrregularCaps: false,
          ignoreFirstCaps: true,
          ignoreNumbers: true,
          ignoreUpper: false,
          ignoreDouble: false,
          ignoreWordsWithNumbers: true,
        },
      },
    };
  },

  sentiment: (query) => {
    return {
      method: "POST",
      url: "https://text-sentiment.p.rapidapi.com/analyze",
      headers: {
        "x-rapidapi-host": "text-sentiment.p.rapidapi.com",
        "x-rapidapi-key": "d59beff77cmshb1e154aff1f2ff1p130552jsn8595b2f69074",
      },
      data: { text: query },
    };
  },
};
