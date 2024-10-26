import { test, expect } from '@playwright/test';

const generateRandomEmail = (): string => {
  const randomPart = Math.random().toString(36).substring(2, 11);
  return `test${randomPart}@test.com`;
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const UI_URL = 'http://localhost:3000/'

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  // click the signIn link
  await page.getByRole("link", {name: "Sign In"}).click();

  // check if the login page is open
  await expect(page.getByRole('heading', {name: 'Sign In'})).toBeVisible()

  // fill in email and password fields of the form
  await page.locator("[name=email]").fill('pet@pet.pet')
  await page.locator("[name=password]").fill('123456')

  // submit the signIn form
  await page.getByRole("button", {name: 'Login'}).click()

  // Checking for successful login
  await expect(page.getByText('Login is successful')).toBeVisible()
  await expect(page.getByRole('link', {name: 'My booking'})).toBeVisible()
  await expect(page.getByRole('link', {name: 'My hotels'})).toBeVisible()
  await expect(page.getByRole('button', {name: 'Sign Out'})).toBeVisible()
});

test("should allow the user to register", async ({page}) => {
  await page.goto(UI_URL);

  // click the signIn link
  await page.getByRole("link", {name: "Sign In"}).click();

  // click the register link
  await page.getByRole("link", {name: 'Create an account here'}).click()

  // check if the register page is open
  await expect(page.getByRole('heading', {name: 'Create an Account'})).toBeVisible()

  // fill in firstName, lastName, email and password fields of the form
  await page.locator("[name=firstName]").fill('Stepan')
  await page.locator("[name=lastName]").fill('Ivanov')
  await page.locator("[name=email]").fill(generateRandomEmail())
  await page.locator("[name=password]").fill('123456')
  await page.locator("[name=confirmPassword]").fill('123456')

  // submit the register form
  await page.getByRole("button", {name: 'Create Account'}).click()

  // Checking for successful register
  await expect(page.getByText('User registered')).toBeVisible()

  await delay(5000)
})
