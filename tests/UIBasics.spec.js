const { test, expect } = require("@playwright/test");

test("Browser Context Plawright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  const password = page.locator("#password");
  const signInButton = page.locator("[name='login']");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await userName.fill("rahulshetty");
  await password.fill("learning");
  await signInButton.click();
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");
  await userName.fill("");
  await password.fill("");
  await userName.fill("rahulshettyacademy");
  await password.fill("Learning@830$3mK2");
  await signInButton.click();
  await expect(page.locator(".card-body b")).toHaveCount(4);
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
});

test("UI Controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("#username");
  const documentLink = page.locator("[href*='documents-request']");
  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("consult");
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();
  await expect(page.locator(".radiotextsty").last()).toBeChecked();
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();
  await expect(documentLink).toHaveAttribute("class", "blinkingText");
});

test.only("Child Windows", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("[href*='documents-request']");
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    documentLink.click(),
  ]);
  const text = await newPage.locator(".red").textContent();
  console.log(text);
  const arrayText = text.split("@");
  const domain = arrayText[1].split(" ")[0];
  console.log(domain);
  await page.locator("#username").fill(domain);
  console.log(await page.locator("#username").inputValue());
});
