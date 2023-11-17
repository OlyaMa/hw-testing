export class CheckCard {
  #cardTypes = {
    mir: {
      numbers: Array.from({ length: 2204 - 2200 }, (_, i) => i + 2200),
      length: [16, 17, 18, 19],
    },
    amex: { numbers: [34, 37], length: [15] },
    visa: { numbers: [4], length: [13, 16, 19] },
    master: {
      numbers: [
        51,
        52,
        53,
        54,
        55,
        ...Array.from({ length: 2720 - 2221 }, (_, i) => i + 2221),
      ],
      length: [16],
    },
    unionPay: { numbers: [62], length: [16, 17, 18, 19] },
    jcb: {
      numbers: Array.from({ length: 3589 - 3527 }, (_, i) => i + 3527),
      length: [16, 17, 18, 19],
    },
    dinersClub: { numbers: [36, 5501, 5558], length: [14, 15, 16, 17, 18, 19] },
    maestro: {
      numbers: [
        6759, 676770, 676774, 5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762,
        6763,
      ],
      length: [12, 13, 14, 15, 16, 17, 18, 19],
    },
    discover: {
      numbers: [6011, 644, 645, 646, 647, 648, 649, 65],
      length: [16, 17, 18, 19],
    },
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
      if (
        this.#cardTypes[cardSystem].numbers.some((cardIIN) => {
          return cardNumber.startsWith(cardIIN.toString());
        })
      ) {
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
