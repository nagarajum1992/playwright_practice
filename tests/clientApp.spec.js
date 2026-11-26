import test, { expect } from "@playwright/test";

test("Client App Plawright test", async ({ page }) => {
  const userName = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client/");
  await userName.fill("rajumn1712@gmail.com");
  await password.fill("Iamking@00");
  const signInButton = page.locator("[name='login']");
  await signInButton.click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
  const count = await products.count();
  for (let i = 0; i < count; ++i) {
    if (
      (await products.nth(i).locator("b").textContent()) === "iphone 13 pro"
    ) {
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
  expect(bool).toBeTruthy();
  await page.locator("text=Checkout").click();
  await page
    .locator("[placeholder*='Country']")
    .pressSequentially("ind", { delay: 100 });
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; ++i) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }
  expect(await page.locator(".user__name [type='text']").first()).toHaveText(
    "rajumn1712@gmail.com",
  );
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. ",
  );
  // await page.locator(".em -spacer-1 .ng-star-inserted").waitFor();
  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(orderId);
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = page.locator("tbody tr");
  const count1 = await rows.count();
  for (let i = 0; i < count1; ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
