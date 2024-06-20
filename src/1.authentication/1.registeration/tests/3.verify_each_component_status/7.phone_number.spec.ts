
// Assuming your RegistrationPage class is a separate file (adjust the path if needed)

import { RegistrationPage } from "1.authentication/1.registeration/pages/RegistrationPage";
import { AuthData } from "1.authentication/data/auth_data";
import test, { expect } from "playwright/test";

test.describe('Verify Phone component Status on the Registerion page',() => {



  test.beforeEach( async ({ page }) => {
    await RegistrationPage.visit(page);
  });

  test('should verify the presence of the red star symbol next to the label title',  async ({ page })=> {
    // Consider using a more descriptive selector for the required star symbol (e.g., by class or ID)
    await expect(await page.locator('.required-star')).toBeVisible(); // Adjust selector if needed
  });

  test('En: Check Phone Label and Input Phone Number',  async ({ page }) => {
    await RegistrationPage.clickLangButton(page);
    await RegistrationPage.checkPhoneLabel(page,'Phone');
    await RegistrationPage.inputPhoneNumber(page,AuthData.phone);
  });

  test('Ar: Check Phone Label and Input Phone Number',  async ({ page }) => {
    await RegistrationPage.clickLangButton(page); // Switch back to Arabic
    await RegistrationPage.checkPhoneLabel(page,'الهاتف');
    await RegistrationPage.inputPhoneNumber(page,AuthData.phone);
  });

  test('To Verify Phone Number is Required Message',  async ({ page }) => {
    // Arabic Language
    expect(await RegistrationPage.checkIsRequiredMsg(page,"",false)).toBeFalsy();
    // English Language
    await RegistrationPage.clickLangButton(page);
    expect(await RegistrationPage.checkIsRequiredMsg(page,"",true)).toBeTruthy();
  });
});
