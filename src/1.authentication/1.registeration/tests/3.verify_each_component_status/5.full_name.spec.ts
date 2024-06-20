import test, { expect } from "playwright/test";
import { RegistrationPage } from "../../pages/RegistrationPage";

// Assuming your data file is named "auth_data.json" (adjust the path if needed)
interface AuthData {
  fullNameLower: string;
  fullNameUpper: string;
  fullNameE100: string; // Assuming this is a test case with 100 characters
}
const authData: AuthData = require('../../../data/auth_data.json');

// Assuming your RegistrationPage class is a separate file (adjust the path if needed)

test.describe('Verify Full Name component Status on the Registerion page', ()=> {


  test.beforeEach(async ({ page }) => {
    await RegistrationPage.visit(page);
  });

  test('To Verify FullName is Required Message', (async ({ page }) => {
    // Arabic
    expect(await RegistrationPage.checkIsRequiredMsg(page, "span#FullName-error", false)).toBeFalsy();
    // English
    await RegistrationPage.clickLangButton(page);
    expect(await RegistrationPage.checkIsRequiredMsg(page, "span#FullName-error", true)).toBeTruthy();
  }));

  test('En: Valid Full Name Formats',(async ({ page }) => {
    await RegistrationPage.clickLangButton(page);
    await RegistrationPage.checkFullNameLabel(page,'Full Name');
    await RegistrationPage.typeFullName(page,authData.fullNameLower);
    await RegistrationPage.typeFullName(page,authData.fullNameUpper);
    // Consider adding a test for edge cases like exceeding character limit (if applicable)
    await RegistrationPage.typeFullName(page,authData.fullNameE100);
    // await expect(await RegistrationPage.fullNameValidationMessage()).toBeTruthy(); // Assuming a validation message check for exceeding limit
  }));

  test('Ar: Valid Full Name Formats', (async ({ page }) => {
    await RegistrationPage.checkFullNameLabel(page,'الاسم بالكامل');
    await RegistrationPage.typeFullName(page,authData.fullNameLower);
    await RegistrationPage.typeFullName(page,authData.fullNameUpper);
    // Consider adding a test for edge cases like exceeding character limit (if applicable)
    await RegistrationPage.typeFullName(page,authData.fullNameE100);
    // await expect(await RegistrationPage.fullNameValidationMessage()).toBeTruthy(); // Assuming a validation message check for exceeding limit
  }));
});
