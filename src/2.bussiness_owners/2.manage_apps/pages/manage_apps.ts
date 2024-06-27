import { Page } from "playwright";
import { expect } from "playwright/test";
import { trimText } from "utils/utils";


export class ManageApps {
  static async clickAppStore(page: Page) {
    await page.locator('div.item_text', { hasText: "App store" }).click();
  }

  static titleList = [
    " General Ledger ",
    " Personal ",
    " App General Settings ",
  ];

  static descList = [
    " This module handles all general ledger operations. ",
    " This module manages personal information and settings. ",
    " This module contains general settings for the app. ",
  ];

  static renewList = ["80USD", "60USD", "30USD"];

  static async clickSubDomainsDropDown(page: Page) {
    await page.locator('span[role="combobox"]').click();
  }

  static async selectTheSubDomain(page: Page) {
    await page.locator(".p-dropdown-label").click();
    const subDomainName1 = await page.locator("li span").last().textContent();
    console.log("subDomainName1 ::: " + subDomainName1);

    await page.locator("li span").last().click({ force: true });
    const subDomainName2 = await page.locator(".p-dropdown-label").textContent();
    expect(trimText(subDomainName2.trim())).toEqual(trimText(subDomainName1.trim()));
  }

  static async clickSave(page: Page) {
    await page.locator(".btn_save").click();
  }

  static async navigateToAppStore(page: Page) {
    await page.locator(".item.body_b14 > button > .item_icon > .fa").click();
  }

  static async verifyNavigationToAppStoreScreen(page: Page, appName: string) {
    await expect(page.locator(":nth-child(1) > .app_description > .sec_one > .title")).toHaveText(appName);
  }

  static async clickManageAppsButton(page: Page) {
    await page.locator(":nth-child(1) > .card > .card_contant > .plan_description > .mange_app > :nth-child(1)").click();
  }

  static async verifyNavigationToTheSubDomainManageAppsScreen(page: Page, appName: string) {
    await expect(page.locator('div[class="count_of_apps"]')).toBeVisible();
    await expect(page.locator(":nth-child(1) > .app_description > .sec_one > .title", { hasText: appName })).not.toBeVisible();
  }

  static async confirmOPerationFailedDublicatedAppsOnASubDomain(page: Page) {
    await expect(page.locator("h2", { hasText: "Operation Fail" })).toBeVisible();
    await expect(page.locator('div[id="swal2-html-container"]', { hasText: "FluentValidation" })).toBeVisible();
    await expect(page.locator('span.swal2-x-mark')).toBeVisible();
    await expect(page.locator(".swal2-x-mark-line-right")).toBeVisible();
    await page.locator('button.swal2-confirm.swal2-styled').click();
  }

  static async verifySuccessAlertComponent(page: Page) {
    await expect(page.locator("#swal2-title")).toHaveText("Success");
    await expect(page.locator("#swal2-html-container")).toHaveText("Successfully added to cart");
    await expect(page.locator(".swal2-success-ring")).toBeVisible();
  }

  static async confirmSuccessAlert(page: Page) {
    await page.locator(".swal2-confirm").click();
  }

  static async clickShoppingCart(page: Page) {
    await page.locator('span.pi.pi-shopping-cart.icon_link').click();
  }

  static async verifyDisplayingStartShoppingText(page: Page) {
    await expect(page.locator(".cart_page")).toHaveText(" No items in Cart. Start Shopping");
  }

  static async verifyDisplayingRouterlinkAppStore(page: Page) {
    const link = page.locator(".cart_page > a");
    await expect(link).toBeVisible();
    await expect(link).toHaveText("Start Shopping");
    await expect(link).toHaveAttribute("href", "/bussinessowners/app-store");
    await expect(link).toHaveAttribute("routerlink", "/app-store");
  }

  static async verifyAppCountIsZero(page: Page) {
    const count = page.locator(":nth-child(5) > .count");
    await expect(count).toBeVisible();
    await expect(count).toHaveClass("count");
    await expect(count).toHaveText(" 0");
  }

  static async verifyEachAppCard(page: Page) {
    const cardsCount = await page.locator('div.card').count();
    for (let i = 0; i < cardsCount; i++) {
      await this.verifyCardData(page, i);
    }
  }

  static async verifyCardData(page: Page, index: number) {
    const card = page.locator('div.card.ng-star-inserted').nth(index);
    await expect(card.locator("div img")).toBeVisible();
    await expect(card.locator('div div div[class="title"]').nth(index)).toContainText(this.titleList[index]);
    await expect(card.locator('div div div[class="re_new"]').nth(index)).toContainText(this.renewList[index]);
    await expect(card.locator('div div div[class="rate"]').nth(index)).toContainText(this.descList[index]);
    await expect(card.locator('div div div[class="cart"] button').nth(index)).toBeEnabled();
    await expect(card.locator('div div div[class="cart"] button').nth(index)).toContainText(/add to cart/i);
  }

  static async verifyCardTitle(page: Page, index: number) {
    await expect(page.locator('div[class="title"]').nth(index)).toHaveText(this.titleList[index]);
  }

  static async verifyCardRenew(page: Page, index: number) {
    await expect(page.locator('div[class="re_new"]').nth(index)).toHaveText(this.renewList[index]);
  }

  static async verifyCardDesc(page: Page, index: number) {
    await expect(page.locator('div[class="rate"]').nth(index)).toHaveText(this.descList[index]);
  }

