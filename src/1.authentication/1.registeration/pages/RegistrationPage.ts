import { Page } from 'playwright';
import { expect } from 'playwright/test';
import { AuthData } from '../../data/auth_data';

export class RegistrationPage {
  static async visit(page: Page) {
    await page.goto(AuthData.registrationUrl);
  }

  static async clickLangButton(page: Page) {
    await page.locator('a.lang-btn').nth(-1).click();
  }

  static async getPageHeader(page: Page, head: string) {
    await expect(page.locator('h4')).toContainText(head);
  }

  static async getPageHeaderPara(page: Page, headerPar: string) {
    await expect(page.locator('p')).toContainText(headerPar);
  }

  static async getPageSecHeader(page: Page) {
    await expect(page.locator('h3')).toContainText("Hello!");
    await expect(page.locator('h3')).toContainText("Welcome");
  }

  static async checkFullNameLabel(page: Page, fullName: string) {
    await expect(page.locator('label[for="FullName"]')).toContainText(fullName);
    await this.visibilityOfRequiredStar(page, 'label[for="FullName"]');
  }

  static async typeFullName(page: Page, fullName: string) {
    const fullNameInput = page.locator('#FullName');
    await fullNameInput.fill(fullName);
    await expect(fullNameInput).toHaveValue(fullName);
  }

  static async checkEmailLabel(page: Page, label: string) {
    await expect(page.locator('label[for="email"]')).toContainText(label);
    await this.visibilityOfRequiredStar(page, 'label[for="email"]');
  }

  static async inputEmail(page: Page, mail: string) {
    const emailInput = page.locator('#email');
    await emailInput.fill(mail);
    await expect(emailInput).toHaveValue(mail);
  }

  static async checkCountryLabel(page: Page, countryLabel: string) {
    await expect(page.locator('label')).toContainText(countryLabel);
  }

  static async clickDropDownCountryList(page: Page) {
    await page.locator('#select2-dropDownCountry-container').click();
  }

  static async inputCountry(page: Page, country: string) {
    const countryInput = page.locator('input.select2-search__field');
    await countryInput.fill(country);
    await countryInput.press('Enter');
  }

  static async checkPasswordLabel(page: Page, passLabel: string) {
    await expect(page.locator('label[for="Password"]')).toContainText(passLabel);
    await this.visibilityOfRequiredStar(page, 'label[for="Password"]');
  }

  static async inputPassword(page: Page, pass: string) {
    const passwordInput = page.locator('#inputPassword');
    await passwordInput.fill(pass);
    await expect(passwordInput).toHaveValue(pass);
  }

  static async checkConfirmPasswordLabel(page: Page, conPassLabel: string) {
    await expect(page.locator('label[for="confirmPassword"]')).toContainText(conPassLabel);
    await this.visibilityOfRequiredStar(page, 'label[for="confirmPassword"]');
  }

  static async inputConfirmPassword(page: Page, pass: string) {
    const confirmPasswordInput = page.locator('#inputConfirmPassword');
    await confirmPasswordInput.fill(pass);
    await expect(confirmPasswordInput).toHaveValue(pass);
  }

  static async checkPhoneLabel(page: Page, phone: string) {
    await expect(page.locator('label[for="mobileNumber"]')).toContainText(phone);
    await this.visibilityOfRequiredStar(page, 'label[for="mobileNumber"]');
  }

  static async inputPhoneNumber(page: Page, phone: string) {
    const phoneNumberInput = page.locator('#mobileNumber');
    await phoneNumberInput.fill(phone);
    await expect(phoneNumberInput).toHaveValue(phone);
  }

  static async checkCountryCode(page: Page, code: string) {
    const countryCodeSpan = page.locator('span#select2-dropDownMobile-container');
    await expect(countryCodeSpan).toHaveAttribute('title', code);
  }

  static async checkAgreeStatementLabel(page: Page, statement: string) {
    await expect(page.locator('label')).toContainText(statement);
  }

  static async checkHaveAnAccount(page: Page, text: string) {
    await expect(page.locator('span')).toContainText(text);
  }

  static async confirmCheckBox(page: Page) {
    const checkBoxInput = page.locator('input#termsBox.form-check-input');
    await checkBoxInput.check();
    await expect(checkBoxInput).toBeChecked();
  }

