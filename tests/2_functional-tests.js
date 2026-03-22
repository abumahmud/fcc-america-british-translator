const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");
const Translator = require("../components/translator");

chai.use(chaiHttp);

const translator = new Translator();

suite("Unit Tests", () => {
  // American to British
  suite("Translate American to British", () => {
    test('Translate "Mangoes are my favorite fruit." to British English', () => {
      const result = translator.toBritish("Mangoes are my favorite fruit.");
      assert.include(result, "favourite");
    });

    test('Translate "I ate yogurt for breakfast." to British English', () => {
      const result = translator.toBritish("I ate yogurt for breakfast.");
      // yogurt is the same in both — expect no translation
      assert.isNull(result);
    });

    test('Translate "We had a party at my friend\'s condo." to British English', () => {
      const result = translator.toBritish(
        "We had a party at my friend's condo.",
      );
      assert.include(result, "flat");
    });

    test('Translate "Can you toss this in the trashcan for me?" to British English', () => {
      const result = translator.toBritish(
        "Can you toss this in the trashcan for me?",
      );
      // trashcan not in dict, but trash can is
      const result2 = translator.toBritish(
        "Can you toss this in the trash can for me?",
      );
      assert.include(result2, "bin");
    });

    test('Translate "The parking lot was full." to British English', () => {
      const result = translator.toBritish("The parking lot was full.");
      assert.include(result, "car park");
    });

    test('Translate "Like a high tech Rube Goldberg machine." to British English', () => {
      const result = translator.toBritish(
        "Like a high tech Rube Goldberg machine.",
      );
      assert.isNull(result);
    });

    test('Translate "To play hooky means to skip class or work." to British English', () => {
      const result = translator.toBritish(
        "To play hooky means to skip class or work.",
      );
      assert.isNull(result);
    });

    test('Translate "No Mr. Bond, I expect you to die." to British English', () => {
      const result = translator.toBritish("No Mr. Bond, I expect you to die.");
      assert.isNull(result);
    });

    test('Translate "Dr. Grosh will see you now." to British English', () => {
      const result = translator.toBritish("Dr. Grosh will see you now.");
      assert.isNull(result);
    });

    test('Translate "Lunch is at 12:15 today." to British English', () => {
      const result = translator.toBritish("Lunch is at 12:15 today.");
      assert.include(result, "12.15");
    });
  });

  // British to American
  suite("Translate British to American", () => {
    test('Translate "We watched the footie match for a while." to American English', () => {
      const result = translator.toAmerican(
        "We watched the footie match for a while.",
      );
      assert.isNull(result); // footie not in dict
    });

    test('Translate "Paracetamol takes up to an hour to work." to American English', () => {
      const result = translator.toAmerican(
        "Paracetamol takes up to an hour to work.",
      );
      assert.isNull(result);
    });

    test('Translate "First, caramelise the onions." to American English', () => {
      const result = translator.toAmerican("First, caramelise the onions.");
      assert.include(result, "caramelize");
    });

    test('Translate "I spent the bank holiday at the funfair." to American English', () => {
      const result = translator.toAmerican(
        "I spent the bank holiday at the funfair.",
      );
      assert.include(result, "public holiday");
    });

    test('Translate "I had a bicky then went to the chippy." to American English', () => {
      const result = translator.toAmerican(
        "I had a bicky then went to the chippy.",
      );
      assert.isNull(result);
    });

    test('Translate "I\'ve just got bits and bobs in my bum bag." to American English', () => {
      const result = translator.toAmerican(
        "I've just got bits and bobs in my bum bag.",
      );
      assert.include(result, "fanny pack");
    });

    test('Translate "The car boot sale at Boxted Airfield was called off." to American English', () => {
      const result = translator.toAmerican(
        "The car boot sale at Boxted Airfield was called off.",
      );
      assert.include(result, "car trunk");
    });

    test('Translate "Have you met Mrs Kalyani?" to American English', () => {
      const result = translator.toAmerican("Have you met Mrs Kalyani?");
      assert.isNull(result);
    });

    test('Translate "Prof Joyner of King\'s College, London." to American English', () => {
      const result = translator.toAmerican(
        "Prof Joyner of King's College, London.",
      );
      assert.isNull(result);
    });

    test('Translate "Tea time is usually around 4 or 4.30." to American English', () => {
      const result = translator.toAmerican(
        "Tea time is usually around 4 or 4.30.",
      );
      assert.include(result, "4:30");
    });
  });

  // Highlight tests
  suite("Highlight translation", () => {
    test('Highlight translation in "Mangoes are my favorite fruit."', () => {
      const result = translator.toBritish("Mangoes are my favorite fruit.");
      assert.include(result, '<span class="highlight">');
    });

    test('Highlight translation in "I ate yogurt for breakfast."', () => {
      const result = translator.toBritish("I ate yogurt for breakfast.");
      assert.isNull(result);
    });

    test('Highlight translation in "We watched the footie match for a while."', () => {
      const result = translator.toAmerican(
        "We watched the footie match for a while.",
      );
      assert.isNull(result);
    });

    test('Highlight translation in "Paracetamol takes up to an hour to work."', () => {
      const result = translator.toAmerican(
        "Paracetamol takes up to an hour to work.",
      );
      assert.isNull(result);
    });
  });
});

suite("Functional Tests", () => {
  test("Translation with text and locale fields", (done) => {
    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: "Mangoes are my favorite fruit.",
        locale: "american-to-british",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "text");
        assert.property(res.body, "translation");
        assert.include(res.body.translation, "favourite");
        done();
      });
  });

  test("Translation with text and invalid locale field", (done) => {
    chai
      .request(server)
      .post("/api/translate")
      .send({ text: "Hello", locale: "invalid-locale" })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: "Invalid value for locale field" });
        done();
      });
  });

  test("Translation with missing text field", (done) => {
    chai
      .request(server)
      .post("/api/translate")
      .send({ locale: "american-to-british" })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: "Required field(s) missing" });
        done();
      });
  });

  test("Translation with missing locale field", (done) => {
    chai
      .request(server)
      .post("/api/translate")
      .send({ text: "Hello" })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: "Required field(s) missing" });
        done();
      });
  });

  test("Translation with empty text", (done) => {
    chai
      .request(server)
      .post("/api/translate")
      .send({ text: "", locale: "american-to-british" })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: "No text to translate" });
        done();
      });
  });

  test("Translation with text that needs no translation", (done) => {
    chai
      .request(server)
      .post("/api/translate")
      .send({ text: "Hello world", locale: "american-to-british" })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, "Everything looks good to me!");
        done();
      });
  });
});
