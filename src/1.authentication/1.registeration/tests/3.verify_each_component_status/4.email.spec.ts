import test, { expect } from 'playwright/test';
import { RegistrationPage } from '../../pages/RegistrationPage';
import { AuthData } from '../../../data/auth_data';

test.describe('Verify Email component Status on the Registerion page',  () => {
    test.beforeEach(async ({ page }) => {
        await RegistrationPage.visit(page);
      });



  test('To Verify Email is Required Message', async ({ page }) => {
    // Arabic
    expect(await RegistrationPage.checkIsRequiredMsg(page, "input#Username", false)).toBeFalsy();

    // English
    await RegistrationPage.clickLangButton(page);
    expect(await RegistrationPage.checkIsRequiredMsg(page, "input#Password", true)).toBeTruthy();
  });

  test('checkEmailRegExFormatEn', async ({ page }) => {
    await RegistrationPage.clickLangButton(page);
    await RegistrationPage.checkEmailLabel(page,'Email');
    await RegistrationPage.inputEmail(page,AuthData.registerMail);
  });

  test('checkEmailRegExFormatAr', async ({ page }) => {
    await RegistrationPage.checkEmailLabel(page,'البريد الالكترونى'); // Assuming this is the Arabic label
    await RegistrationPage.inputEmail(page,AuthData.registerMail);
  });

  test('checkRegisterationWithUsedEmail',async ({ page }) => {
    await RegistrationPage.clickLangButton(page);
    await RegistrationPage.checkEmailLabel(page,'Email'); // Assuming this is the English label again
    await RegistrationPage.inputEmail(page,AuthData.usedmail1);
  });
});
