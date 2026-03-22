const chai = require("chai");
const assert = chai.assert;
const Translator = require("../components/translator");

const translator = new Translator();

suite("Unit Tests — American to British", () => {
  // ─── Spelling ───────────────────────────────────────────────────────────────

  suite("Spelling conversions (American → British)", () => {
    test('Translate "favorite" → "favourite"', () => {
      const result = translator.toBritish("Mangoes are my favorite fruit.");
      assert.isNotNull(result);
      assert.include(result, "favourite");
    });

    test('Translate "color" → "colour"', () => {
      const result = translator.toBritish("What is your favorite color?");
      assert.isNotNull(result);
      assert.include(result, "colour");
    });

    test('Translate "honor" → "honour"', () => {
      const result = translator.toBritish("It is an honor to meet you.");
      assert.isNotNull(result);
      assert.include(result, "honour");
    });

    test('Translate "analyze" → "analyse"', () => {
      const result = translator.toBritish("We need to analyze the data.");
      assert.isNotNull(result);
      assert.include(result, "analyse");
    });

    test('Translate "center" → "centre"', () => {
      const result = translator.toBritish("Meet me at the center.");
      assert.isNotNull(result);
      assert.include(result, "centre");
    });

    test('Translate "theater" → "theatre"', () => {
      const result = translator.toBritish("Let us go to the theater tonight.");
      assert.isNotNull(result);
      assert.include(result, "theatre");
    });

    test('Translate "program" → "programme"', () => {
      const result = translator.toBritish(
        "Did you watch the program last night?",
      );
      assert.isNotNull(result);
      assert.include(result, "programme");
    });

    test('Translate "gray" → "grey"', () => {
      const result = translator.toBritish("The sky is gray today.");
      assert.isNotNull(result);
      assert.include(result, "grey");
    });
  });

  // ─── Vocabulary ─────────────────────────────────────────────────────────────

  suite("Vocabulary conversions (American → British)", () => {
    test('Translate "condo" → "flat"', () => {
      const result = translator.toBritish(
        "We had a party at my friend's condo.",
      );
      assert.isNotNull(result);
      assert.include(result, "flat");
    });

    test('Translate "elevator" → "lift"', () => {
      const result = translator.toBritish(
        "Take the elevator to the third floor.",
      );
      assert.isNotNull(result);
      assert.include(result, "lift");
    });

    test('Translate "soccer" → "football"', () => {
      const result = translator.toBritish("He plays soccer every weekend.");
      assert.isNotNull(result);
      assert.include(result, "football");
    });

    test('Translate "french fries" → "chips" (multi-word phrase)', () => {
      const result = translator.toBritish(
        "I ordered french fries with my burger.",
      );
      assert.isNotNull(result);
      assert.include(result, "chips");
    });

    test('Translate "parking lot" → "car park" (multi-word phrase)', () => {
      const result = translator.toBritish("The parking lot was full.");
      assert.isNotNull(result);
      assert.include(result, "car park");
    });

    test('Translate "sneakers" → "trainers"', () => {
      const result = translator.toBritish("I bought new sneakers yesterday.");
      assert.isNotNull(result);
      assert.include(result, "trainers");
    });

    test('Translate "flashlight" → "torch"', () => {
      const result = translator.toBritish(
        "Grab the flashlight from the drawer.",
      );
      assert.isNotNull(result);
      assert.include(result, "torch");
    });

    test('Translate "vacation" → "holiday"', () => {
      const result = translator.toBritish(
        "We are going on vacation next week.",
      );
      assert.isNotNull(result);
      assert.include(result, "holiday");
    });

    test('Translate "cookie" → "biscuit"', () => {
      const result = translator.toBritish("She baked a chocolate chip cookie.");
      assert.isNotNull(result);
      assert.include(result, "biscuit");
    });

    test('Translate "mom" → "mum"', () => {
      const result = translator.toBritish("I called my mom this morning.");
      assert.isNotNull(result);
      assert.include(result, "mum");
    });
  });

  // ─── Time format ─────────────────────────────────────────────────────────────

  suite("Time format (American → British)", () => {
    test('Translate "12:15" → "12.15"', () => {
      const result = translator.toBritish("Lunch is at 12:15 today.");
      assert.isNotNull(result);
      assert.include(result, "12.15");
    });

    test('Translate "6:30" → "6.30"', () => {
      const result = translator.toBritish("The meeting starts at 6:30.");
      assert.isNotNull(result);
      assert.include(result, "6.30");
    });

    test('Translate "9:00" → "9.00"', () => {
      const result = translator.toBritish("School starts at 9:00 sharp.");
      assert.isNotNull(result);
      assert.include(result, "9.00");
    });
  });

  // ─── Highlight ───────────────────────────────────────────────────────────────

  suite("Highlight wrapping (American → British)", () => {
    test('Translated word is wrapped in <span class="highlight">', () => {
      const result = translator.toBritish("Mangoes are my favorite fruit.");
      assert.include(result, '<span class="highlight">favourite</span>');
    });

    test('Time translation is also wrapped in <span class="highlight">', () => {
      const result = translator.toBritish("Lunch is at 12:15 today.");
      assert.include(result, '<span class="highlight">12.15</span>');
    });

    test("Multiple words in same sentence are each highlighted", () => {
      const result = translator.toBritish("My favorite color is gray.");
      assert.include(result, '<span class="highlight">favourite</span>');
      assert.include(result, '<span class="highlight">colour</span>');
      assert.include(result, '<span class="highlight">grey</span>');
    });
  });

  // ─── No translation needed ───────────────────────────────────────────────────

  suite("No translation needed (American → British)", () => {
    test("Returns null when no translation is needed", () => {
      const result = translator.toBritish("Hello world.");
      assert.isNull(result);
    });

    test("Returns null for a sentence with no American terms", () => {
      const result = translator.toBritish("I ate yogurt for breakfast.");
      assert.isNull(result);
    });
  });

  // ─── Case preservation ───────────────────────────────────────────────────────

  suite("Case preservation (American → British)", () => {
    test("Capitalised word stays capitalised after translation", () => {
      const result = translator.toBritish("Favorite color of mine is blue.");
      assert.include(result, "Favourite");
      assert.include(result, "colour");
    });
  });
});

