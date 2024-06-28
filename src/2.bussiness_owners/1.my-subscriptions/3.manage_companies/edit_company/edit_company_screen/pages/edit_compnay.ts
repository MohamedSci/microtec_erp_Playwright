import { CompanyData } from '../../../data/company_data';
import { Page, expect } from 'playwright/test';
import { validateTableHeaders } from 'utils/playwrightUtils';

export class EditCompanyScreen {
  static async clickManageCompanies(page: Page) {
    await page.locator('button.mange.body_b14.Companies').first().click();
    await expect(page).toHaveURL(/company/);
    await expect(page.locator('.p-breadcrumb')).toContainText(/company list/i);
  }

  static async clickPageBody(page: Page) {
    await page.locator('div.grid').first().click();
  }

  static async clickCompanyToEdit(page: Page) {
    await page.locator('span.pi.pi-pencil.p-button-icon.ng-star-inserted').first().scrollIntoViewIfNeeded();
    await page.locator('span.pi.pi-pencil.p-button-icon.ng-star-inserted').first().click();
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/edit/);
  }

  static async clickAddressTab(page: Page) {
    await page.locator('#addres > a').click();
    await expect(page.locator('label.form-label')).toContainText(/address/i);
    await expect(page.locator('label.form-label')).toHaveCount(6);
  }

  static async clickContactTab(page: Page) {
    await page.locator('#contact > a').click();
    await expect(page.locator('label.form-label')).toContainText(/contact/i);
    await expect(page.locator('label.form-label')).toHaveCount(8);
  }

  static async clickLegalTab(page: Page) {
    await page.locator('#legal > a').click();
    await expect(page.locator('label.form-label')).toContainText(/tax id/i);
    await expect(page.locator('label.form-label')).toHaveCount(16);
  }

  static async clickHierarchyTab(page: Page) {
    await page.locator('#hierarchy > a').click();
    await expect(page.locator('label.form-label')).toContainText(/company type/i);
    await expect(page.locator('label.form-label')).toHaveCount(1);
  }

  static async clickBranchesTab(page: Page) {
    await page.locator('#branches > a').click();
    await expect(page.locator('th')).toContainText(/branch name/i);
    await expect(page.locator('th')).toHaveCount(9);
  }

  static async validateBranchesTab(page: Page) {
    await validateTableHeaders(page, CompanyData.branchesThSelector, CompanyData.branchHeadersList);
  }

  static async clickEditBtn(page: Page) {
    await page.locator('.save').filter({ hasText: /edit/i }).click();
  }

  static async clickSaveBtn(page: Page) {
    const saveButton = page.locator('.save').filter({ hasText: /save/i });
    await saveButton.scrollIntoViewIfNeeded();
    await saveButton.click();
  }

  static async clickCountryDropDown(page: Page) {
    await page.locator('.p-dropdown-label').click();
  }

  static async selectCountry(page: Page) {
    await page.locator('li[aria-label="United Arab Emirates"]').click({ force: true });
    await this.clickCountryDropDown(page);
    await this.clickAddressTab(page);
  }

  static async inputCity(page: Page, str: string) {
    await page.locator(':nth-child(3) > lib-form-group > .group > .ng-untouched > .p-inputtext').fill(str);
  }

  static async inputRegion(page: Page, str: string) {
    await page.locator(':nth-child(4) > lib-form-group > .group > .ng-untouched > .p-inputtext').fill(str);
  }

  static async inputAddress(page: Page, str: string) {
    await page.locator(':nth-child(5) > lib-form-group > .group > .ng-untouched > .p-inputtext').fill(str);
  }

  static async inputLangitude(page: Page, str: string) {
    await page.locator(':nth-child(7) > lib-form-group > .group > .ng-untouched > .p-inputtext').fill(str);
  }

  static async inputLatitude(page: Page, str: string) {
    await page.locator(':nth-child(6) > lib-form-group > .group > .ng-untouched > .p-inputtext').fill(str);
  }

  static async treatSuccessAlert(page: Page) {
    await expect(page.locator('div.swal2-success')).toBeVisible();
    await expect(page.locator('#swal2-title')).toBeVisible();
    await expect(page.locator('#swal2-html-container')).toBeVisible();
    await page.locator('.swal2-confirm').click();
  }

  static async selectCountryCode(page: Page) {
    await page.locator('span[role="combobox"]').first().click();
    await page.locator('span').filter({ hasText: '971' }).click();
    await page.locator('span[role="combobox"]').first().click();
    await this.clickContactTab(page);
  }

  static async selectSecCountryCode(page: Page) {
    await page.locator('div.p-dropdown.p-component.p-inputwrapper').nth(1).scrollIntoViewIfNeeded();
    await page.locator('div.p-dropdown.p-component.p-inputwrapper').nth(1).click({ force: true });
    await page.locator('span').filter({ hasText: '+20' }).click({ force: true });
    await page.locator('div.p-dropdown.p-component.p-inputwrapper').nth(1).click({ force: true });
    await this.clickContactTab(page);
  }

  static async inputTelephon(page: Page, str: string, index: number) {
    await page.locator('input[type="tel"]').nth(index).fill(str);
  }

  static async inputCompnayName(page: Page, str: string) {
    await page.locator('input[type="text"]').first().fill(str);
  }

  static async inputCompnayEmail(page: Page, str: string) {
    await page.locator('input[type="text"]').nth(1).fill(str);
  }

  static async inputCompanyAddress(page: Page, str: string) {
    await page.locator('input[type="text"]').nth(2).fill(str);
  }

  static async inputContactPersonal(page: Page, str: string) {
    await page.locator('input[type="text"]').nth(3).fill(str);
  }

  static async inputContactPersonalPosition(page: Page, str: string) {
    await page.locator('input[type="text"]').nth(4).fill(str);
  }

  static async inputContactPersonalEmail(page: Page, str: string) {
    await page.locator('input[type="text"]').nth(5).fill(str);
  }

  static async inputCompanyNameE(page: Page, str: string) {
    await page.locator('input[type="text"]').first().fill(str);
  }

  static async inputCompanyEmail(page: Page, str: string) {
    await page.locator('input[type="text"]').nth(1).fill(str);
  }

  static async inputOrganizationUnit(page: Page, str: string) {
    await page.locator('input[type="text"]').nth(2).fill(str);
  }

  static async inputOrganization(page: Page, str: string) {
    await page.locator('input[type="text"]').nth(3).fill(str);
  }

  static async inputTaxID(page: Page, str: string) {
    await page.locator('input[type="text"]').nth(4).fill(str);
  }

  static async inputCommercialID(page: Page, str: string) {
    await page.locator('input[type="text"]').nth(5).fill(str);
  }

  static async inputRegisteredAddress(page: Page, str: string) {
    await page.locator('input[type="text"]').nth(6).fill(str);
  }

  static async inputBusinessCategory(page: Page, str: string) {
    await page.locator('input[type="text"]').nth(7).fill(str);
  }

  static async inputStreetName(page: Page, str: string) {
    await page.locator('input[type="text"]').nth(8).fill(str);
  }

  static async inputCitySubdivisionName(page: Page, str: string) {
    await page.locator('input[type="text"]').nth(9).fill(str);
  }

  static async inputCompanyAddCityName(page: Page, str: string) {
    await page.locator('input[type="text"]').nth(10).fill(str);
  }

  static async inputPostalZone(page: Page, str: string) {
    await page.locator('input[type="text"]').nth(11).fill(str);
  }

  static async inputCountrySubentity(page: Page, str: string) {
    await page.locator('input[type="text"]').nth(12).fill(str);
  }

  static async inputBuildingNumber(page: Page, str: string) {
    await page.locator('input[type="text"]').nth(13).fill(str);
  }

  static async inputAdditionalStreetName(page: Page, str: string) {
    await page.locator('input[type="text"]').nth(14).fill(str);
  }

  static async inputRegistrationName(page: Page, str: string) {
    await page.locator('input[type="text"]').nth(15).fill(str);
  }

  static async validateCompanyType(page: Page, str: string) {
    var form_label = page.locator('label.form-label');
    await expect(form_label).toContainText(/company type/i);
    await expect(page.locator('div.view')).toContainText(str);
  }
}

// Helper function to validate table headers
// async function validateTableHeaders(page: Page, selector: string, headers: string[]) {
//   const headerElements = await page.locator(selector).elementHandles();
//   for (let i = 0; i < headers.length; i++) {
//     await expect(headerElements[i]).toHaveText(headers[i]);
//   }
// }
