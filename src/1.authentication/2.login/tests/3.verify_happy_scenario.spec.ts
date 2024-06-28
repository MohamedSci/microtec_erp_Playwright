import test from 'playwright/test';
import { AuthData } from '../../data/auth_data';
import { LoginPage } from '../pages/loginPage';

test.describe('Verify The Happy Scenario on the Login page', () => {
  test.beforeEach(async ({ page }) => {
    await LoginPage.visitAuth(page);
  });

  test('LoginAndSaveAccessTokenEn', async ({ page }) => {
    await LoginPage.inputEmail(page, AuthData.loginMail);
    await LoginPage.inputPassword(page, AuthData.pass);
    await LoginPage.clickLoginButton(page, 'Login');
    await page.waitForTimeout(1000);
    await LoginPage.validateLogin(page);
  });

  test('LoginAndSaveAccessTokenAr', async ({ page }) => {
    await LoginPage.clickLangButton(page);
    await LoginPage.inputEmail(page, AuthData.loginMail);
    await LoginPage.inputPassword(page, AuthData.pass);
    await LoginPage.clickLoginButton(page, 'تسجيل الدخول');
    await page.waitForTimeout(1000);
    await LoginPage.validateLogin(page);
  });
});
