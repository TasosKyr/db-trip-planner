import { test, expect } from "@playwright/test";

test("search page is loaded successfully, performs search and returns results", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");
  await expect(page).toHaveTitle(/Trip Planner/);

  const searchButton = page.locator("data-test-id=search-btn");

  await expect(searchButton).toHaveText("SELECT STATIONS");

  const originInput = page.locator("data-test-id=origin-input");
  originInput.fill("Berlin");
  
  const originStation = page.locator("data-test-id=station-0");
  await originStation.click()
  
  const destinationInput = page.locator("data-test-id=destination-input");
  destinationInput.fill("Munich");

  const destinationStation = page.locator("data-test-id=station-0");
  await destinationStation.click()

  await expect(searchButton).toHaveText("TAKE ME THERE");

  await searchButton.click();

  const firstResultsItem = await page.locator("data-test-id=search-result-0")
  await expect(firstResultsItem).toBeVisible()
});
