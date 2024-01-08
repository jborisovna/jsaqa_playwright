const { test, expect } = require("@playwright/test");
const { describe } = require("node:test");
const user = require("../user");



describe("Authorization", async ({page}) => {
  test("Successful authorization", async ({page}) => {

    await page.goto("https://netology.ru/?modal=sign_in");
    await page.getByPlaceholder("Email").fill(user.email);
    await page.getByPlaceholder("Пароль").fill(user.password);
    await page.getByTestId("login-submit-btn").click();
    await expect(await page.locator("h2")).toContainText("Моё обучение", {
      timeout: 15000,
  });
});

test("Failed authorization", async ({page}) => {

  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").fill("janedoe@test.ru");
  await page.getByPlaceholder("Пароль").fill("fakepass");
  await page.getByTestId("login-submit-btn").click();
  await expect(page.getByTestId("login-error-hint")).toHaveText("Вы ввели неправильно логин или пароль", {
    timeout: 15000,
  });
});
})