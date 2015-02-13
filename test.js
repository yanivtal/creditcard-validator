var Mocha = require('mocha'),
  assert = require('assert');
var mocha = new Mocha({ui: 'bdd'});
var CardValidator = require('./cardValidator');
mocha.suite.emit('pre-require', this, 'solution', Mocha);

describe("Credit Card Validator", function() {

  describe("Diner Club Cards", function() {
    it("Correctly identifies a diner's club card", function() {
      assert(CardValidator.DinersClub.isValid('36035390282568'));
    })

    it("Rejects invalid prefixes", function() {
      assert(!CardValidator.DinersClub.isValid('37035390282568'));
    })

    it("Rejects cards with fewer digits", function() {
      assert(!CardValidator.DinersClub.isValid('3603539028256'));
    })
  })

  describe("American Express Cards", function() {
    it("Correctly identifies an American Express card", function() {
      assert(CardValidator.AmericanExpress.isValid('346416800707698'));
    })

    it("Rejects invalid prefixes", function() {
      assert(!CardValidator.AmericanExpress.isValid('246416800707698'));
    })

    it("Rejects cards with fewer digits", function() {
      assert(!CardValidator.AmericanExpress.isValid('34641680070769'));
    })
  })
  
  describe("Visa Cards", function() {
    it("Correctly identifies a 13 digit Visa card", function() {
      assert(CardValidator.Visa.isValid('4539369353325'));
    })

    it("Correctly identifies a 16 digit Visa card", function() {
      assert(CardValidator.Visa.isValid('4539369138573325'));
    })

    it("Rejects invalid prefixes", function() {
      assert(!CardValidator.AmericanExpress.isValid('3539369353325'));
    })

    it("Rejects cards with 15 digits", function() {
      assert(!CardValidator.AmericanExpress.isValid('453936913857332'));
    })
  })

  describe("Visa Electron Cards", function() {
    it("Correctly identifies a 16 digit card starting with 417500", function() {
      assert(CardValidator.VisaElectron.isValid('4175000123456789'));
    })

    it("Correctly identifies a 16 digit card starting with 4508", function() {
      assert(CardValidator.VisaElectron.isValid('4508000123456789'));
    })

    it("Rejects invalid prefixes", function() {
      assert(!CardValidator.VisaElectron.isValid('4175010123456789'));
    })

    it("Rejects cards with 15 digits", function() {
      assert(!CardValidator.VisaElectron.isValid('417500012345678'));
    })
  })

  describe("Discover Cards", function() {
    it("Correctly identifies a 16 digit card starting with 6011", function() {
      assert(CardValidator.Discover.isValid('6011000123456789'));
    })

    it("Correctly identifies a 16 digit card starting with 65", function() {
      assert(CardValidator.Discover.isValid('6508000123456789'));
    })

    it("Correctly identifies a 16 digit card in the first range", function() {
      assert(CardValidator.Discover.isValid('6221280123456789'));
    })

    it("Correctly identifies a 16 digit card in the second range", function() {
      assert(CardValidator.Discover.isValid('6491280123456789'));
    })

    it("Rejects invalid prefixes", function() {
      assert(!CardValidator.Discover.isValid('6608000123456789'));
    })

    it("Rejects cards with 15 digits", function() {
      assert(!CardValidator.Discover.isValid('649128012345678'));
    })
  })

  describe("Maestro Cards", function() {
    it("Correctly identifies a 12 digit card starting with 5018", function() {
      assert(CardValidator.Maestro.isValid('501874837465'));
    })

    it("Correctly identifies a 19 digit card starting with 5018", function() {
      assert(CardValidator.Maestro.isValid('5018748374659748576'));
    })

    it("Correctly identifies a 19 digit card starting with 0604", function() {
      assert(CardValidator.Maestro.isValid('0604748374659748576'));
    })

    it("Rejects invalid prefixes", function() {
      assert(!CardValidator.AmericanExpress.isValid('511874837465'));
    })

    it("Rejects cards with 20 digits", function() {
      assert(!CardValidator.AmericanExpress.isValid('0604748374659748576'));
    })
  })
})

mocha.run(function() {});