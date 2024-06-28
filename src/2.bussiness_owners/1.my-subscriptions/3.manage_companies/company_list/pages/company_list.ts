import { Page } from "playwright";
import { expect } from "playwright/test";

export class CompanyList {

  static async clickToNavigateCompanyEdit(page:Page) {
    await page.locator('span.pi.pi-pencil.p-button-icon.ng-star-inserted').first().scrollIntoViewIfNeeded();
    await page.locator('span.pi.pi-pencil.p-button-icon.ng-star-inserted').first().click();
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/.*edit/);
  }

  static async clickDeactivateSlider(page:Page,row: number) {
    await page.locator(`:nth-child(${row}) > :nth-child(7) > .checked > .p-element > .p-inputswitch > .p-inputswitch-slider`).click();
  }

  static async confirmInactivePopUp(page:Page) {
    await page.locator('.swal2-confirm').click({ force: true });
    await expect(page.locator('.inactive')).toBeVisible();
  }

  static async checkPaginator(page:Page) {
    await expect(page.locator('.p-paginator')).toBeVisible();
    await expect(page.locator('.p-paginator-current')).toBeVisible();
    await expect(page.locator('.p-dropdown-trigger')).toBeVisible();
  }

  static async checkActivationDeactivationSwitching(page:Page) {
    const rowSelector = ':nth-child(1) > :nth-child(7) > .checked > .ng-untouched > .p-inputswitch > .p-inputswitch-slider';
    const confirmSelector = '.swal2-confirm';
    const successMessage = {
      deactivate: 'Company deactivated Successfully',
      activate: 'Company activated Successfully',
    };
    // Deactivate
    await page.locator(rowSelector).click({ force: true });
    await expect(page.locator('#swal2-title')).toHaveText('Are you sure?');
    await expect(page.locator('.swal2-icon')).toBeVisible();
    await expect(page.locator('#swal2-html-container')).toHaveText("You won't be able to revert this!");
    await expect(page.locator('.swal2-cancel')).toBeVisible();
    await expect(page.locator('.swal2-cancel')).toBeEnabled();
    await expect(page.locator(confirmSelector)).toBeVisible();
    await expect(page.locator(confirmSelector)).toBeEnabled();
    await page.locator(confirmSelector).click();
    await expect(page.locator('#swal2-title')).toHaveText('Success');
    await expect(page.locator('#swal2-html-container')).toHaveText(successMessage.deactivate);
    await expect(page.locator('.swal2-success-ring')).toBeVisible();
    await expect(page.locator(confirmSelector)).toBeVisible();
    await expect(page.locator(confirmSelector)).toBeEnabled();
    await page.locator(confirmSelector).click();
    // Check the Switch Button to have text 'Deactivate'
    await expect(page.locator('.inactive')).toHaveText(' Deactivate ');
    // Activate
    await page.locator(rowSelector).click({ force: true });
    await expect(page.locator('.swal2-icon-content')).toHaveText('!');
    await expect(page.locator('#swal2-title')).toHaveText('Are you sure?');
    await expect(page.locator('#swal2-html-container')).toHaveText("You won't be able to revert this!");
    await expect(page.locator('.swal2-cancel')).toBeVisible();
    await expect(page.locator('.swal2-cancel')).toBeEnabled();
    await expect(page.locator(confirmSelector)).toBeVisible();
    await expect(page.locator(confirmSelector)).toBeEnabled();
    await page.locator(confirmSelector).click();
    await expect(page.locator('#swal2-title')).toHaveText('Success');
    await expect(page.locator('.swal2-success-ring')).toBeVisible();
    await expect(page.locator('#swal2-html-container')).toHaveText(successMessage.activate);
    await expect(page.locator(confirmSelector)).toBeVisible();
    await expect(page.locator(confirmSelector)).toBeEnabled();
    await page.locator(confirmSelector).click();

    // Check the Switch Button to have text 'Activate'
    await expect(page.locator(':nth-child(1) > :nth-child(7) > .checked > .active')).toHaveText(' Activate ');
    await expect(page.locator(':nth-child(1) > :nth-child(7) > .checked > .active')).toBeVisible();
  }
}
