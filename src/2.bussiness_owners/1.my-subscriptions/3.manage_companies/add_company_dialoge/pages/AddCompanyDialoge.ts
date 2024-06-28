import { Page } from "playwright";
import { expect } from "playwright/test";

export class AddCompanyDialog {
  static async navigateToTheLatestScreen(page: Page) {
    const text = await page.locator(".p-paginator-current").textContent();
    const currentPage = text.split(" of ")[1].trim();
    if (parseInt(currentPage) > 1) {
      await page.locator(`[aria-label="${currentPage}"]`).click();
    }
  }

  static async clickCancelButton(page: Page) {
    await page.locator('div.pi.pi-times.cancel').click();
  }

  static async clickAddCompanyButton(page: Page) {
    await page.locator(".p-button-label").click();
  }

  static async clickSaveButton(page: Page) {
    await page.locator("button.save").nth(1).click();
  }

  static async clickEditBtn(page: Page) {
    await page.locator('button:has-text(" Save and Edit ")').click();
  }

  static async treatSuccessAlert(page: Page) {
    await page.locator("div.swal2-success").isVisible();
    await page.locator("#swal2-title").isVisible();
    await page.locator("#swal2-html-container").isVisible();
    await page.locator(".swal2-confirm").click();
  }

  static async verifyElementsWithoutValues(page: Page) {
    await page.locator(".p-button-label").click();
    await expect(page.locator('input[type="text"]').nth(1)).not.toHaveValue("");
    await expect(page.locator('input[type="text"]').nth(2)).not.toHaveValue("");
    await expect(page.locator("li#pn_id_12_0")).not.toBeVisible();
  }

  static async inputCompanyName(page: Page, str: string) {
    await page.locator('input[type="text"]').nth(1).fill(str);
  }

  static async inputBranchName(page: Page, str: string) {
    await page.locator('input[type="text"]').nth(2).fill(str);
  }

  static async clearCompanyName(page: Page) {
    await page.locator('input[type="text"]').nth(1).clear();
  }

  static async clearBranchName(page: Page) {
    await page.locator('input[type="text"]').nth(2).clear();
  }

  static async chooseHoldingCompanyType(page: Page) {
    await page.locator("div#pn_id_12").click();
    await page.locator("li#pn_id_12_0").click();
    await AddCompanyDialog.clickTheDialogeTitle(page);
  }

  static async chooseSubsidaryCompanyType(page: Page) {
    await page.locator("div#pn_id_12").click();
    await page.locator("li#pn_id_12_1").click();
    await AddCompanyDialog.clickTheDialogeTitle(page);
  }

  static async inputAllReqData(page: Page) {
    await page.locator('input[type="text"]').nth(1).fill("co1");
    await page.locator('input[type="text"]').nth(2).fill("br1");
    await page.locator(
      'span.p-element.p-dropdown-label.p-inputtext.p-dropdown-label-empty.ng-star-inserted'
    ).click();
    await page.waitForTimeout(1000);
    await page.locator("li:has-text('Holding')").click();
  }

  static async verifyDialogeDisapears(page: Page) {
    await page.waitForTimeout(500);
    await expect(page.locator('button:has-text(" Save and Edit ")')).not.toBeVisible();
  }

  static async verifyDialogeDisplaying(page: Page) {
    await AddCompanyDialog.clickSaveButton(page);
    await expect(page.locator('button:has-text(" Save and Edit ")')).toBeVisible();
    await page.locator('button:has-text(" Save and Edit ")').click();
    await page.waitForTimeout(500);
    await expect(page.locator("button.save")).toBeVisible();
  }

  static async clickTheDialogeTitle(page: Page) {
    await page.locator('div.title').nth(0).click();
  }

  static async clickPageDropDown(page: Page) {
    const itemCount = await page.locator("table tr").count();
    if (itemCount > 10) {
      await page.locator("div.p-dropdown-trigger").click();
      await page.locator('li[aria-label="15"]').click();
      await page.locator("div.p-dropdown-trigger").click();
      await page.locator("tr").nth(0).click();
    }
  }
}