  static async verifyCardAddToCart(page: Page, index: number) {
    const button = page.locator('div[class="cart"] button').nth(index);
    await expect(button).toBeEnabled();
    await expect(button).toContainText(/add to cart/i);
  }

  static async clickLastSubDomainManageApp(page: Page) {
    const manageAppButton = page
  .locator('div[class="col-12 md:col-6"]')
  .last()
  .locator("button", { hasText: /manage app/i })
  .last();

await manageAppButton.scrollIntoViewIfNeeded();
await manageAppButton.click();

  }

  static async clickAddToCart(page: Page, index: number) {
    const button = page.locator('div[class="card"] div div div[class="cart"] button').nth(index);
    await button.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await button.click();
  }

  static async clickDiscardButton(page: Page) {
    await page.locator(".btn_discard").click();
  }

  static async clickDialogCancelIcon(page: Page) {
    await page.locator(".domain_header > .pi").click();
  }

  static async verifyCheckOutIconCounter(page: Page, counter: number) {
    await expect(page.locator(":nth-child(5) > .count")).toHaveText(" " + counter.toString());
  }

  static async clickCheckOutIcon(page: Page) {
    await page.locator(":nth-child(5) > .count").click();
  }

  static async navigateToMySubscriptions(page: Page) {
    await page.locator(":nth-child(1) > button > .item_text").click();
  }

  static async verifyAppName(page: Page, appName: string) {
    await expect(page.locator(".app_name", { hasText: appName })).toBeVisible();
  }

  static async verifyAppPrice(page: Page, appPrice: number) {
    await expect(page.locator(".item.ng-star-inserted", { hasText: appPrice + " USD " })).toBeVisible();
  }

  static async verifyAppDataInCheckList(page: Page, index: number, appName: string, price: string) {
    await expect(page.locator(`:nth-child(${index + 2}) > .grid > .col-4 > .app_name > :nth-child(1)`)).toHaveText(appName);
    await expect(page.locator(`:nth-child(${index + 4}) > .singel_item > .title`)).toHaveText(appName);
    await expect(page.locator(`:nth-child(${index + 2}) > .grid > :nth-child(4)`)).toHaveText(price);
    await expect(page.locator(`:nth-child(${index + 4}) > .singel_item > .price`)).toHaveText(price);
  }

  static async verifyAppDataInCheckListMMMM(page: Page, index: number) {
    const appName = await page.locator(`:nth-child(${index + 2}) > .grid > .col-4 > .app_name > :nth-child(1)`).textContent();
    await expect(page.locator(`:nth-child(${index + 4}) > .singel_item > .title`)).toHaveText(appName);
    const price = await page.locator(`:nth-child(${index + 2}) > .grid > :nth-child(4)`).textContent();
    await expect(page.locator(`:nth-child(${index + 4}) > .singel_item > .price`)).toHaveText(price);
  }

  static async verifyAppDataInCheckListXXXXX(page: Page) {
    const elements = page.locator('div.data_table div div.grid.ng-star-inserted');
    const count = await elements.count();

    if (count > 0) {
      for (let index = 0; index < count; index++) {
        const appName = await page.locator(`:nth-child(${index + 2}) > .grid > .col-4 > .app_name > :nth-child(1)`).textContent();
        await expect(page.locator(`:nth-child(${index + 4}) > .singel_item > .title`)).toHaveText(appName);

        const price = await page.locator(`:nth-child(${index + 2}) > .grid > :nth-child(4)`).textContent();
        await expect(page.locator(`:nth-child(${index + 4}) > .singel_item > .price`)).toHaveText(price);
      }
    }
  }

  static async verifyDisplayingItemsCountInCheckList(page: Page, count: number) {
    await expect(page.locator(".total_items > .title")).toHaveText(" Items(" + count + ") ");
  }

  static async verifyDisplayingSumItemsPriceInCheckList(page: Page, total: number) {
    await expect(page.locator('div.total_items div.price')).toHaveText(" " + total + " ");
  }

  static async clickCheckOut(page: Page) {
    await page.locator(".Check_out").click();
  }

  static async cancelCheckoutButton(page: Page) {
    await page.locator(":nth-child(2) > .grid > :nth-child(5) > .btn_action > .pi").click();
  }

  static async deleteFromCheckOutList(page: Page) {
    await page.locator('button.pi.pi-trash.delet').last().click();
  }

  static async verifySuccessCheckOut(page: Page) {
    await expect(page.locator("#swal2-html-container")).toHaveText("Successfully checked out");
    await expect(page.locator(".swal2-confirm")).toHaveText("OK");
    await page.locator(".swal2-confirm").click();
    await expect(page.locator(".cover")).toBeVisible();
    await expect(page.locator(".text")).toHaveText(" Succefully ");
  }

  static async verifySuccessDeletePopUp(page: Page) {
    await expect(page.locator("h2")).toContainText(/Are you sure?/i);
    await expect(page.locator('div[id="swal2-html-container"]')).toContainText(/You won't be able to revert this!/i);
    await expect(page.locator('button.swal2-confirm.swal2-styled.swal2-default-outline')).toContainText(/Yes, Change Status/i);
    await expect(page.locator('div.swal2-icon-content', { hasText: "!" })).toBeVisible();
  }

  static async confirmDeleteButton(page: Page) {
    await page.locator('button.swal2-confirm.swal2-styled.swal2-default-outline').click();
  }
}
