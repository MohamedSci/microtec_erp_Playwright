import { AuthData } from "./../../data/auth_data";
import { LoginPage } from "../pages/loginPage";
import test from "playwright/test";

test.describe("Verify that all the components exist on the Login page", () => {
    test.beforeEach("Visit Login Page",  ({page}) => {
    LoginPage.visitAuth(page);
  });
  test("En", ({page}) => {
    LoginPage.getPageHeader(page,"Login");
    LoginPage.getPageHeaderPara(page,"Sign Up A new Account for the first time");
    LoginPage.getPageSecHeader(page);
    LoginPage.checkLogoImg(page,AuthData.logoImg);
    // LoginPage.checkEmailLabel('Email');
    // LoginPage.inputEmail(mail);
    LoginPage.checkUserNameLabel(page,"Email Or Phone*");
    LoginPage.inputUserName(page,AuthData.loginMail);
    LoginPage.checkPasswordLabel(page,"Password");
    LoginPage.inputPassword(page,AuthData.pass);
    LoginPage.checkUserForgetPasswordLink(page,"Forgot password ?");
    LoginPage.checkDoNotHaveAccountLink(page,"Don't have an account?");
    LoginPage.checkLangButton(page);
    LoginPage.checkLoginButton(page,"Login");
  }),
    test("Ar", ({page}) => {
      LoginPage.clickLangButton(page);
      LoginPage.getPageHeader(page,"تسجيل الدخول");
      LoginPage.getPageHeaderPara(page,"قم بتسجيل حساب جديد لأول مرة");
      LoginPage.getPageSecHeader(page);
      LoginPage.checkLogoImg(page,AuthData.logoImg);
      // LoginPage.checkEmailLabel('Email');
      // LoginPage.inputEmail(mail);
      LoginPage.checkUserNameLabel(page,"البريد الالكتروني او رقم الهاتف*");
      LoginPage.inputUserName(page,AuthData.loginMail);
      LoginPage.checkPasswordLabel(page,"كلمة المرور");
      LoginPage.inputPassword(page,AuthData.pass);
      LoginPage.checkUserForgetPasswordLink(page,"هل نسيت كلمة السر ?");
      LoginPage.checkDoNotHaveAccountLink(page,"ليس لديك حساب؟");
      LoginPage.checkLoginButton(page,"تسجيل الدخول");
    });
});
