import { test, expect } from '@playwright/test';
import { AuthData } from '../../data/auth_data';
import { RegistrationPage } from '../pages/RegistrationPage';

test.describe("Verify that all the components exist on the Register page", () => {
  test.beforeEach(async ({ page }) => {
    await RegistrationPage.visit(page);
  });

  test('En', async ({ page }) => {
    await RegistrationPage.clickLangButton(page);
    await RegistrationPage.getPageHeader(page, "Register");
    await RegistrationPage.getPageHeaderPara(page, "Sign Up A new Account for the first time");
    await RegistrationPage.getPageSecHeader(page);
    await RegistrationPage.checkFullNameLabel(page, "Full Name");
    await RegistrationPage.typeFullName(page, AuthData.fullName);
    await RegistrationPage.inputEmail(page, AuthData.registerMail);
    await RegistrationPage.checkCountryLabel(page, "Country");
    await RegistrationPage.clickDropDownCountryList(page);
    await RegistrationPage.inputCountry(page, AuthData.country);
    await RegistrationPage.checkLogoImg(page, AuthData.face_img);
    await RegistrationPage.checkLogoImg(page, AuthData.mail_img);
    await RegistrationPage.checkLogoImg(page, AuthData.google_img);
    await RegistrationPage.checkLogoImg(page, AuthData.apple_img);
    await RegistrationPage.checkPasswordLabel(page, "Password");
    await RegistrationPage.inputPassword(page, AuthData.pass);
    await RegistrationPage.checkConfirmPasswordLabel(page, "Confirm Password");
    await RegistrationPage.inputConfirmPassword(page, AuthData.pass);
    await RegistrationPage.checkPhoneLabel(page, "Phone");
    await RegistrationPage.inputPhoneNumber(page, AuthData.phone);
    await RegistrationPage.checkCountryCode(page, AuthData.code);
    await RegistrationPage.checkRegistrationButton(page, "Register Now");
    await RegistrationPage.checkAgreeStatementLabel(page, "I agree the Terms and Conditions");
    await RegistrationPage.checkHaveAnAccount(page, "have an account?");
    await RegistrationPage.checkSignInButton(page, "Sign In");
    await RegistrationPage.confirmCheckBox(page);
    await RegistrationPage.clickRegistrationButton(page);
  });

  test('Ar', async ({ page }) => {
    await RegistrationPage.visit(page);
    await RegistrationPage.getPageHeader(page, "تسجيل مستخدم");
    await RegistrationPage.getPageHeaderPara(page, "قم بانشاء حساب جديد لاول مرة");
    await RegistrationPage.getPageSecHeader(page);
    await RegistrationPage.checkFullNameLabel(page, "الاسم بالكامل");
    await RegistrationPage.typeFullName(page, AuthData.fullName);
    await RegistrationPage.checkEmailLabel(page, "البريد الالكترونى");
    await RegistrationPage.inputEmail(page, AuthData.registerMail);
    await RegistrationPage.checkCountryLabel(page, "الدولة");
    await RegistrationPage.clickDropDownCountryList(page);
    await RegistrationPage.inputCountry(page, AuthData.country);
    await RegistrationPage.checkLogoImg(page, AuthData.face_img);
    await RegistrationPage.checkLogoImg(page, AuthData.mail_img);
    await RegistrationPage.checkLogoImg(page, AuthData.google_img);
    await RegistrationPage.checkLogoImg(page, AuthData.apple_img);
    await RegistrationPage.checkPasswordLabel(page, "الرقم السرى");
    await RegistrationPage.inputPassword(page, AuthData.pass);
    await RegistrationPage.checkConfirmPasswordLabel(page, "اعادة كتابة الرقم السرى");
    await RegistrationPage.inputConfirmPassword(page, AuthData.pass);
    await RegistrationPage.checkPhoneLabel(page, "الهاتف");
    await RegistrationPage.inputPhoneNumber(page, AuthData.phone);
    await RegistrationPage.checkCountryCode(page, AuthData.code);
    await RegistrationPage.checkSignInButton(page, "تسجل دخول");
    await RegistrationPage.checkAgreeStatementLabel(page, "انا موافق على القواعد والشروط");
    await RegistrationPage.checkHaveAnAccount(page, "هل لديك حساب ؟");
    await RegistrationPage.confirmCheckBox(page);
    await RegistrationPage.clickRegistrationButton(page);
  });
});
