/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/img/mir.jpg
const mir_namespaceObject = __webpack_require__.p + "2aa6cc70dbc67741d643.jpg";
;// CONCATENATED MODULE: ./src/img/pepsized-americanexpress01.png
const pepsized_americanexpress01_namespaceObject = __webpack_require__.p + "503b25a139436756a8b5.png";
;// CONCATENATED MODULE: ./src/img/pepsized-dinersclub02.png
const pepsized_dinersclub02_namespaceObject = __webpack_require__.p + "eed9fe770d55d73522c0.png";
;// CONCATENATED MODULE: ./src/img/pepsized-discover.png
const pepsized_discover_namespaceObject = __webpack_require__.p + "167306f1d32ceb8f1331.png";
;// CONCATENATED MODULE: ./src/img/pepsized-jcb.png
const pepsized_jcb_namespaceObject = __webpack_require__.p + "543c24744c29287e21ed.png";
;// CONCATENATED MODULE: ./src/img/pepsized-maestro.png
const pepsized_maestro_namespaceObject = __webpack_require__.p + "80d6fc95a797b878173b.png";
;// CONCATENATED MODULE: ./src/img/pepsized-mastercard.png
const pepsized_mastercard_namespaceObject = __webpack_require__.p + "f6378335254e9548b97e.png";
;// CONCATENATED MODULE: ./src/img/pepsized-visa.png
const pepsized_visa_namespaceObject = __webpack_require__.p + "14b5775b855a2a2c2997.png";
;// CONCATENATED MODULE: ./src/img/unionpay.png
const unionpay_namespaceObject = __webpack_require__.p + "91b23ce9beb5b6a40b42.png";
;// CONCATENATED MODULE: ./src/js/CheckCard.js
class CheckCard {
  #cardTypes = {
    mir: {
      numbers: Array.from({
        length: 2204 - 2200
      }, (_, i) => i + 2200),
      length: [16, 17, 18, 19]
    },
    amex: {
      numbers: [34, 37],
      length: [15]
    },
    visa: {
      numbers: [4],
      length: [13, 16, 19]
    },
    master: {
      numbers: [51, 52, 53, 54, 55, ...Array.from({
        length: 2720 - 2221
      }, (_, i) => i + 2221)],
      length: [16]
    },
    unionPay: {
      numbers: [62],
      length: [16, 17, 18, 19]
    },
    jcb: {
      numbers: Array.from({
        length: 3589 - 3527
      }, (_, i) => i + 3527),
      length: [16, 17, 18, 19]
    },
    dinersClub: {
      numbers: [36, 5501, 5558],
      length: [14, 15, 16, 17, 18, 19]
    },
    maestro: {
      numbers: [6759, 676770, 676774, 5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762, 6763],
      length: [12, 13, 14, 15, 16, 17, 18, 19]
    },
    discover: {
      numbers: [6011, 644, 645, 646, 647, 648, 649, 65],
      length: [16, 17, 18, 19]
    }
  };
  #cardType = null;
  luhnAlgorithm(cardNumber) {
    let ch = 0;
    const isOdd = cardNumber.length % 2 !== 0;
    for (let i = 0; i < cardNumber.length; i++) {
      let n = parseInt(cardNumber[i], 10);
      ch += (isOdd | 0) === i % 2 && 9 < (n *= 2) ? n - 9 : n;
    }
    return 0 === ch % 10;
  }
  getCardType(cardNumber) {
    const possibleCardSystems = [];
    for (const cardSystem in this.#cardTypes) {
      if (this.#cardTypes[cardSystem].numbers.some(cardIIN => {
        return cardNumber.startsWith(cardIIN.toString());
      })) {
        possibleCardSystems.push(cardSystem);
        break;
      }
    }
    if (possibleCardSystems.length) {
      this.#cardType = possibleCardSystems[0];
    }
    return possibleCardSystems.length === 1 ? possibleCardSystems[0] : null;
  }
  checkCardLength(number) {
    if (this.#cardType) {
      for (const cardTypeLength of this.#cardTypes[this.#cardType].length) {
        if (cardTypeLength === number.length) {
          return true;
        }
      }
    }
    return false;
  }
}
;// CONCATENATED MODULE: ./src/js/DOMEvents.js

class DOMEvents {
  constructor() {
    this.form = document.querySelector(".form-inline");
    this.cards = document.querySelector(".cards");
    this.input = document.querySelector("#card_number");
    this.submit = document.querySelector("#submitform");
    this.res = document.querySelector(".result");
    this.checkCard = new CheckCard();
  }
  eventLuhnAlgorithm() {
    const handler = async event => {
      event.preventDefault();
      if (this.form.checkValidity() && this.input.value.trim()) {
        const cardNumber = document.getElementById("card_number").value;
        let resultLuhn;
        let resultLength;
        await Promise.all([this.checkCard.luhnAlgorithm(cardNumber), this.checkCard.checkCardLength(cardNumber)]).then(values => [resultLuhn, resultLength] = values);
        if (resultLuhn && resultLength) {
          this.res.innerHTML = `The card number ${cardNumber} is valid<br>
                                  Luhn algorythm is ${resultLuhn}<br>
                                  The length of the number for this card type is ${resultLength}`;
        } else {
          this.res.innerHTML = `The card number ${cardNumber} is invalid<br>
                                  Luhn algorythm is undefined<br>
                                  The length of the number for this card type is undefined`;
        }
      }
    };
    this.form.addEventListener("submit", handler);
  }
  eventPaymentSystemCheck() {
    this.input.addEventListener("input", event => {
      event.preventDefault();
      if (!this.input.value.trim()) {
        this.res.textContent = "";
      }
      setTimeout(() => {
        const result = this.checkCard.getCardType(this.input.value);
        Array.from(this.cards.querySelectorAll(".card")).forEach(card => card.classList.remove("opacity"));
        if (this.input.value.trim() && result) {
          Array.from(this.cards.querySelectorAll(".card")).forEach(card => card.classList.add("opacity"));
          const card = this.cards.querySelector(`.${result}`);
          if (card) {
            card.classList.remove("opacity");
          }
        }
      }, 700);
    });
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

function app() {
  const evenTracker = new DOMEvents();
  evenTracker.eventLuhnAlgorithm();
  evenTracker.eventPaymentSystemCheck();
}
app();
;// CONCATENATED MODULE: ./src/index.js











/******/ })()
;
//# sourceMappingURL=main.js.map