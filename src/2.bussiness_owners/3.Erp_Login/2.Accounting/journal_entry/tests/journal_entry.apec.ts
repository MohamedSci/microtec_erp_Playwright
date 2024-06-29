
import { GeneralSetting } from "2.bussiness_owners/3.Erp_Login/1.General_Setting/pages/general_settings";
import { JournalEntry } from "../pages/journal_entry";
import { clickContinueAs, verifyAddNewButtonOnTheScreenTop, verifyAppNameInMenuItem, verifyExportButtonOnTheScreenTop, verifyHeaderSearchTextField, verifyMenuItemIcon, verifyMenuItemText, verifyPaginatorOnScreenBottom, verifySliderButtonOnTheBottom } from 'utils/playwrightUtils';
import test, { Page, expect } from "playwright/test";
import { JDEditScreen } from "../pages/edit_screeen";

let corCreditAmount = "25";
let wroCreditAmount = "26";

test.describe("Journal Entry", () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage(page);
    await GeneralSetting.navigateToTheLastSubDomainAccounting(page);
    clickContinueAs(page);
  });

  test("1. Verify Walk Through", async ({page}) => {
    await page.waitForTimeout(2000);
    clickContinueAs(page);
    await JournalEntry.addNewJournalEntry(page);
    await JournalEntry.clickWalkTrough(page);
    await JournalEntry.verifyTheFirstWalkThroughStep(page);
    await JournalEntry.clickNextWalkThroughStep(page);
    await JournalEntry.verifySecondWalkThroughStep(page);
    await JournalEntry.clickNextWalkThroughStep(page);
    await JournalEntry.verifyThirdWalkThroughStep(page);
    await JournalEntry.clickNextWalkThroughStep(page);
    await JournalEntry.verifyFourthWalkThrough(page);
    await JournalEntry.clickNextWalkThroughStep(page);
    await JournalEntry.verifyDisAppearingWalkthroughPopUps(page);
  });

  test("2. Verify that all components are displayed in Journal Entry Main Screen", async ({page}) => {
    await page.waitForTimeout(2000);
    clickContinueAs(page);
    await JournalEntry.verifyAccountingIsDisplayedOnHeader(page);
    await JournalEntry.verifyMenuItemIsDisplayedOnHeader(page,"journal Entry List");
    await JournalEntry.verifySearchInputTextField(page);
    await JournalEntry.verifyAddNewButtonIsDisplayedOnHeader(page);
    await JournalEntry.verifyExportButtonIsDisplayedOnHeader(page);
    await verifySliderButtonOnTheBottom(page);
    await JournalEntry.verifyTheColumnHeadersAreDisplayed(page);
  });

  test("3. Verify that all components are displayed in Add New Screen", async ({page}) => {
    await page.waitForTimeout(2000);
    clickContinueAs(page);
    await JournalEntry.addNewJournalEntry(page);
    await JournalEntry.verifyMenuItemIsDisplayedOnHeader(page,"journal Entry Add");
    await JournalEntry.verifyWalkThroughIsDisplayedOnHeader(page);
    await JournalEntry.verifyHeaderTitle(page,"Please Enter journal entry Header");
    await JournalEntry.verifyReferenceNumberTextFieldOnHeader(page);
    await JournalEntry.verifyDatePickerTextFieldOnHeader(page);
    await JournalEntry.verifyPeriodReadOnlyTextFieldOnHeader(page);
    await JournalEntry.verifyAttachButton(page);
    await JournalEntry.verifyDescriptionTextFieldOnHeader(page);
    await JournalEntry.verifySideSliderIsDisplayedOnTheBottom(page);
    await JournalEntry.verifyDiscardButtonIsDisplayedOnBottom(page);
    await JournalEntry.verifySaveButtonIsDisplayedOnBottom(page);
    await JournalEntry.verifyAddTemplateOnTableBottom(page);
    await JournalEntry.verifyAddNewLineOnBottom(page);
    await JournalEntry.verifyColumnHeadersAddNewScreen(page);
  });

  test("4. Verify Add New Template in Add New Screen", async ({page}) => {
    await page.waitForTimeout(2000);
    clickContinueAs(page);
    await JournalEntry.addNewJournalEntry(page);
    await JournalEntry.clickAddNewTemplate(page);
    await page.keyboard.press('Control+-'); // Zoom out
    await JournalEntry.clickCloseIcon(page);
    await page.reload(page);
    await page.waitForTimeout(2000);
    clickContinueAs(page);
    await page.keyboard.press('Control+=');
    await JournalEntry.clickAddNewTemplate(page);
    await JournalEntry.verifyNewTemplateDialog(page);
  });

  test("5. Verify Add and Delete a New Line in Add New Screen", async ({page}) => {
    await page.waitForTimeout(2000);
    clickContinueAs(page);
    await JournalEntry.addNewJournalEntry(page);
    await JournalEntry.addNewLine(page);
    await JournalEntry.verifyAddingNewLineId(page);
    await JournalEntry.selectAnAccountFromDropDownList(page);
    await JournalEntry.inputLineDescription(page,"Line Description");
    await JournalEntry.inputDebitAmount(page);
    await JournalEntry.inputCreditAmount(page);
    await JournalEntry.checkAccountReference(page);
    await JournalEntry.clickDeleteLineIcon(page);
    await JournalEntry.verifyLineIsDeletedSuccessfully(page);
  });

  test("6. Verify Discarding Unbalanced Journal Entry in Add New Screen", async ({page}) => {
    await page.waitForTimeout(2000);
    clickContinueAs(page);
    await JournalEntry.addNewJournalEntry(page);
    await JournalEntry.addHeaderReferenceNumber(page);
    await JournalEntry.inputHeaderDescriptionData(page);
    await JournalEntry.addNewLine(page);
    await JournalEntry.inputFirstLineData(page,corCreditAmount);
    await JournalEntry.addNewLine(page);
    await JournalEntry.inputSecondLineData(page,wroCreditAmount);
    await JDEditScreen.clickDiscardButton(page);
    await expect(page).not.toHaveURL(/.*add/);
  });

  test("7. Verify saving Unbalanced Journal Entry in Add New Screen", async ({page}) => {
    await page.waitForTimeout(2000);
    clickContinueAs(page);
    await JournalEntry.addNewJournalEntry(page);
    await JournalEntry.addHeaderReferenceNumber(page);
    await JournalEntry.inputDateAdd(page);
    await JournalEntry.inputHeaderDescriptionData(page);
    await JournalEntry.addNewLine(page);
    await JournalEntry.inputFirstLineData(page,corCreditAmount);
    await JournalEntry.addCostCenter(page);
    await JournalEntry.addNewLine(page);
    await JournalEntry.inputSecondLineData(page,wroCreditAmount);
    await JournalEntry.addCostCenter(page);
    await JDEditScreen.clickSaveButton(page);
  });

  test("8. Verify that the system cannot save the data if any required data is missing", async ({page}) => {
    await page.waitForTimeout(2000);
    clickContinueAs(page);
    await JournalEntry.addNewJournalEntry(page);
    await JDEditScreen.clickSaveButton(page);
    await JournalEntry.verifyIsRequiredMessage(page,2);
    await JournalEntry.addHeaderReferenceNumber(page);
    await JournalEntry.verifyIsRequiredMessage(1);
    await JournalEntry.inputHeaderDescriptionData(page);
    await JournalEntry.verifyIsRequiredMessage(0);
    await JournalEntry.addNewLine(page);
    await JDEditScreen.clickSaveButton(page);
    await JournalEntry.verifyIsRequiredMessage(2);
    await JournalEntry.inputFirstLineData(page,corCreditAmount);
    await JournalEntry.verifyIsRequiredMessage(0);
  });

  test("9. Verify The System Can Add Delete new Lines", async ({page}) => {
    await page.waitForTimeout(2000);
    clickContinueAs(page);
    await JournalEntry.addNewJournalEntry(page);
    await JournalEntry.verifyNumberOfRowsInTable(0);
    await JournalEntry.addNewLine(page);
    await JournalEntry.verifyNumberOfRowsInTable(1);
    await JournalEntry.addNewLine(page);
    await JournalEntry.verifyNumberOfRowsInTable(2);
    await JournalEntry.clickDeleteLine(page);
    await JournalEntry.verifyNumberOfRowsInTable(1);
    await JournalEntry.clickDeleteLine(page);
    await JournalEntry.verifyNumberOfRowsInTable(0);
  });

  test("10. Verify that all components are displayed in Edit Screen", async ({page}) => {
    await page.waitForTimeout(2000);
    clickContinueAs(page);
    await JDEditScreen.navigatesToTheLastScreenInTHeGrid(page);
    await JDEditScreen.clickEditButton(page);
    await JDEditScreen.verifyEditScreenHeaders(page);
    await JDEditScreen.verifyEditScreenTableColumnHeaders(page);
    await JDEditScreen.verifyAddNewLine(page);
    await JDEditScreen.verifyDiscardButton(page);
    await JDEditScreen.verifySaveButton(page);
    await JDEditScreen.verifySubmitButton(page);
    await JDEditScreen.verifySideSliderButton(page);
  });

  test("11. Verify Discarding Changes in Journal Entry in Edit Screen", async ({page}) => {
    await page.waitForTimeout(2000);
    clickContinueAs(page);
    await JDEditScreen.navigatesToTheLastScreenInTHeGrid(page);
    await JDEditScreen.clickEditButton(page);
    await JDEditScreen.editCreditAmount(page,corCreditAmount);
    await JDEditScreen.verifyDiscardButton(page);
    await JDEditScreen.clickDiscardButton(page);
    await JDEditScreen.verifyDiscardButtonDisAppearing(page);
    await JDEditScreen.navigatesToTheLastScreenInTHeGrid(page);
  });

  test("12. Validate Submitting Unbalanced JD on Edit Screen", async ({page}) => {
    await page.waitForTimeout(2000);
    clickContinueAs(page);
    await JDEditScreen.navigatesToTheLastScreenInTHeGrid(page);
    await JDEditScreen.clickEditButton(page);
    await JDEditScreen.clickSubmitButton(page);
    await JDEditScreen.verifySubmittingUnbalancedPOpUp(page);
  });




    test("13. Verify posting a Submitted balanced Journal Entry in Edit Screen", async ({page}) => {
      await page.waitForTimeout(2000);
      clickContinueAs(page);
      await JDEditScreen.navigatesToTheLastScreenInTHeGrid(page);
      await JDEditScreen.clickEditButton(page);
      await JDEditScreen.editCreditAmount(page,corCreditAmount);
      await JDEditScreen.clickSaveButton(page);
      await JDEditScreen.clickSubmitButton(page);
      await JDEditScreen.verifySubmittingBalanced(page);
      await JDEditScreen.verifyBeforePosting(page);
      await JDEditScreen.clickPostButton(page);
      await JDEditScreen.verifyAfterPosting(page);
    });
  
    test("14. Verify that all components are displayed in View Screen", async ({page}) => {
      await page.waitForTimeout(2000);
      clickContinueAs(page);
      await verifyMenuItemIcon(page);
      await verifyMenuItemText('journal Entry List');
      await verifyHeaderSearchTextField(page);
      await verifyAppNameInMenuItem(' Accounting ');
      await verifyAddNewButtonOnTheScreenTop(page);
      await verifyExportButtonOnTheScreenTop(page);
      await JDEditScreen.verifyJDDisplayColumnHeaders(page);
      await verifySliderButtonOnTheBottom(page);
      await verifyPaginatorOnScreenBottom(page);
    });
  
    test.afterEach(async ({page}) => {
      await page.close();
    });
  });
  
  

