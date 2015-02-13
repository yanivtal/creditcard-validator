var _Card = function () {
  this.network = 'a';
  this.iinPrefixes = [];
  this.iinPrefixRanges = [];
  this.lengths = [];
  this.lengthRanges = [];

  // Range objects can be used for iinPrefixes or lengths
  var range = {
    start: undefined,
    end: undefined
  }

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

  this._hasPrefixInRange = function(cardNumber) {
    for (var i = 0; i < this.iinPrefixRanges.length; i++) {
      // We can use the property that all prefixes per each range have the same number of digits
      intPrefix = parseInt(getPrefix(cardNumber, this.iinPrefixRanges[i].start.length), 10);
      if (intPrefix >= this.iinPrefixRanges[i].start && intPrefix <= this.iinPrefixRanges[i].end)
        return true;
    }
    return false;
  }

  this.isValid = function(cardNumber) {
    var hasCorrectLength = false;
    var hasRightPrefix = false;

    hasCorrectLength = this.lengths.indexOf(cardNumber.length) !== -1;
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

DinersClubCard.prototype = new _Card();
AmericanExpressCard.prototype = new _Card();
VisaCard.prototype = new _Card();
VisaElectronCard.prototype = new _Card();
DiscoverCard.prototype = new _Card();

var CardValidator = {
  DinersClub: new DinersClubCard(),
  AmericanExpress: new AmericanExpressCard(),
  Visa: new VisaCard(),
  VisaElectron: new VisaElectronCard(),
  Discover: new DiscoverCard()
}

//   TYPE_MAESTRO: 'Maestro',
// };

module.exports = CardValidator;

/*
#+------------------------------------+------------------------------------------------------------+--------+
#| Issuing network                    | IIN prefix                                                 | Length |
#+------------------------------------+------------------------------------------------------------+--------+
#| Diners Club International          | 36                                                         | 14     |
#| American Express                   | 34                                                         | 15     |


#| Visa                               | 4                                                          | 13, 16 |
#| Visa Electron                      | 4026, 417500, 4405, 4508, 4844, 4913, 4917                 | 16     |


#| Discover Card                      | 6011, 622126-622925, 644-649, 65                           | 16     |

#| Maestro                            | 5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762, 6763, 0604 | 12-19  |


      '36035390282568'     => 'Diners Club International',
      '346416800707698'    => 'American Express',
      
      '4539369138573325'   => 'Visa',
      '4539369353325'      => 'Visa',
      '4175000123456789'   => 'Visa Electron',




*/
 
// getCardNetwork: Returns a string describing the card network
// var DINERS_CLUB = 'Diners Club International',
//     AMERICAN_EXPRESS = 'American Express';

// var VISA_ELECTRON_PREFIXES = ['4026', '417500', '4405', '4508', '4844', '4913', '4917'];


// CardType = {
//   prefixes: [],
//   lengths: [],
//   getPrefix: function (cardNumber, numDigits) {
//     return cardNumber.substr(0, numDigits);
//   },
  // isValid: function(cardNumber) {
  //   var hasCorrectLength = false;
  //   var hasRightPrefix = false;
    
  //   hasCorrectLength = this.lengths.indexOf(cardNumber.length) !== -1;
  //   hasRightPrefix = this.prefixes.indexOf(this.getPrefix(cardNumber)) !== -1;
    
  //   console.log('hasCorrectLength: ', hasCorrectLength);
    
  //   return hasCorrectLength && hasRightPrefix;
  // }
// }


// function getCardNetwork(cardNumber) {
//   if (cardNumber.length === 14 && cardNumber.substr(0,2) === '36') {
//     return DINERS_CLUB;
//   }
//   else if (cardNumber.length === 15 && cardNumber.substr(0,2) === '34' ) {
//     return AMERICAN_EXPRESS;
//   }
//   else {
//     return null;
//   }
// }