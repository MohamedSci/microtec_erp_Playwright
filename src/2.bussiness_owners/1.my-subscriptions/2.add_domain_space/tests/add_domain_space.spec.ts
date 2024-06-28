import test from 'playwright/test';
import { LoginPage } from '../../../../1.authentication/2.login/pages/loginPage';
import { SubDomainData } from '../../../data/sub_domain_data';
import { MySubscriptionsPage } from '../../1.my_subscriptions_page/pages/my-subscriptions_page';
import { AddDomainSpace } from '../pages/add_domain_space';
import { clickContinueAs } from 'utils/playwrightUtils';

test.describe("Add Domain Space", () => {
  test.beforeEach(async ({ page }) => {
    await LoginPage.visit(page);
    await clickContinueAs(page);
  });

  test("1.Verify Adding Subdomain", async ({ page }) => {
    await MySubscriptionsPage.clickAddDomainSpaceBtn(page);
    // implement Add SubDomain and Monthly
    await AddDomainSpace.implementAddSubDomain(
      page,
      SubDomainData.count,
      SubDomainData.subDomainName
    );
    await AddDomainSpace.clickAddToCartButton(page);
    await page.waitForTimeout(12000); // Playwright uses page.waitForTimeout for waiting
    await AddDomainSpace.confirmTheSuccessPopUp(page);
    await AddDomainSpace.verifyDialogDisappears(page);
    // Verify That The Saved Data is Stored and Displayed Successfully
    await AddDomainSpace.validateNewCardIsAddedOnTheGrid(
      page,
      SubDomainData.subDomainName,
      SubDomainData.count,
      SubDomainData.isMonthly
    );
  });

  test("2.Verify That The System Correctly Calculate The Price Monthly and Yearly", async ({ page }) => {
    await clickContinueAs(page);
    await MySubscriptionsPage.clickAddDomainSpaceBtn(page);
    await AddDomainSpace.inputeCount(page, SubDomainData.count);
    await AddDomainSpace.validateYearlyCount(page, SubDomainData.count);
    await AddDomainSpace.clickMonthly(page);
    await AddDomainSpace.validateMonthlyCount(page, SubDomainData.count);
  });

  test("3.Verify That The Count Can't be Greater Than 12 or Less Than 1", async ({ page }) => {
    let count = 13;
    await MySubscriptionsPage.clickAddDomainSpaceBtn(page);
    await AddDomainSpace.clickMonthly(page);
    await AddDomainSpace.inputeCount(page, count);
    await AddDomainSpace.clickDialoge(page);
    await AddDomainSpace.verifyValidSubDomainCount(page, count);
    count = 0;
    await AddDomainSpace.inputeCount(page, count);
    await AddDomainSpace.clickDialoge(page);
    await AddDomainSpace.verifyValidSubDomainCount(page, count);
  });

  test("4.Verify That The Count accepts Numbers", async ({ page }) => {
    await MySubscriptionsPage.clickAddDomainSpaceBtn(page);
    const count = "A";
    await AddDomainSpace.validateStringCount(page, count);
  });

  test("5.Verify That The System Can't Accept The Existing Domain Space Name", async ({ page }) => {
    await MySubscriptionsPage.clickAddDomainSpaceBtn(page);
    await AddDomainSpace.inputeCount(page, 3);
    await AddDomainSpace.inputeYourDomainSpace(page, SubDomainData.subDomainName);
    await AddDomainSpace.validateDublicatedDomainSpace(page);
  });

  test("6.Verify That form validate all the required components before submitting", async ({ page }) => {
    await MySubscriptionsPage.clickAddDomainSpaceBtn(page);
    await AddDomainSpace.clearCount(page);
    await AddDomainSpace.inputeYourDomainSpace(page, SubDomainData.subDomainName);
    await AddDomainSpace.validateRequiredComponents(page, 1);
    await AddDomainSpace.inputeCount(page, 7);
    await AddDomainSpace.inputeYourDomainSpace(page, SubDomainData.subDomainName);
    await AddDomainSpace.validateRequiredComponentsMsgRemoval(page);
  });

  test("7.Verify Adding Subdomain has Special Characters, Prevent Submission", async ({ page }) => {
    const subDomainNameSpecial =
      "****/***lowerdomain" + SubDomainData.subDomainName;
    await MySubscriptionsPage.clickAddDomainSpaceBtn(page);
    await AddDomainSpace.implementAddSubDomain(
      page,
      SubDomainData.count,
      subDomainNameSpecial
    );
    await AddDomainSpace.clickAddToCartButton(page);
    await page.waitForTimeout(300); // Playwright uses page.waitForTimeout for waiting
    await AddDomainSpace.verifyDialogPresistance(page);
    // Verify That Special Characters Not Allowed Displayed Successfully
    await AddDomainSpace.validationSpecialCharacters(page);
  });
});
