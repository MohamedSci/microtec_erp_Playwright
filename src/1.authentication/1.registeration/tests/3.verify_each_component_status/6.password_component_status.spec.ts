import test, { expect } from "playwright/test";
import { RegistrationPage } from "../../pages/RegistrationPage";
import { AuthData } from "../../../data/auth_data";



// Assuming your RegistrationPage class is a separate file (adjust the path if needed)

test.describe('Verify Password component Status on the Registerion page', () => {



  test.beforeEach(async ({page}) => {
    await RegistrationPage.visit(page);
  });

  test('Check Labels', async ({page}) => {
    // English
    await RegistrationPage.clickLangButton(page);
    await RegistrationPage.checkPasswordLabel(page,'Password');
    await RegistrationPage.checkConfirmPasswordLabel(page,'Confirm Password');

    // Arabic
    await RegistrationPage.clickLangButton(page); // Switch back to Arabic
    await RegistrationPage.checkPasswordLabel(page,'الرقم السرى');
    await RegistrationPage.checkConfirmPasswordLabel(page,'اعادة كتابة الرقم السرى');
  });

  test('Check Is Required Message is Successfully displayed',async ({page}) => {
    // Arabic
    // passwordRequiredMessage
     expect(await RegistrationPage.checkIsRequiredMsg(page,'span#inputPassword-error',false)).toBeFalsy();
    // confirmPasswordRequiredMessage
     expect(await RegistrationPage.checkIsRequiredMsg(page,'span#inputConfirmPassword-error',false)).toBeFalsy();

    // English
    await RegistrationPage.clickLangButton(page);
         // passwordRequiredMessage
         expect(await RegistrationPage.checkIsRequiredMsg(page,'span#inputPassword-error',true)).toBeFalsy();
         // confirmPasswordRequiredMessage
          expect(await RegistrationPage.checkIsRequiredMsg(page,'span#inputConfirmPassword-error',true)).toBeFalsy();
  });

  test('should verify the presence of a lock icon in the text field', async ({page}) => {
    // Consider using a more specific selector for the lock icon (e.g., by class or ID)
    await expect(await page.locator('.lock-icon')).toBeVisible(); // Adjust selector if needed
  });

  test('should verify password complexity requirements', async ({page}) => {
    await RegistrationPage.verifyPasswordCompatibility(page);
  });

  test('should verify that password and confirm password fields match', async ({page}) => {
    await RegistrationPage.inputPassword(page,AuthData.pass);
    await RegistrationPage.inputConfirmPassword(page,AuthData.pass);
    await RegistrationPage.verifyPasswordAndConfirmPasswordEquality(page);
  });

  test('should verify the appearance of a message if confirm password is different', async ({page}) => {
    await RegistrationPage.inputPassword(page,AuthData.pass);
    await RegistrationPage.inputConfirmPassword(page,AuthData.inCorrectPass5);
    await RegistrationPage.validatePassordAndConfirmPasswordDifference(page);
  });

  // Encrypted password verification is generally not possible in Playwright due to security constraints.
  // Consider alternative approaches for password security testing (e.g., server-side testing).
  test.skip('should verify that the password is encrypted when entered', async ({page}) => {
    // Placeholder for alternative security testing
    console.warn('Encrypted password verification is not directly supported in Playwright. Consider alternative approaches.');
  });
});