  static async checkSignInButton(page: Page, label: string) {
    await expect(page.locator('a')).toContainText(label);
  }

  static async checkRegistrationButton(page: Page, label: string) {
    await expect(page.locator('.custom-btn')).toContainText(label);
  }

  static async checkLogoImg(page: Page, img: string) {
    await this.checkImageVisibilityBySrc(page, img);
  }

  static async checkImageVisibilityBySrc(page: Page, imgSrc: string) {
    const imgElement = page.locator(`img[src="${imgSrc}"]`);
    await expect(imgElement).toBeVisible();
  }

  static async clickRegistrationButton(page: Page) {
    const registerButton = page.locator('button[type="submit"]');
    await registerButton.click();
  }

  static async validateRegistration(page: Page, headerStr: string | RegExp, paraString: string | RegExp, registerMail: string) {
    await expect(page.locator('h4')).toContainText(headerStr);
    await expect(page.locator('p')).toContainText(paraString);
    await expect(page.locator('p.m-0')).toContainText(registerMail);
  }

  static async visibilityOfRequiredStar(page: Page, selector: string) {
    const star = page.locator(`${selector} .required-star`);
    await expect(star).toBeVisible();
  }

  static async verifyPasswordAndConfirmPasswordEquality(page: Page) {
    const passwordValue = await page.locator('input[name="password"]').inputValue();
    await expect(page.locator('input[name="confirmPassword"]')).toHaveValue(passwordValue);
  }

  static async validatePassordAndConfirmPasswordDifference(page: Page) {
    await expect(page.locator('span#inputConfirmPassword-error')).toBeVisible();
    await expect(page.locator(`text=${AuthData.diffPassMsg}`)).toBeVisible();
  }
  static async verifyPasswordCompatibility(page: Page) {
    await checkRegExInCompatibility(page, 'input[name="password"]', AuthData.correctPassword, AuthData.passwordRegex);
    await checkRegExInCompatibility(page, 'input[name="password"]', AuthData.inCorrectPass1, AuthData.passwordRegex);
    await checkRegExInCompatibility(page, 'input[name="password"]', AuthData.inCorrectPass2, AuthData.passwordRegex);
    await checkRegExInCompatibility(page, 'input[name="password"]', AuthData.inCorrectPass3, AuthData.passwordRegex);
    await checkRegExInCompatibility(page, 'input[name="password"]', AuthData.inCorrectPass4, AuthData.passwordRegex);
    await checkRegExInCompatibility(page, 'input[name="password"]', AuthData.inCorrectPass5, AuthData.passwordRegex);
    await checkRegExInCompatibility(page, 'input[name="password"]', AuthData.inCorrectPass6, AuthData.passwordRegex);
  }
  static async implementNormalRegSteps(page: Page, mail: string, phone: string) {
    await this.typeFullName(page, AuthData.fullName);
    await this.inputEmail(page, mail);
    await this.clickDropDownCountryList(page);
    await this.inputCountry(page, AuthData.country);
    await this.inputPassword(page, AuthData.pass);
    await this.inputConfirmPassword(page, AuthData.pass);
    await this.inputPhoneNumber(page, phone);
    await this.checkCountryCode(page, AuthData.code);
    await this.confirmCheckBox(page);
    await this.clickRegistrationButton(page);
  }

  static async checkIsRequiredMsg(page: Page, el: string, isEn: boolean) {
    const message = isEn ? 'Field is required' : 'هذا الحقل مطلوب';
    // Clear the element and trigger the required message
    await page.locator(el).clear(); // Ensures consistent behavior across browsers
    await page.locator(el).fill(''); // Ensures consistent behavior across browsers
    // Wait for the required message to appear (optional)
    await page.waitForSelector(`span:text-contains("${message}")`, { state: 'visible' }); // Adjust selector if needed
    // Assert that the required message is visible
    await expect(page.locator(`span:text-contains("${message}")`)).toBeVisible();
    // Clear the element again (optional)
    await page.locator(el).clear(); // Ensures element is ready for further testing
    await page.locator(el).fill(''); // Ensures element is ready for further testing
  }
}

function checkRegExInCompatibility(page: Page, arg1: string, inCorrectPass3: string, passwordRegex: RegExp) {
  throw new Error('Function not implemented.');
}

