import { LoginPage } from "1.authentication/2.login/pages/loginPage";
import { Page } from "playwright";
import test, { expect } from "playwright/test";
import { AddCompanyDialog } from "../pages/AddCompanyDialoge";
import { EditCompanyScreen } from "../../edit_company/edit_company_screen/pages/edit_compnay";
import { CompanyData } from "../../data/company_data";


test.describe('Add Company Dialog', () => {
  test.beforeEach(async ({ page }) => {
    await LoginPage.visit(page);
    await page.waitForTimeout(1000);
    await EditCompanyScreen.clickManageCompanies(page);
  });

  test('Verify Happy Scenario: Add Required Data, Save, and Return', async ({ page }) => {
    await AddCompanyDialog.clickAddCompanyButton(page);
    await page.waitForTimeout(500);
    await AddCompanyDialog.clickCancelButton(page);
    await AddCompanyDialog.navigateToTheLatestScreen(page);
    
    const initialCount = await getAllItemsCount(page, CompanyData.cListGrid_selector, CompanyData.cCardItem_selector);
    console.log("initialCount:::", initialCount);

    await AddCompanyDialog.clickAddCompanyButton(page);
    await AddCompanyDialog.inputAllReqData(page);
    await AddCompanyDialog.clickSaveButton(page);
    await AddCompanyDialog.treatSuccessAlert(page);

    await AddCompanyDialog.navigateToTheLatestScreen(page);
    const updatedCount = await getAllItemsCount(page, CompanyData.cListGrid_selector, CompanyData.cCardItem_selector);
    console.log("updatedCount:::", updatedCount);
    expect(updatedCount).toBe(initialCount + 1);
  });

  test('Verify Save and Edit button: Save and Navigate to Edit Screen', async ({ page }) => {
    await AddCompanyDialog.clickAddCompanyButton(page);
    await AddCompanyDialog.inputAllReqData(page);
    await AddCompanyDialog.clickEditBtn(page);
    await AddCompanyDialog.treatSuccessAlert(page);
    await expect(page).toHaveURL(/edit/);
  });

  test('Verify All Components are Blank on New Company List Open', async ({ page }) => {
    await AddCompanyDialog.verifyElementsWithoutValues(page);
  });

  test('Verify Form Cannot Submit with Empty Required Fields', async ({ page }) => {
    await AddCompanyDialog.clickAddCompanyButton(page);
    await AddCompanyDialog.clickSaveButton(page);
    await validateRequiredComponents(page, 3);

    await AddCompanyDialog.inputCompanyName(page, CompanyData.cName);
    await AddCompanyDialog.inputBranchName(page, CompanyData.BranchNameTh);
    await AddCompanyDialog.clickSaveButton(page);
    await validateRequiredComponents(page, 1);

    await AddCompanyDialog.clearCompanyName(page);
    await AddCompanyDialog.chooseHoldingCompanyType(page);
    await AddCompanyDialog.clickSaveButton(page);
    await validateRequiredComponents(page, 1);

    await AddCompanyDialog.clearBranchName(page);
    await AddCompanyDialog.clickSaveButton(page);
    await validateRequiredComponents(page, 2);
  });

  test('Verify Form Cannot Submit Subsidiary Company Without Initial Holding Company', async ({ page }) => {
    await AddCompanyDialog.clickAddCompanyButton(page);
    await AddCompanyDialog.inputCompanyName(page, CompanyData.cName);
    await AddCompanyDialog.inputBranchName(page, CompanyData.BranchNameTh);
    await AddCompanyDialog.chooseSubsidaryCompanyType(page);
    await AddCompanyDialog.clickTheDialogeTitle(page);
    await AddCompanyDialog.clickSaveButton(page);
    await AddCompanyDialog.verifyDialogeDisplaying(page);
    await AddCompanyDialog.chooseHoldingCompanyType(page);
    await AddCompanyDialog.clickTheDialogeTitle(page);
    await AddCompanyDialog.clickSaveButton(page);
    await AddCompanyDialog.verifyDialogeDisapears(page);
  });

  test('Verify All Added Companies are Displayed Correctly', async ({ page }) => {
    const elements = await page.locator('td.ng-star-inserted');
    for (let i = 0; i < 8; i++) {
      var ng_star_count = elements.nth(i).count();
      await expect(ng_star_count).toBe(1);
    }
    await page.locator('.p-treetable-tbody > :nth-child(3)').click();
    await page.locator(':nth-child(1) > :nth-child(8) > .p-element.ng-star-inserted > .p-ripple > .pi').click();
  });
});

async function getAllItemsCount(page: Page, listGridSelector: string, cardItemSelector: string): Promise<number> {
  const gridItems = await page.locator(listGridSelector).count();
  const cardItems = await page.locator(cardItemSelector).count();
  return gridItems + cardItems;
}

async function validateRequiredComponents(page: Page, count: number) {
  const requiredFields = await page.locator('.required-field').count();
  expect(requiredFields).toBe(count);
}