suite("Unit Tests — British to American", () => {
  // ─── Spelling ───────────────────────────────────────────────────────────────

  suite("Spelling conversions (British → American)", () => {
    test('Translate "favourite" → "favorite"', () => {
      const result = translator.toAmerican("Mangoes are my favourite fruit.");
      assert.isNotNull(result);
      assert.include(result, "favorite");
    });

    test('Translate "colour" → "color"', () => {
      const result = translator.toAmerican("What is your favourite colour?");
      assert.isNotNull(result);
      assert.include(result, "color");
    });

    test('Translate "organise" → "organize"', () => {
      const result = translator.toAmerican("Can you organise the files?");
      assert.isNotNull(result);
      assert.include(result, "organize");
    });

    test('Translate "recognise" → "recognize"', () => {
      const result = translator.toAmerican("I did not recognise her at first.");
      assert.isNotNull(result);
      assert.include(result, "recognize");
    });

    test('Translate "centre" → "center"', () => {
      const result = translator.toAmerican("Meet me at the centre.");
      assert.isNotNull(result);
      assert.include(result, "center");
    });

    test('Translate "travelling" → "traveling"', () => {
      const result = translator.toAmerican("She is travelling to Paris.");
      assert.isNotNull(result);
      assert.include(result, "traveling");
    });
  });

  // ─── Vocabulary ─────────────────────────────────────────────────────────────

  suite("Vocabulary conversions (British → American)", () => {
    test('Translate "flat" → "apartment"', () => {
      const result = translator.toAmerican(
        "She lives in a flat near the station.",
      );
      assert.isNotNull(result);
      assert.include(result, "apartment");
    });

    test('Translate "lift" → "elevator"', () => {
      const result = translator.toAmerican("Take the lift to the third floor.");
      assert.isNotNull(result);
      assert.include(result, "elevator");
    });

    test('Translate "chips" → "french fries" (multi-word result)', () => {
      const result = translator.toAmerican("I fancy some chips right now.");
      assert.isNotNull(result);
      assert.include(result, "french fries");
    });

    test('Translate "lorry" → "truck"', () => {
      const result = translator.toAmerican("A lorry blocked the road.");
      assert.isNotNull(result);
      assert.include(result, "truck");
    });

    test('Translate "holiday" → "vacation"', () => {
      const result = translator.toAmerican(
        "We are going on holiday next week.",
      );
      assert.isNotNull(result);
      assert.include(result, "vacation");
    });

    test('Translate "car park" → "parking lot" (multi-word phrase)', () => {
      const result = translator.toAmerican("The car park was full.");
      assert.isNotNull(result);
      assert.include(result, "parking lot");
    });

    test('Translate "biscuit" → "cookie"', () => {
      const result = translator.toAmerican("She had a biscuit with her tea.");
      assert.isNotNull(result);
      assert.include(result, "cookie");
    });

    test('Translate "bank holiday" → "public holiday" (multi-word phrase)', () => {
      const result = translator.toAmerican(
        "I spent the bank holiday at the funfair.",
      );
      assert.isNotNull(result);
      assert.include(result, "public holiday");
    });
  });

  // ─── Time format ─────────────────────────────────────────────────────────────

  suite("Time format (British → American)", () => {
    test('Translate "4.30" → "4:30"', () => {
      const result = translator.toAmerican(
        "Tea time is usually around 4 or 4.30.",
      );
      assert.isNotNull(result);
      assert.include(result, "4:30");
    });

    test('Translate "8.00" → "8:00"', () => {
      const result = translator.toAmerican("The show starts at 8.00.");
      assert.isNotNull(result);
      assert.include(result, "8:00");
    });

    test('Translate "11.45" → "11:45"', () => {
      const result = translator.toAmerican("The train arrives at 11.45.");
      assert.isNotNull(result);
      assert.include(result, "11:45");
    });
  });

  // ─── Highlight ───────────────────────────────────────────────────────────────

  suite("Highlight wrapping (British → American)", () => {
    test('Translated word is wrapped in <span class="highlight">', () => {
      const result = translator.toAmerican("Mangoes are my favourite fruit.");
      assert.include(result, '<span class="highlight">favorite</span>');
    });

    test('Time translation is also wrapped in <span class="highlight">', () => {
      const result = translator.toAmerican(
        "Tea time is usually around 4 or 4.30.",
      );
      assert.include(result, '<span class="highlight">4:30</span>');
    });
  });

  // ─── No translation needed ───────────────────────────────────────────────────

  suite("No translation needed (British → American)", () => {
    test("Returns null when no translation is needed", () => {
      const result = translator.toAmerican("Hello world.");
      assert.isNull(result);
    });

    test("Returns null for sentence with no British terms", () => {
      const result = translator.toAmerican(
        "Paracetamol takes up to an hour to work.",
      );
      assert.isNull(result);
    });
  });

  // ─── Case preservation ───────────────────────────────────────────────────────

  suite("Case preservation (British → American)", () => {
    test("Capitalised word stays capitalised after translation", () => {
      const result = translator.toAmerican("Favourite colour of mine is blue.");
      assert.include(result, "Favorite");
      assert.include(result, "color");
    });
  });
});
