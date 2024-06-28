import test, { expect } from 'playwright/test';
import { LoginPage } from '../../../../../1.authentication/2.login/pages/loginPage';
import { EditCompanyScreen } from '../../edit_company/edit_company_screen/pages/edit_compnay';
import { CompanyList } from '../pages/company_list';

test.describe("Company List", () => {
  test.beforeEach(async ({ page }) => {
    await LoginPage.visit(page);
    await EditCompanyScreen.clickManageCompanies(page);
  });

  test("Verify That All The Component of The Grid are Displayed (Rows and Columns)", async ({ page }) => {
    // Verify Column Headers
    await expect(page.locator("table thead tr th").nth(0)).toContainText('Code');
    await expect(page.locator("table thead tr th").nth(1)).toContainText('Companies Name');
    await expect(page.locator("table thead tr th").nth(2)).toContainText('Companies Type');
    await expect(page.locator("table thead tr th").nth(3)).toContainText('Tax ID');
    await expect(page.locator("table thead tr th").nth(4)).toContainText('Commercial ID');
    await expect(page.locator("table thead tr th").nth(5)).toContainText('Phone');
    await expect(page.locator("table thead tr th").nth(6)).toContainText('Status');
    await expect(page.locator("table thead tr th").nth(7)).toContainText('Actions');
  });

  test("Verify That The Cells Under Status Column is Actionable (Radio Button)", async ({ page }) => {
    await CompanyList.checkActivationDeactivationSwitching(page);
  });

  test("Verify That The Edit is navigate To The Edit Company of The Company Represent on This Row.",async ({ page }) => {
    await CompanyList.clickToNavigateCompanyEdit(page);
  });

  test("Verify That The Paginator is Successfully Displayed.", async ({ page })=> {
    await CompanyList.checkPaginator(page);
  });
});
