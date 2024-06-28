import { Page, expect } from 'playwright/test';

export class EditCompanyScreenVerify {
  static async clickCountryDropDown(page: Page) {
    await page.locator('.p-dropdown-label').click();
  }

  static async selectCountry(page: Page) {
    await page.locator('#pn_id_10_56').click();
  }

  static async verifyCity(page: Page, str: string) {
    await expect(page.locator(':nth-child(3) > lib-form-group > .group > .ng-untouched > .p-inputtext')).toHaveValue(str);
  }

  static async verifyRegion(page: Page, str: string) {
    await expect(page.locator(':nth-child(4) > lib-form-group > .group > .ng-untouched > .p-inputtext')).toHaveValue(str);
  }

  static async verifyAddress(page: Page, str: string) {
    await expect(page.locator(':nth-child(5) > lib-form-group > .group > .ng-untouched > .p-inputtext')).toHaveValue(str);
  }

  static async verifyLangitude(page: Page, str: string) {
    await expect(page.locator(':nth-child(7) > lib-form-group > .group > .ng-untouched > .p-inputtext')).toHaveValue(str);
  }

  static async verifyLatitude(page: Page, str: string) {
    await expect(page.locator(':nth-child(6) > lib-form-group > .group > .ng-untouched > .p-inputtext')).toHaveValue(str);
  }

  static async selectCountryCode(page: Page) {
    await page.locator('span[role="combobox"]').click();
    await page.locator('li#pn_id_13_1').click();
    await page.locator('span[role="combobox"]').click();
  }

  static async verifyTelephon(page: Page, str: string, index: number) {
    await expect(page.locator('input[type="tel"]').nth(index)).toHaveValue(str);
  }

  static async verifyCompnayEmail(page: Page, str: string) {
    await expect(page.locator('input[type="text"]').nth(1)).toHaveValue(str);
  }

  static async verifyCompanyAddress(page: Page, str: string) {
    await expect(page.locator('input[type="text"]').nth(2)).toHaveValue(str);
  }

  static async verifyPersonal(page: Page, str: string) {
    await expect(page.locator('input[type="text"]').nth(3)).toHaveValue(str);
  }

  static async verifyContactPersonalPosition(page: Page, str: string) {
    await expect(page.locator('input[type="text"]').nth(4)).toHaveValue(str);
  }

  static async verifyContactPersonalEmail(page: Page, str: string) {
    await expect(page.locator('input[type="text"]').nth(5)).toHaveValue(str);
  }

  static async verifyCompanyNameE(page: Page, str: string) {
    await expect(page.locator('input[type="text"]').nth(0)).toHaveValue(str);
  }

  static async verifyCompanyEmail(page: Page, str: string) {
    await expect(page.locator('input[type="text"]').nth(1)).toHaveValue(str);
  }

  static async verifyOrganizationUnit(page: Page, str: string) {
    await expect(page.locator('input[type="text"]').nth(2)).toHaveValue(str);
  }

  static async verifyOrganization(page: Page, str: string) {
    await expect(page.locator('input[type="text"]').nth(3)).toHaveValue(str);
  }

  static async verifyTaxID(page: Page, str: string) {
    await expect(page.locator('input[type="text"]').nth(4)).toHaveValue(str);
  }

  static async verifyCommercialID(page: Page, str: string) {
    await expect(page.locator('input[type="text"]').nth(5)).toHaveValue(str);
  }

  static async verifyRegisteredAddress(page: Page, str: string) {
    await expect(page.locator('input[type="text"]').nth(6)).toHaveValue(str);
  }

  static async verifyBusinessCategory(page: Page, str: string) {
    await expect(page.locator('input[type="text"]').nth(7)).toHaveValue(str);
  }

  static async verifyStreetName(page: Page, str: string) {
    await expect(page.locator('input[type="text"]').nth(8)).toHaveValue(str);
  }

  static async verifyCitySubdivisionName(page: Page, str: string) {
    await expect(page.locator('input[type="text"]').nth(9)).toHaveValue(str);
  }

  static async verifyCompanyAddCityName(page: Page, str: string) {
    await expect(page.locator('input[type="text"]').nth(10)).toHaveValue(str);
  }

  static async verifyPostalZone(page: Page, str: string) {
    await expect(page.locator('input[type="text"]').nth(11)).toHaveValue(str);
  }

  static async verifyCountrySubentity(page: Page, str: string) {
    await expect(page.locator('input[type="text"]').nth(12)).toHaveValue(str);
  }

  static async verifyBuildingNumber(page: Page, str: string) {
    await expect(page.locator('input[type="text"]').nth(13)).toHaveValue(str);
  }

  static async verifyAdditionalStreetName(page: Page, str: string) {
    await expect(page.locator('input[type="text"]').nth(14)).toHaveValue(str);
  }

  static async verifyRegistrationName(page: Page, str: string) {
    await expect(page.locator('input[type="text"]').nth(15)).toHaveValue(str);
  }

  static async validateCompanyType(page: Page, str: string) {
    await expect(page.locator('label.form-label')).toContainText(/company type/i);
    await expect(page.locator('div.view')).toContainText(str);
  }
}
