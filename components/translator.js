const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

const Translator = class {
  toBritish(text) {
    // Combine american-only terms and american spelling
    const dict = { ...americanOnly, ...americanToBritishSpelling };
    return this.translate(text, dict, "toBritish");
  }

  toAmerican(text) {
    // Flip the dictionaries: values become keys
    const flippedSpelling = this.flipDict(americanToBritishSpelling);
    const flippedOnly = this.flipDict(britishOnly);
    const dict = { ...flippedOnly, ...flippedSpelling };
    return this.translate(text, dict, "toAmerican");
  }

  flipDict(dict) {
    return Object.fromEntries(Object.entries(dict).map(([k, v]) => [v, k]));
  }

  translateTime(text, direction) {
    // American time: 12:30 → British time: 12.30 and vice versa
    if (direction === "toBritish") {
      return text.replace(/(\d{1,2}):(\d{2})/g, (match, h, m) => {
        return `<span class="highlight">${h}.${m}</span>`;
      });
    } else {
      return text.replace(/(\d{1,2})\.(\d{2})/g, (match, h, m) => {
        return `<span class="highlight">${h}:${m}</span>`;
      });
    }
  }

  translate(text, dict, direction) {
    let result = text;

    // Sort keys longest-first to match multi-word phrases before single words
    const sortedKeys = Object.keys(dict).sort((a, b) => b.length - a.length);

    for (const term of sortedKeys) {
      const translation = dict[term];
      // Case-insensitive whole-word match
      const regex = new RegExp(
        `(?<![\\w])${this.escapeRegex(term)}(?![\\w])`,
        "gi",
      );
      result = result.replace(regex, (match) => {
        // Preserve original capitalisation
        const translated = this.matchCase(match, translation);
        return `<span class="highlight">${translated}</span>`;
      });
    }

    // Handle time translation
    result = this.translateTime(result, direction);

    if (result === text) return null; // No translation needed
    return result;
  }

  matchCase(original, translation) {
    if (original[0] === original[0].toUpperCase()) {
      return translation[0].toUpperCase() + translation.slice(1);
    }
    return translation;
  }

  escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
};

module.exports = Translator;
