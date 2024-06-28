import test, { expect } from 'playwright/test';
import { AuthData } from '../../data/auth_data';
import { LoginPage } from '../pages/loginPage';

test.describe('InvalidCredentials', () => {
  test.beforeEach(async ({ page }) => {
    await LoginPage.visitAuth(page);
  });

  test('EntersWrongPassword', async ({ page }) => {
    await LoginPage.inputUserName(page, AuthData.loginMail);
    // Wrong Password
    await LoginPage.inputPassword(page, AuthData.pass + 'Wrong');
    await LoginPage.clickLoginButton(page, 'Login');
    await expect(page.locator('div[data-valmsg-summary="true"]')).toBeVisible();
  });

  test('MissingPassword', async ({ page }) => {
    await LoginPage.inputUserName(page, AuthData.loginMail);
    await LoginPage.clickLoginButton(page, 'Login');
    await expect(page.locator('div[data-valmsg-summary="true"]')).toBeVisible();
    await expect(page.locator('li')).toContainText('The Password Field Is Required.');
  });

  test('EntersWrongUserName', async ({ page }) => {
    await LoginPage.inputUserName(page, 'testtest@test.ccc');
    await LoginPage.inputPassword(page, AuthData.pass);
    await LoginPage.clickLoginButton(page, 'Login');
    await expect(page.locator('div[data-valmsg-summary="true"]')).toBeVisible();
  });

  test('MissingUserName', async ({ page }) => {
    await LoginPage.inputPassword(page, AuthData.pass);
    await LoginPage.clickLoginButton(page, 'Login');
    await expect(page.locator('div[data-valmsg-summary="true"]')).toBeVisible();
    await expect(page.locator('li')).toContainText('The Username Field Is Required.');
  });
});
