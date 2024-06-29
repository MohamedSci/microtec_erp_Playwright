import { LoginPage } from "1.authentication/2.login/pages/loginPage";
import test, { expect } from "playwright/test";
import { trimText } from "utils/utils";
import { GeneralSetting } from "../pages/general_settings";
import { getAllItemsCount, getLastCellInTableValue , verifyLastCellInTable } from "utils/playwrightUtils";


let tagName = "tagName";

test.describe("General Setting", () => {
  test.beforeEach(async ({ page }) => {
    await LoginPage.visit(page);
    await page.reload();
  });

  test("Create Subdomain >>> Company >>> Add App", async ({ page }) => {
    await GeneralSetting.createNewSubDomain(page);
    await GeneralSetting.createNewCompany(page);
    await GeneralSetting.addAppsFromAppStore(page);
    await GeneralSetting.checkOutTheApps(page);
  });

  test("1.Verify that the user can shift between General Setting and Accounting", async ({ page }) => {
    await GeneralSetting.navigateToTheLastSubDomainGeneralSettings(page);
    await GeneralSetting.verifyNavigatingToGeneralSetting(page);
    await GeneralSetting.clickShifttingButton(page);
    await GeneralSetting.clickTheShiftingAppCloseIcon(page);
    await page.waitForTimeout(1000);
    await GeneralSetting.clickShifttingButton(page);
    await GeneralSetting.shiftToAnotherApp(page, 0);
    await GeneralSetting.verifyNavigatingToTheJournalEntryListButton(page);
    await GeneralSetting.clickShifttingButton(page);
    await GeneralSetting.clickTheShiftingAppCloseIcon(page);
    await page.waitForTimeout(1000);
    await GeneralSetting.clickShifttingButton(page);
    await GeneralSetting.shiftToAnotherApp(page, 1);
    await GeneralSetting.verifyNavigatingToGeneralSetting(page);
    await GeneralSetting.clickShifttingButton(page);
    await GeneralSetting.clickTheShiftingAppCloseIcon(page);
    await page.waitForTimeout(1000);
    await GeneralSetting.clickShifttingButton(page);
    await GeneralSetting.shiftToAnotherApp(page, 2);
    await GeneralSetting.verifyNavigatingToHR(page);
  });

  test("2.verify that all Add tags dialog components are exist", async ({ page }) => {
    await GeneralSetting.navigateToTheLastSubDomainGeneralSettings(page);
    await GeneralSetting.clickAddNewTag(page);
    await GeneralSetting.verifyAddNewTagButton(page);
    await GeneralSetting.closeTheDialogIcon(page);
    await GeneralSetting.verifyCodeTextField(page);
    await GeneralSetting.verifyNameTextField(page);
    await GeneralSetting.verifyMultiApplicabilityDropDown(page);
    await GeneralSetting.verifyDiscardButton(page);
    await GeneralSetting.verifySaveButton(page);
    await GeneralSetting.verifyDialogCloseIcon(page);
  });

  test("5.Verify that all components of taglist are exist successfully", async ({ page }) => {
    await GeneralSetting.navigateToTheLastSubDomainGeneralSettings(page);
    await GeneralSetting.TagListMainTitle(page);
    await GeneralSetting.verifyAddNewButton(page);
    await GeneralSetting.verifySearchTextField(page);
    await GeneralSetting.verifyColumnHeaders(page);
    await GeneralSetting.verifyPaginator(page);
  });

  test("6.Verify Required Validations", async ({ page }) => {
    await GeneralSetting.navigateToTheLastSubDomainGeneralSettings(page);
    await GeneralSetting.clickAddNewButton(page);
    await GeneralSetting.verifyAddNewTagDisplaying(page);
    await GeneralSetting.inputTagName(page, tagName);
    await GeneralSetting.clearTagName(page);
    await GeneralSetting.validateRequiredMessage(page, 1);
    await GeneralSetting.selectMultipleApps(page);
    await GeneralSetting.selectMultipleApps(page);
    await GeneralSetting.validateRequiredMessage(page, 2);
    await GeneralSetting.selectMultipleApps(page);
    await GeneralSetting.validateRequiredMessage(page, 1);
    await GeneralSetting.inputTagName(page, tagName);
    await GeneralSetting.validateRequiredMessage(page, 0);
    await GeneralSetting.clickDialogSaveButton(page);
    await GeneralSetting.verifyAddNewTagDisappearing(page);
  });

  test("Verify that Discard Button cancel all changes in Add a new tag Dialog", async ({ page }) => {
    await GeneralSetting.navigateToTheLastSubDomainGeneralSettings(page);
    await page.waitForTimeout(4000);
    const table = page.locator("table");
    await expect(table).toBeVisible();
    const initCount = await getAllItemsCount(page, "table", "tr");
    
    await GeneralSetting.clickAddNewButton(page);
    await GeneralSetting.verifyCodeTextField(page);
    await GeneralSetting.inputTagName(page, tagName);
    await GeneralSetting.selectMultipleApps(page);
    await GeneralSetting.clickDialogDiscardButton(page);
    const finalCount = await getAllItemsCount(page, "table", "tr");
    expect(parseInt(trimText(finalCount.toString().trim()))).toBe(parseInt(trimText(initCount.toString().trim())));
    await GeneralSetting.verifyThatNewTagNameIsNOTAddedToTheTable(page, tagName);
  });

  test("Verify that the user can Add a new tag", async ({ page }) => {
    await GeneralSetting.navigateToTheLastSubDomainGeneralSettings(page);
    await page.waitForTimeout(4000);
    const table = page.locator("table");
    await expect(table).toBeVisible();
    const initCount = await getAllItemsCount(page, "table", "tr");
    
    await GeneralSetting.clickAddNewButton(page);
    await GeneralSetting.verifyCodeTextField(page);
    await GeneralSetting.inputTagName(page, tagName);
    await GeneralSetting.selectMultipleApps(page);
    await GeneralSetting.clickDialogSaveButton(page);
    await GeneralSetting.confirmSuccessAlert(page);
    const finalCount = await getAllItemsCount(page, "table", "tr");
    expect(parseInt(trimText(finalCount.toString().trim()))).toBe(parseInt(trimText(initCount.toString().trim())) + 1);
    await verifyLastCellInTable(page, 2, tagName);
  });

  test("Verify that Discard Button cancels all changes in Edit tag Dialog", async ({ page }) => {
    await GeneralSetting.navigateToTheLastSubDomainGeneralSettings(page);
    await page.waitForTimeout(4000);
    const table = page.locator("table");
    await expect(table).toBeVisible();
    const initCount = await getAllItemsCount(page, "table", "tr");
    
    const indexT1 = await getLastCellInTableValue(page, 0);
    const codeT1 = await getLastCellInTableValue(page, 1);
    const nameT1 = await getLastCellInTableValue(page, 2);

    await GeneralSetting.clickEditButton(page);
    await GeneralSetting.verifyCodeTextField(page);
    await GeneralSetting.inputTagName(page, `Edited ${tagName}`);
    await GeneralSetting.unSelectAnApp(page);
    await GeneralSetting.clickDialogDiscardButton(page);
    await GeneralSetting.confirmSuccessAlert(page);
    const finalCount = await getAllItemsCount(page, "table", "tr");
    expect(parseInt(trimText(finalCount.toString().trim()))).toBe(parseInt(trimText(initCount.toString().trim())));
    await verifyLastCellInTable(page, 2, trimText(nameT1.trim()));
  });

  test("Verify that the user can Edit an existing tag", async ({ page }) => {
    await GeneralSetting.navigateToTheLastSubDomainGeneralSettings(page);
    await page.waitForTimeout(4000);
    const table = page.locator("table");
    await expect(table).toBeVisible();
    const initCount = await getAllItemsCount(page, "table", "tr");
    
    await GeneralSetting.clickEditButton(page);
    await GeneralSetting.verifyCodeTextField(page);
    await GeneralSetting.inputTagName(page, `Edited ${tagName}`);
    await GeneralSetting.unSelectAnApp(page);
    await GeneralSetting.clickDialogSaveButton(page);
    await GeneralSetting.confirmSuccessAlert(page);
    const finalCount = await getAllItemsCount(page, "table", "tr");
    expect(parseInt(trimText(finalCount.toString().trim()))).toBe(parseInt(trimText(initCount.toString().trim())));
    await verifyLastCellInTable(page, 2, `Edited ${tagName}`);
  });

  test("Verify that the user can delete a new tag", async ({ page }) => {
    await GeneralSetting.navigateToTheLastSubDomainGeneralSettings(page);
    await page.waitForTimeout(4000);
    const table = page.locator("table");
    await expect(table).toBeVisible();
    const initCount = await getAllItemsCount(page, "table", "tr");
    
    await GeneralSetting.clickDeleteIcon(page);
    await GeneralSetting.confirmDeletePopUp(page);
    const finalCount = await getAllItemsCount(page, "table", "tr");
    expect(parseInt(trimText(finalCount.toString().trim()))).toBe(parseInt(trimText(initCount.toString().trim())) - 1);
    await GeneralSetting.verifyThatNewTagNameIsNOTAddedToTheTable(page, tagName);
  });
});
