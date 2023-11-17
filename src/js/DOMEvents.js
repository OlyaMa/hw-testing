import { CheckCard } from "./CheckCard.js";

export class DOMEvents {
  constructor() {
    this.form = document.querySelector(".form-inline");
    this.cards = document.querySelector(".cards");
    this.input = document.querySelector("#card_number");
    this.submit = document.querySelector("#submitform");
    this.res = document.querySelector(".result");
    this.checkCard = new CheckCard();
  }

  eventLuhnAlgorithm() {
    const handler = async (event) => {
      event.preventDefault();
      if (this.form.checkValidity() && this.input.value.trim()) {
        const cardNumber = document.getElementById("card_number").value;
        let resultLuhn;
        let resultLength;
        await Promise.all([
          this.checkCard.luhnAlgorithm(cardNumber),
          this.checkCard.checkCardLength(cardNumber),
        ]).then((values) => ([resultLuhn, resultLength] = values));

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
    this.input.addEventListener("input", (event) => {
      event.preventDefault();
      if (!this.input.value.trim()) {
        this.res.textContent = "";
      }
      setTimeout(() => {
        const result = this.checkCard.getCardType(this.input.value);
        Array.from(this.cards.querySelectorAll(".card")).forEach((card) =>
          card.classList.remove("opacity"),
        );
        if (this.input.value.trim() && result) {
          Array.from(this.cards.querySelectorAll(".card")).forEach((card) =>
            card.classList.add("opacity"),
          );
          const card = this.cards.querySelector(`.${result}`);
          if (card) {
            card.classList.remove("opacity");
          }
        }
      }, 700);
    });
  }
}
