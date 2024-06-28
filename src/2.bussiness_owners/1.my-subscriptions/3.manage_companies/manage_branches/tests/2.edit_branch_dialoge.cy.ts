import { getLastCellInTableValue } from "utils/playwrightUtils";
import { LoginPage } from "../../../../../1.authentication/2.login/pages/loginPage";
import { BranchesManagmentData } from "../data/branches_managment__data";
import { BranchesManagment } from "../pages/branches_management";
import test, { expect } from "playwright/test";
import { generateRandomString, generateRandomMobileNumber, generateRandomEmail } from "utils/utils";
import { EditCompanyScreen } from "../../edit_company/edit_company_screen/pages/edit_compnay";

test.describe("Edit Branch Dialog", () => {
  test.beforeEach(async ({ page }) => {
    await LoginPage.visit(page);
    await EditCompanyScreen.clickManageCompanies(page);
    await EditCompanyScreen.clickCompanyToEdit(page);
    await EditCompanyScreen.clickBranchesTab(page);
  });

  test("Verify That The Edit Branch Dialog Has All Labels", async ({ page }) => {
    await BranchesManagment.clickEditBranch(page);
    await BranchesManagment.checkLabels(page);
  });

  test("Verify That The User Can Cancel The Edited Branch By Cancel Button or (X) Button", async ({ page }) => {
    await BranchesManagment.clickEditBranch(page);
    await BranchesManagment.inputBranchName(page, "Edited_" + BranchesManagmentData.branchName);
    await BranchesManagment.selectCountry(page);
    await BranchesManagment.inputBranchRegion(page, "Edited_" + BranchesManagmentData.branchRegion);
    await BranchesManagment.inputBranchCity(page, "Edited_" + BranchesManagmentData.branchCity);
    await BranchesManagment.inputBranchEmail(page, "Edited_" + BranchesManagmentData.branchMail);
    await BranchesManagment.inputBranchAddress(page, "Edited_" + BranchesManagmentData.branchAddress);
    await BranchesManagment.selectMobileCode(page);
    await BranchesManagment.inputMobileNumber(page, "123" + BranchesManagmentData.mobileNumber);
    await BranchesManagment.cancelEditBranchDialog(page);
  });

  test("Verify That The User Can Edit Branch by clicking on the edit button on the branch card", async ({ page }) => {
    await BranchesManagment.clickEditBranch(page);
    await BranchesManagment.inputBranchName(page, "Edited_" + BranchesManagmentData.branchName);
    await BranchesManagment.selectCountry(page);
    await BranchesManagment.inputBranchRegion(page, "Edited_" + BranchesManagmentData.branchRegion);
    await BranchesManagment.inputBranchCity(page, "Edited_" + BranchesManagmentData.branchCity);
    await BranchesManagment.inputBranchEmail(page, "Edited_" + BranchesManagmentData.branchMail);
    await BranchesManagment.inputBranchAddress(page, "Edited_" + BranchesManagmentData.branchAddress);
    await BranchesManagment.selectMobileCode(page);
    // BranchesManagment.inputMobileNumber();
    await BranchesManagment.submitEditBranchDialog(page);
    await BranchesManagment.validateTheSuccessMessage(page);
    await BranchesManagment.clickEditBranch(page);
    // BranchesManagment.verifyBranchName("Edited_"+BranchesManagmentData.branchName);
    await BranchesManagment.verifyBranchRegion(page, "Edited_" + BranchesManagmentData.branchRegion);
    await BranchesManagment.verifyBranchCity(page, "Edited_" + BranchesManagmentData.branchCity);
    await BranchesManagment.verifyBranchEmail(page, "Edited_" + BranchesManagmentData.branchMail);
    await BranchesManagment.verifyBranchAddress(page, "Edited_" + BranchesManagmentData.branchAddress);
  });

  test("Verify That The User Can't Edit Branch Name To An Existing Branch Name", async ({ page }) => {
    await BranchesManagment.validateDuplicatedBranchName(page);
  });

  test("Verify that the Edit Branch Dialog has the Correct data values as After Submitting Editing", async ({ page }) => {
    const name = "name" + generateRandomString(10);
    const region = "region" + generateRandomString(10);
    const city = "city" + generateRandomString(10);
    const address = "address" + generateRandomString(10);
    const phone = "010" + generateRandomMobileNumber();
    const email = generateRandomEmail();

    await BranchesManagment.clickEditBranch(page);
    await BranchesManagment.inputBranchName(page, name);
    await BranchesManagment.selectCountry(page);
    await BranchesManagment.inputBranchRegion(page, region);
    await BranchesManagment.inputBranchCity(page, city);
    await BranchesManagment.inputBranchAddress(page, address);
    await BranchesManagment.selectMobileCode(page);
    await BranchesManagment.inputMobileNumber(page, phone);
    await BranchesManagment.inputBranchEmail(page, email);
    await BranchesManagment.submitEditBranchDialog(page);

    const [code, nameT1, regionT1, cityT1, addressT1, phoneT1, emailT1] = await Promise.all([
      getLastCellInTableValue(page, 0),
      getLastCellInTableValue(page, 1),
      getLastCellInTableValue(page, 2),
      getLastCellInTableValue(page, 3),
      getLastCellInTableValue(page, 4),
      getLastCellInTableValue(page, 5),
      getLastCellInTableValue(page, 6)
    ]);

    expect(name).toEqual(nameT1.toString().trim());
    expect(region).toEqual(regionT1.toString().trim());
    expect(city).toEqual(cityT1.toString().trim());
    expect(email).toEqual(emailT1.toString().trim());
    expect(address).toEqual(addressT1.toString().trim());
    expect(phone).toEqual(phoneT1.toString().trim());
  });
});
