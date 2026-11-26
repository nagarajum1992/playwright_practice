import test from "@playwright/test";

test("Playwright Special Locators", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").check();
  await page.getByLabel("Gender").selectOption("Female");
  await page.getByLabel("Employed").click();
  await page.getByPlaceholder("Password").fill("rahulshettyacademy");
  await page.getByRole("button", { name: "Submit" }).click();
  await page
    .getByText("Success! The Form has been submitted successfully!")
    .isVisible();
  await expect(
    page.getByText("Success! The Form has been submitted successfully!"),
  ).toBeVisible({ timeout: 10_000 });
  await page.getByRole("link", { name: "Shop" }).click();
  await page
    .locator("app-card")
    .filter({ hasText: "Blackberry" })
    .getByRole("button")
    .click();
});

test("Playwright test level timeout", async ({ page }) => {
  const slowExpect = expect.configure({ timeout: 9000 });
  page.setDefaultTimeout(9000);
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").check();
  await page.getByLabel("Gender").selectOption("Female");
  await page.getByLabel("Employed").click();
  await page.getByPlaceholder("Password").fill("rahulshettyacademy");
  await page.getByRole("button", { name: "Submit" }).click();
  await page
    .getByText("Success! The Form has been submitted successfully!")
    .isVisible();
  await slowExpect(
    page.getByText("Success! The Form has been submitted successfully!"),
  ).toBeVisible();
  await page.getByRole("link", { name: "Shop" }).click({ timeout: 15000 });
  await slowExpect(page.locator(".my-4").first()).toHaveText("Shop");
  await page
    .locator("app-card")
    .filter({ hasText: "Blackberry" })
    .getByRole("button")
    .click();
});
