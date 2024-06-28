
import test, { expect } from "playwright/test";
import { getRandomNumber, generateRandomEmail, generateRandomMobileNumber, trimText } from "utils/utils";
import { LoginPage } from "../../../../../1.authentication/2.login/pages/loginPage";
import { EditCompanyScreen } from "../../edit_company/edit_company_screen/pages/edit_compnay";
import { BranchesManagment } from "../pages/branches_management";
import { getLastCellInTableValue } from "utils/playwrightUtils";

let branchName = "branch" + getRandomNumber(1, 1000);

test.describe("Add Branch Dialog", () => {
  test.beforeEach(async ({ page }) => {
    await LoginPage.visit(page);
    await EditCompanyScreen.clickManageCompanies(page);
    await EditCompanyScreen.clickCompanyToEdit(page);
    await EditCompanyScreen.clickBranchesTab(page);
    await BranchesManagment.clickAddNewButton(page);
  });

  test("Check The Labels", async ({ page }) => {
    await BranchesManagment.checkLabels(page);
  });

  test("Verify That The User Can't Delete The Branch If The Count of Branches is (1).", async ({ page }) => {
    await BranchesManagment.clickCancelIcon(page);
    await BranchesManagment.ConfirmDeleteBranchDialog(page);
  });

  test("Verify That The User Can Add Branch by clicking on the Add button on the branch card.", async ({ page }) => {
    await BranchesManagment.inputBranchName(page, branchName);
    await BranchesManagment.selectCountry(page);
    await BranchesManagment.inputBranchRegion(page, "region" + getRandomNumber(1, 1000));
    await BranchesManagment.inputBranchCity(page, "city" + getRandomNumber(1, 1000));
    await BranchesManagment.inputBranchEmail(page, generateRandomEmail());
    await BranchesManagment.inputBranchAddress(page, "address" + getRandomNumber(1, 1000));
    await BranchesManagment.selectMobileCode(page);
    await BranchesManagment.inputMobileNumber(page, "010" + generateRandomMobileNumber());
    await BranchesManagment.clickSaveButton(page);
    await BranchesManagment.verifySuccessAlertVisibility(page);
  });

  test("Verify Displaying The Validation messages", async ({ page }) => {
    await BranchesManagment.inputBranchName(page, "{enter}");
    await BranchesManagment.checKVisibilityOfRequiredMessage(page, 1);
    // Type In Region Text field without Selecting Country
    await BranchesManagment.inputBranchRegion(page, "{enter}");
    await BranchesManagment.checKVisibilityOfRequiredMessage(page, 1);

    await BranchesManagment.clickSaveButton(page);
    await BranchesManagment.checKVisibilityOfRequiredMessage(page, 2);

    await BranchesManagment.inputBranchName(page, "branch" + getRandomNumber(1, 1000) + "{enter}");
    await BranchesManagment.checKVisibilityOfRequiredMessage(page, 1);

    await BranchesManagment.selectCountry(page);
    await BranchesManagment.verifyRemovingRequiredMessage(page);

    await BranchesManagment.inputBranchEmail(page, "@test.com");
    await BranchesManagment.inputBranchRegion(page, "{enter}");
    await BranchesManagment.checKVisibilityOfInvalidEmailMessage(page);

    await BranchesManagment.inputBranchEmail(page, "email");
    await BranchesManagment.inputBranchCity(page, "{enter}");
    await BranchesManagment.checKVisibilityOfInvalidEmailMessage(page);

    await BranchesManagment.inputBranchEmail(page, "email@test");
    await BranchesManagment.inputBranchAddress(page, "{enter}");
    await BranchesManagment.checKVisibilityOfInvalidEmailMessage(page);

    await BranchesManagment.inputBranchEmail(page, "email.com");
    await BranchesManagment.inputBranchCity(page, "{enter}");
    await BranchesManagment.checKVisibilityOfInvalidEmailMessage(page);

    await BranchesManagment.inputBranchEmail(page, "email@test.co");
    await BranchesManagment.checKLackingOfInvalidEmailMessage(page);

    await BranchesManagment.inputBranchEmail(page, "email@test.com");
    await BranchesManagment.checKLackingOfInvalidEmailMessage(page);
  });

  test("Verify That The User Can Cancel The Added Branch By Cancel Button or (X) Button.", async ({ page }) => {
    await BranchesManagment.clickCancelIcon(page);
    await BranchesManagment.verifyDialogeRemoval(page);

    await BranchesManagment.clickAddNewButton(page);
    await BranchesManagment.clickCancelButton(page);
    await BranchesManagment.verifyDialogeRemoval(page);
  });

  test("Verify That The User Can't Add Branch Name To An Existing Branch Name.", async ({ page }) => {
    await BranchesManagment.clickCancelIcon(page);
    await BranchesManagment.verifyDialogeRemoval(page);

    const lastCellText = await getLastCellInTableValue(page, 1);
    await BranchesManagment.clickAddNewButton(page);
    const inputBranchNameVisible = await page.locator('.p-inputtext').nth(0).isVisible();
    expect(inputBranchNameVisible).toBeTruthy();

    const brName = trimText(lastCellText.trim());
    console.log("brName var : " + brName);
    console.log("branchName var : " + branchName);
    expect(trimText(brName)).toEqual(trimText(branchName));
    await BranchesManagment.inputBranchName(page, branchName);

    await BranchesManagment.selectCountry(page);
    await BranchesManagment.inputBranchRegion(page, "region" + getRandomNumber(1, 1000));
    await BranchesManagment.inputBranchCity(page, "city" + getRandomNumber(1, 1000));
    await BranchesManagment.inputBranchEmail(page, generateRandomEmail());
    await BranchesManagment.inputBranchAddress(page, "address" + getRandomNumber(1, 1000));
    await BranchesManagment.selectMobileCode(page);
    await BranchesManagment.inputMobileNumber(page, "010" + generateRandomMobileNumber());
    await BranchesManagment.clickSaveButton(page);
    await BranchesManagment.verifySuccessAlertInVisibility(page);
  });
});
