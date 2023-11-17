import { CheckCard } from "../CheckCard";

// I want to describe test function luhnAlgorithm with 10 groups of data collection

describe.each([
  [
    "true",
    [
      ["4556252384478811", true],
      ["5182021745312517", true],
      ["341266910516363", true],
      ["6011826747068585", true],
      ["3530895277982399", true],
      ["5504516485357268", true],
      ["30315007812999", true],
      ["36463403692963", true],
      ["6304777880818326", true],
      ["6228223624220258", true],
      ["6373480128168184", true],
      ["2202200232335453", true],
    ],
  ],
  [
    "false",
    [
      ["4556252324478811", false],
      ["5182021745312527", false],
      ["341266110516363", false],
      ["6021826747068585", false],
      ["3530896277982399", false],
      ["5504516483357268", false],
      ["30313007812999", false],
      ["36464403692963", false],
      ["6304777380818326", false],
      ["6228223623220258", false],
      ["6373480121168184", false],
    ],
  ],
])("Набор данных %s", (set, tests) => {
  tests.forEach((testData) => {
    test(`luhnAlgorithm(${testData[0]} is ${testData[1]}`, () => {
      expect(new CheckCard().luhnAlgorithm(testData[0])).toBe(testData[1]);
    });
  });
});

test.each([
  ["4556252384478811", "visa"],
  ["5182021745312517", "master"],
  ["341266910516363", "amex"],
  ["6011826747068585", "discover"],
  ["3530895277982399", "jcb"],
  ["36463403692963", "dinersClub"],
  ["6304777880818326", "maestro"],
  ["6228223624220258", "unionPay"],
  ["2202200232335453", "mir"],
  ["6373480128168184", null],
  ["", null],
])("Метод getCardType для карты № %s", (data, expected) => {
  expect(new CheckCard().getCardType(data)).toBe(expected);
});

test.each([
  ["4556252384478811", true],
  ["5182021745312517", true],
  ["341266910516363", true],
  ["6011826747068585", true],
  ["3530895277982399", true],
  ["36463403692963", true],
  ["6304777880818326", true],
  ["6228223624220258", true],
  ["2202200232335453", true],
  ["63734801281681846373480128168184", false],
  ["63734", false],
  ["", false],
])("Метод checkCardLength для карты № %s", (data, expected) => {
  const ckeckCard = new CheckCard();
  ckeckCard.getCardType(data);
  expect(ckeckCard.checkCardLength(data)).toBe(expected);
});
