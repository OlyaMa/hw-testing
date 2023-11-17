import { DOMEvents } from "./DOMEvents.js";

function app() {
  const evenTracker = new DOMEvents();
  evenTracker.eventLuhnAlgorithm();
  evenTracker.eventPaymentSystemCheck();
}

app();
