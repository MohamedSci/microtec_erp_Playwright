import { LoginPage } from "1.authentication/2.login/pages/loginPage";
import test, { Page, expect } from "playwright/test";
import { trimText } from "utils/utils";
import { EditCompanyScreen } from "../../edit_company/edit_company_screen/pages/edit_compnay";
import { BranchesManagmentData } from "../data/branches_managment__data";
import { BranchesManagment } from "../pages/branches_management";
import { getAllItemsCount, getLastCellInTableValue, scrollToLastElement, verifyCorrectColumnsHeaders } from "utils/playwrightUtils";


test.describe("Display All Branches", () => {
  test.beforeEach(async ({ page }) => {
    await LoginPage.visit(page);
    await EditCompanyScreen.clickManageCompanies(page);
    await EditCompanyScreen.clickCompanyToEdit(page);
    await EditCompanyScreen.clickBranchesTab(page);
  });

  test("Verify that all the table COLUMNS Headers ARE Successfully displayed", async ({ page }) => {
    await verifyCorrectColumnsHeaders(page,BranchesManagmentData.tableHeaders);
  });

  test("Verify That All Branches are Displayed Under Branches Tab", async ({ page }) => {
    await BranchesManagment.displayingDataInTheGrid(page);
  });

  test("Checks if a row has the right data inserted and the table increases by one after submitting new data", async ({ page }) => {
    // Before Submission
    await scrollToLastElement(page);
    const initCount :number = await getAllItemsCount(page,"table", "tbody tr");

    const tName1 = await getLastCellInTableValue(page,1);
    const tRegion1 = await getLastCellInTableValue(page,2);
    const tCity1 = await getLastCellInTableValue(page,3);
    const tAddress1 = await getLastCellInTableValue(page,4);
    const tPhone1 = await getLastCellInTableValue(page,5);
    const tMail1 = await getLastCellInTableValue(page,6);

    // Submit A new Branch
    await BranchesManagment.implementAddNewBranch(page);
    await BranchesManagment.clickSaveButton(page);

    // After Submission
    await page.waitForTimeout(500);
    await page.reload();
    await page.waitForTimeout(500);
    await scrollToLastElement(page);

    const tName2 = await getLastCellInTableValue(page,1);
    const tRegion2 = await getLastCellInTableValue(page,2);
    const tCity2 = await getLastCellInTableValue(page,3);
    const tAddress2 = await getLastCellInTableValue(page,4);
    const tPhone2 = await getLastCellInTableValue(page,5);
    const tMail2 = await getLastCellInTableValue(page,6);

    expect(trimText(tName1)).not.toEqual(trimText(tName2));
    expect(trimText(tRegion1)).not.toEqual(trimText(tRegion2));
    expect(trimText(tCity1)).not.toEqual(trimText(tCity2));
    expect(trimText(tAddress1)).not.toEqual(trimText(tAddress2));
    expect(trimText(tPhone1)).not.toEqual(trimText(tPhone2));
    expect(trimText(tMail1)).not.toEqual(trimText(tMail2));

    const updatedCount = await getAllItemsCount(page,"table", "tbody tr");
    expect(updatedCount).toEqual(initCount + 1);
  });

  test("Checks if the last row has the newly correct data values after submitting new data", async ({ page }) => {
    await verifyLastCellInTable(page,1, BranchesManagmentData.branchName);
    await verifyLastCellInTable(page,2, BranchesManagmentData.branchRegion);
    await verifyLastCellInTable(page,3, BranchesManagmentData.branchCity);
    await verifyLastCellInTable(page,4, BranchesManagmentData.branchAddress);
    await verifyLastCellInTable(page,5, BranchesManagmentData.mobileNumber);
    await verifyLastCellInTable(page,6, BranchesManagmentData.branchMail);
    await BranchesManagment.checkVisibilityOfActivate(page);
    await BranchesManagment.checkVisibilityOfEditIcon(page);
    await BranchesManagment.checkVisibilityOfDeleteIcon(page);
  });

  test("Verify That The User Can cancel Delete Branch From Cancel Button on Delete Branch Dialog", async ({ page }) => {
    await BranchesManagment.clickDeleteTheLastItem(page);
    await BranchesManagment.CancelDeleteBranchDialog(page);
  });

  test("Verify That The User Can Delete Branch From Delete Button on Each Branch Row", async ({ page }) => {
    const initialRowCount = await getAllItemsCount(page,"table", "tbody tr");
    await BranchesManagment.ConfirmDeleteBranchDialog(page);
    await page.reload();
    await page.waitForTimeout(500); // Adjust wait time as needed
    const updatedCount = await getAllItemsCount(page,"table", "tbody tr");
    expect(updatedCount).toEqual(initialRowCount - 1);
  });
});



function verifyLastCellInTable(page: Page, arg1: number, branchName: string) {
  throw new Error("Function not implemented.");
}

