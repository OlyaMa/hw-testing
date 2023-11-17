/**
 * @jest-environment jsdom
 */

import { DOMEvents } from "../DOMEvents";

test.each([
  ["valid", "4556252384478811", true],
  ["invalid", "2202111111252384478811", false],
])("The card number is %s with JsDOM", (expected, number, bool) => {
  document.body.innerHTML = `
    <div class="col-md-5">
      <h3>Check your credit card number</h3>
      <ul class="cards list-unstyled">
        <li><span class="card visa" title="Visa">Visa</span></li>
        <li><span class="card master" title="Mastercard">Mastercard</span></li>
        <li><span class="card amex" title="American Express">American Express</span></li>
        <li><span class="card unionPay" title="UnionPay">UnionPay</span></li>
        <li><span class="card jcb" title="JCB">JCB</span></li>
        <li><span class="card mir" title="Mir">Mir</span></li>
        <li><span class="card maestro" title="Maestro">Mir</span></li>
        <li><span class="card discover" title="Discover">Discover</span></li>
        <li><span class="card dinersClub" title="Dinners">Dinners club international</span></li>
      </ul>
      <form id="form" class="form-inline" novalidate="novalidate">
        <div class="form-group">
          <input class="form-control col-md-6" id="card_number" name="card_number" type="text"
                 placeholder="Credit card number" data-original-title="" title="" data-keeper-lock-id="k-2ne7ykj25xo">
          <button id="submitform" class="btn btn-success">Click to Validate</button>
        </div>
      </form>
      </div>
      <div>
      <p class="result"></p>
    </div>`;

  const testPage = new DOMEvents();
  testPage.eventLuhnAlgorithm();
  testPage.eventPaymentSystemCheck();

  testPage.input.value = number;
  testPage.submit.click();
  setTimeout(() => {
    expect(
      testPage.res.innerHTML.includes(
        `The card number ${number} is ${expected}`,
      ),
    ).toBe(bool);
  }, 1000);
});
