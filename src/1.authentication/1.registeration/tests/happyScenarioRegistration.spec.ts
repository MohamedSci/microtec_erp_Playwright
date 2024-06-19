import { test, expect } from '@playwright/test';
import { generateRandomEmail, generateRandomMobileNumber } from '../../../../utils/utils';
import { RegistrationPage } from '../pages/RegistrationPage';

test.describe("Verify Happy Scenario Registration", () => {
  test.beforeEach(async ({ page }) => {
    await RegistrationPage.visit(page);
  });

  test('VerifyHappyScenarioRegistrationTestAr', async ({ page }) => {
    const mail = generateRandomEmail();
    const phone = generateRandomMobileNumber();
    await RegistrationPage.implementNormalRegSteps(page, mail, phone);
    await RegistrationPage.validateRegistration(page, "تم ارسال ايميل التاكيد", "برجاء مراجعة بريدك الالكترونى", mail);
  });

  test('VerifyHappyScenarioRegistrationTestEN', async ({ page }) => {
    const mail = generateRandomEmail();
    const phone = generateRandomMobileNumber();
    await RegistrationPage.clickLangButton(page);
    await RegistrationPage.implementNormalRegSteps(page, mail, phone);
    await RegistrationPage.validateRegistration(page, /Verification Email Sent/i, /Check Your Email/i, mail);
  });
});



// import { test, expect } from '@playwright/test';
// import { RegistrationPage } from '../pages/registerPage';

// test.describe("Verify Happy Scenario Registration", () => {
//   test.beforeEach(async ({ page }) => {
//     await RegistrationPage.visit(page);
//   });

//   test('VerifyHappyScenarioRegistrationTestAr', async ({ page }) => {
//     const mail = generateRandomEmail();
//     const phone = generateRandomMobileNumber();
//     await RegistrationPage.implemntNormalRegSteps(page, mail, phone);
//     await RegistrationPage.validateRegistration(page, "تم ارسال ايميل التاكيد", "برجاء مراجعة بريدك الالكترونى", mail);
//   });

//   test('VerifyHappyScenarioRegistrationTestEN', async ({ page }) => {
//     const mail = generateRandomEmail();
//     const phone = generateRandomMobileNumber();
//     await RegistrationPage.clickLangButton(page);
//     await RegistrationPage.implemntNormalRegSteps(page, mail, phone);
//     await RegistrationPage.validateRegistration(page, /Verification Email Sent/i, /Check Your Email/i, mail);
//   });
// });
