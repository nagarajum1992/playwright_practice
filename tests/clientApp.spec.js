import test from "@playwright/test";

test("Browser Context Plawright test", async ({ page }) => {
  const userName = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  await page.goto("https://rahulshettyacademy.com/client/");
  await userName.fill("rajumn1712@gmail.com");
  await password.fill("Iamking@00");
  const signInButton = page.locator("[name='login']");
  await signInButton.click();
  await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
});
