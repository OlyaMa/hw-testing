import puppeteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(30000); // default puppeteer timeout

describe("Credit Card Validator form", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = "http://localhost:9000";

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on("error", reject);
      server.on("message", (message) => {
        if (message === "ok") {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      headless: true, // show gui
      slowMo: 100,
      devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test.each([
    ["valid", "4556252384478811", true],
    ["invalid", "2202111111252384478811", false],
  ])("The cardddd number is %s", async (expected, number, bool) => {
    await page.goto(baseUrl);
    const form = await page.$(".form-inline");
    const input = await form.$("#card_number");
    const submit = await form.$("#submitform");

    await input.type(number);

    // Определяет, выбрана ли картинка с правильной картой
    await expect(
      await page.evaluate(() => {
        const card = document.querySelector(".visa");
        return card && !card.classList.contains("opacity");
      }),
    ).toBe(bool);

    await submit.click();

    // Определяет, прошел ли номер карты валидацию по двум алгоритмам: Луна и длины номера;
    const textToWaitFor = `The card number ${number} is ${expected}`;
    await page.waitForFunction(
      (text) => document.querySelector(".result").innerHTML.includes(text),
      {},
      textToWaitFor,
    );
  });
});
