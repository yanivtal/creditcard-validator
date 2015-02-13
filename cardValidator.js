// CardValidator can tell you whether a credit card number is a valid for any given network

// Base class for all cards. Overwrite any of the following properties for customization:
// network, iinPrefixes, iinPrefixRanges, lengths, lengthRanges
// 
// the isValid() method is generic and does not need to be overwritten
var _Card = function () {
  this.network = '';
  this.iinPrefixes = [];
  this.iinPrefixRanges = [];
  this.lengths = [];
  this.lengthRanges = [];

  function getPrefix (cardNumber, numDigits) {
    return cardNumber.substr(0, numDigits);
  }

  this._hasPrefixInList = function(cardNumber) {
    // We need to loop over each element since prefixes might have different lengths
    for (var i = 0; i < this.iinPrefixes.length; i++) {
      if (this.iinPrefixes[i] === getPrefix(cardNumber, this.iinPrefixes[i].length))
        return true;
    }
    return false;
  };

  // Range objects are of the form {start: [int], end: [ind]}
  this._hasPrefixInRange = function(cardNumber) {
    for (var i = 0; i < this.iinPrefixRanges.length; i++) {
      // We can use the property that all prefixes per each range have the same number of digits
      intPrefix = parseInt(getPrefix(cardNumber, this.iinPrefixRanges[i].start.toString().length), 10);
      if (intPrefix >= this.iinPrefixRanges[i].start && intPrefix <= this.iinPrefixRanges[i].end)
        return true;
    }
    return false;
  }

  // Range objects are of the form {start: [int], end: [ind]}
  this._hasLengthInRange = function(cardNumber) {
    var numberLength = cardNumber.length;
    for (var i = 0; i < this.lengthRanges.length; i++) {
      if (numberLength >= this.lengthRanges[i].start && numberLength <= this.lengthRanges[i].end)
        return true;
    }
    return false;
  }

  this.isValid = function(cardNumber) {
    var hasCorrectLength = false;
    var hasRightPrefix = false;

    hasCorrectLength = this.lengths.indexOf(cardNumber.length) !== -1 || this._hasLengthInRange(cardNumber);
    hasRightPrefix = this._hasPrefixInList(cardNumber) || this._hasPrefixInRange(cardNumber);
        
    return hasCorrectLength && hasRightPrefix;
  };
}

var DinersClubCard = function () {
  this.network = 'Diners Club International';
  this.iinPrefixes = ['36'];
  this.lengths = [14];
};

var AmericanExpressCard = function () {
  this.network = 'American Express';
  this.iinPrefixes = ['34'];
  this.lengths = [15];
};

var VisaCard = function () {
  this.network = 'Visa';
  this.iinPrefixes = ['4'];
  this.lengths = [13, 16];
};

var VisaElectronCard = function () {
  this.network = 'Visa Electron';
  this.iinPrefixes = ['4026', '417500', '4405', '4508', '4844', '4913', '4917'];
  this.lengths = [16];
}

var DiscoverCard = function () {
  this.network = 'Discover';
  this.iinPrefixes = ['6011', '65'];
  this.iinPrefixRanges = [{start: 622126, end: 622925}, {start: 644, end: 649}];
  this.lengths = [16];
}

var MaestroCard = function () {
  this.network = 'Maestro';
  this.iinPrefixes = ['5018', '5020', '5038', '5893', '6304', '6759', '6761', '6762', '6763', '0604'];
  this.lengthRanges = [{start: 12, end: 19}];
}

DinersClubCard.prototype = new _Card();
AmericanExpressCard.prototype = new _Card();
VisaCard.prototype = new _Card();
VisaElectronCard.prototype = new _Card();
DiscoverCard.prototype = new _Card();
MaestroCard.prototype = new _Card();

var CardValidator = {
  DinersClub: new DinersClubCard(),
  AmericanExpress: new AmericanExpressCard(),
  Visa: new VisaCard(),
  VisaElectron: new VisaElectronCard(),
  Discover: new DiscoverCard(),
  Maestro: new MaestroCard()
}

module.exports = CardValidator;
