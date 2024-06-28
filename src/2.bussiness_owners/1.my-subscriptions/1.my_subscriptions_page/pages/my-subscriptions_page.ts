import { Page } from "playwright";
import { expect } from "playwright/test";

export class MySubscriptionsPage {

 static async clickAddDomainSpaceBtn(page:Page) {
    await page.waitForTimeout(500);
    const button = page.locator('div[class="plan_header"] button');
    await expect(button).toBeVisible();
    await button.click({ force: true });
  }
}
