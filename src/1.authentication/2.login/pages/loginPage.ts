import { AuthData } from "1.authentication/data/auth_data";
import { Page } from "playwright";
import { expect } from "playwright/test";
import {logOut} from 'utils/playwrightUtils'

export class LoginPage {
  static async visit(page: Page) {
    await page.goto(AuthData.loginUrl);
  }

  static async visitAuth(page: Page) {
    await page.goto(AuthData.loginUrl);
    await page.reload(); // Example of how to handle logout and refresh in Playwright
    await page.goto(AuthData.loginUrl);
  }

  static async getPageHeader(page: Page, head: string) {
    await expect(page.locator('h4').first()).toHaveText(head);
  }

  static async getPageHeaderPara(page: Page, headerPar: string) {
    await expect(page.locator('p').first()).toHaveText(headerPar);
  }

  static async getPageSecHeader(page: Page) {
    await expect(page.locator('h3').first()).toHaveText(/Hello!, Welcome/);
  }

  static async checkLogoImg(page: Page, img: string) {
    await expect(page.locator(`img[src="${img}"]`).first()).toBeVisible();
  }

  static async checkUserNameLabel(page: Page, userLabel: string) {
    const label = await page.locator('label[for="Username"]').innerText();
    expect(label.trim().toLowerCase()).toBe(userLabel.trim().toLowerCase());
  }

  static async inputUserName(page: Page, userName: string) {
    await page.locator('#Username').fill(userName);
    await expect(page.locator('#Username')).toHaveValue(userName);
  }

  static async checkEmailLabel(page: Page, emailLabel: string) {
    await expect(page.locator('label:has-text('+emailLabel +')')).toBeVisible();
  }

  static async inputEmail(page: Page, mail: string) {
    await page.locator('input.form-control').first().fill(mail);
    await expect(page.locator('input.form-control').first()).toHaveValue(mail);
  }

  static async checkPasswordLabel(page: Page, passLabel: string) {
    await expect(page.locator('label:has-text('+passLabel+')')).toBeVisible();
  }

  static async inputPassword(page: Page, pass: string) {
    await page.locator('input.form-control.password-control').fill(pass);
    await expect(page.locator('input.form-control.password-control')).toHaveValue(pass);
  }

  static async checkUserForgetPasswordLink(page: Page, forgetPass: string) {
    const link = await page.locator('a:has-text('+forgetPass+')').getAttribute('href');
    expect(link).toContain('/Account/ForgotPassword');
  }

  static async checkDoNotHaveAccountLink(page: Page, str: string) {
    await expect(page.locator('p.register-account').first()).toHaveText(str);
  }

  static async checkLangButton(page: Page) {
    await expect(page.locator('a.lang-btn')).toBeVisible();
  }

  static async clickLangButton(page: Page) {
    await page.locator('a.lang-btn').click();
  }

  static async checkLoginButton(page: Page, loginStr: string) {
    await expect(page.locator('.custom-btn:has-text('+loginStr+')')).toBeVisible();
  }

  static async clickLoginButton(page: Page, loginStr: string) {
    await page.locator('.custom-btn:has-text('+loginStr+')').click();
  }


  static async validateLogin(page: Page) {
  // Check for the presence of a specific element
  await page.waitForSelector('span.p-menuitem-text');

  // Check that the URL includes a specific string
  await expect(page).toHaveURL(/.*bussinessowners.*/);
  // Log out, assuming logOut is a function available in the window context
  await page.evaluate(() => {
    // Add the logOut function implementation here if necessary
    logOut(page);
  });
}

}
