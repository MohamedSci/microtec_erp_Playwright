import { expect } from 'playwright/test';
import { BranchesManagmentData } from '../data/branches_managment__data';

class BranchesManagment {
  static async clickAddNewButton(page: any) {
    await page.click('button[label="Add New"]');
  }

  static async checkLabels(page: any) {
    await page.locator('label.form-label').expectCount(8);
    await page.locator('label[for="branchName"]').expectVisible();
    await expect(page.locator('label.form-label').withText('Branch Name')).toBeVisible();
    await page.locator('label[for="countryCode"]').expectVisible();
    await expect(page.locator('label.form-label').withText('Country')).toBeVisible();
    await expect(page.locator('label.form-label').withText('Branch Region')).toBeVisible();
    await expect(page.locator('label.form-label').withText('Branch City')).toBeVisible();
    await expect(page.locator('label.form-label').withText('Branch Email')).toBeVisible();
    await expect(page.locator('label.form-label').withText('Branch Address')).toBeVisible();
    await expect(page.locator('label.form-label').withText('Mobile Number Code')).toBeVisible();
    await expect(page.locator('label.form-label').withText('Mobile Number')).toBeVisible();
  }

  static async inputBranchName(page: any, str: string) {
    await page.locator('.p-inputtext').nth(0).clear();
    await page.locator('.p-inputtext').nth(0).type(str);
  }

  static async verifyBranchName(page: any, str: string) {
    await expect(page.locator('.p-inputtext').nth(0)).toHaveText(str);
  }

  static async validateDuplicatedBranchName(page: any) {
    const brName = await page.locator('.p-datatable-tbody > :nth-child(1) > :nth-child(2)').innerText();
    await page.clickEditBranch(page);
    await BranchesManagment.inputBranchName(page, brName);
    await BranchesManagment.submitEditBranchDialog(page);
    await BranchesManagment.verifySuccessAlertInVisibility(page);
  }

  static async clickDialogeTitle(page: any) {
    await page.locator('div.title').nth(0).click();
  }

  static async selectCountry(page: any) {
    await page.locator('span[role="combobox"]').nth(0).click({ force: true });
    await page.locator('li').withText(/egypt/i).click();
    await page.locator('span[role="combobox"]').nth(0).click({ force: true });
    await BranchesManagment.clickDialogeTitle(page);
  }

  static async inputBranchRegion(page: any, str: string) {
    await page.inputText(1, str);
  }

  static async verifyBranchRegion(page: any, str: string) {
    await page.verifyText(1, str);
  }

  static async inputBranchCity(page: any, str: string) {
    await page.inputText(2, str);
  }

  static async verifyBranchCity(page: any, str: string) {
    await page.verifyText(2, str);
  }

  static async inputBranchEmail(page: any, str: string) {
    await page.inputText(3, str);
  }

  static async verifyBranchEmail(page: any, str: string) {
    await page.verifyText(3, str);
  }

  static async inputBranchAddress(page: any, str: string) {
    await page.inputText(4, str);
  }

  static async verifyBranchAddress(page: any, str: string) {
    await page.verifyText(4, str);
  }

  static async selectMobileCode(page: any) {
    await page.locator('span[role="combobox"]').nth(1).click({ force: true });
    await page.locator('span').withText('+20').click();
    await page.locator('span[role="combobox"]').nth(1).click({ force: true });
    await BranchesManagment.clickDialogeTitle(page);
  }

  static async inputMobileNumber(page: any, str: string) {
    await page.locator('input[type="tel"]').clear();
    await page.locator('input[type="tel"]').type(str);
  }

  static async checKVisibilityOfRequiredMessage(page: any, len: number) {
    await page.locator('span.errorMessage.ng-star-inserted').expectCount(len);
  }

  static async verifyRemovingRequiredMessage(page: any) {
    await page.locator('span.errorMessage.ng-star-inserted').expectCount(0);
  }

  static async clickSaveButton(page: any) {
    await page.locator('button').withText(/save/i).scrollIntoView();
    await page.locator('button').withText(/save/i).click();
  }

  static async checKVisibilityOfInvalidEmailMessage(page: any) {
    await page.locator('span.errorMessage.ng-star-inserted').withText('Invalid Email Address, the pattern should be :ABC@cba.com').expectVisible();
  }

  static async checKLackingOfInvalidEmailMessage(page: any) {
    await page.locator('span.errorMessage.ng-star-inserted').expectCount(0);
  }

  static async clickCancelButton(page: any) {
    await page.locator('button.cancel').click();
  }

  static async clickCancelIcon(page: any) {
    await page.locator('div.pi.pi-times.cancel').click();
  }

  static async verifyDialogeRemoval(page: any) {
    await page.locator('.form-label').expectCount(0);
  }

  static async verifySuccessAlertInVisibility(page: any) {
    await page.waitForTimeout(4000); // Adjust the timeout as needed
    await expect(page.locator('h2').withText(/success/i)).not.toBeVisible();
  }

  static async verifySuccessAlertVisibility(page: any) {
    await page.waitForTimeout(4000); // Adjust the timeout as needed
    await expect(page.locator('h2').withText(/success/i)).toBeVisible();
  }

  static async displayingDataInTheGrid(page: any) {
    const codeVal = await page.locator('.user_info > p').innerText();
    expect(codeVal).not.toBeNull();
    await page.locator('.p-datatable-tbody > tr.ng-star-inserted > :nth-child(2)').expectVisible();
    await page.locator('.p-datatable-tbody > tr.ng-star-inserted > :nth-child(3)').expectVisible();
    await page.locator('.p-datatable-tbody > tr.ng-star-inserted > :nth-child(4)').expectVisible();
    await page.locator('.p-datatable-tbody > tr.ng-star-inserted > :nth-child(5)').expectVisible();
    await page.locator('.p-datatable-tbody > tr.ng-star-inserted > :nth-child(6)').expectVisible();
    await page.locator('.p-datatable-tbody > tr.ng-star-inserted > :nth-child(7)').expectVisible();
    await page.locator(':nth-child(8) > .checked > .active').last().scrollIntoView();
    await page.locator('.p-datatable-tbody > tr.ng-star-inserted > :nth-child(9)').last().scrollIntoView();
  }

  static async checkVisibilityOfActivate(page: any) {
    await page.locator(':nth-child(8) > .checked > .active').expectVisible();
  }

  static async checkVisibilityOfEditIcon(page: any) {
    await page.locator('[icon="pi pi-pencil"] > .p-ripple > .pi').expectAttribute('class', 'pi-pencil');
  }

  static async clickEditBranch(page: any) {
    await page.locator('[icon="pi pi-pencil"] > .p-ripple > .pi').last().scrollIntoView();
    await page.locator('div.title').withText('Edit Branch').expectVisible();
  }

  static async cancelEditBranchDialog(page: any) {
    await page.locator('button.cancel').click();
    await page.locator('div[role="dialog"]').expectCount(0);
  }

  static async submitEditBranchDialog(page: any) {
    await page.locator('button.save').click();
    await page.locator('div[role="dialog"]').expectCount(0);
  }

  static async checkVisibilityOfDeleteIcon(page: any) {
    await page.locator('[icon="pi pi-trash"] > .p-ripple > .pi').expectAttribute('class', 'pi-trash');
  }

  static async ConfirmDeleteBranchDialog(page: any) {
    await page.locator('[icon="pi pi-trash"] > .p-ripple > .pi').last().scrollIntoView();
    await page.locator('h2#swal2-title').withText('Are you sure?').expectVisible();
    await page.locator('button.swal2-confirm.swal2-styled.swal2-default-outline').click();
    await page.locator('div.swal2-popup.swal2-modal.swal2-icon-warning.swal2-show').expectCount(0);
  }

  static async clickDeleteTheLastItem(page: any) {
    await page.locator('[icon="pi pi-trash"] > .p-ripple > .pi').last().scrollIntoView().click();
  }

  static async CancelDeleteBranchDialog(page: any) {
    await page.locator('h2#swal2-title').withText('Are you sure?').expectVisible();
    await page.locator('button.swal2-cancel.swal2-styled.swal2-default-outline').click();
    await page.locator('div.swal2-popup.swal2-modal.swal2-icon-warning.swal2-show').expectCount(0);
  }

  static async verifyCountryInEditDialog(page: any) {
    await page.locator('#pn_id_16 > .p-dropdown-label').expectText(BranchesManagmentData.branchCountry);
    await page.locator('#pn_id_18 > .p-dropdown-label').expectText(BranchesManagmentData.branchCountryCode);
    await BranchesManagment.cancelEditBranchDialog(page);
  }

  static async verifyBranchCodeInEditDialog(page: any) {
    const txt = await page.locator(':nth-child(1) > :nth-child(1) > .user_info > p').innerText();
    await BranchesManagment.clickEditBranch(page);
    const text = await page.locator('.code_text').innerText();
    expect(txt.trim()).toEqual(text.trim());
    await BranchesManagment.cancelEditBranchDialog(page);
  }

  static async verifyBranchNameInEditDialog(page: any) {
    const nameT1 = await page.locator('.p-datatable-tbody > :nth-child(1) > :nth-child(2)').innerText();
    await BranchesManagment.clickEditBranch(page);
    const inputTextValue = await page.locator('input[type="text"]').nth(0).innerText();
    expect(inputTextValue).toEqual(nameT1);
    await BranchesManagment.cancelEditBranchDialog(page);
  }

  static async verifyBranchRegionInEditDialog(page: any) {
    const nameT1 = await page.locator('.p-datatable-tbody > :nth-child(1) > :nth-child(3)').innerText();
    await BranchesManagment.clickEditBranch(page);
    const text = await page.locator('input[type="text"]').nth(1).innerText();
    expect(text.trim()).toEqual(nameT1.trim());
    await BranchesManagment.cancelEditBranchDialog(page);
  }

  static async verifyBranchCityInEditDialog(page: any) {
    const nameT1 = await page.locator('.p-datatable-tbody > :nth-child(1) > :nth-child(4)').innerText();
    await BranchesManagment.clickEditBranch(page);
    const val = await page.locator('input[type="text"]').nth(2).innerText();
    expect(val.trim()).toEqual(nameT1.trim());
    await BranchesManagment.cancelEditBranchDialog(page);
  }

  static async verifyBranchAddressInEditDialog(page: any) {
    const nameT1 = await page.locator('.p-datatable-tbody > :nth-child(1) > :nth-child(5)').innerText();
    await BranchesManagment.clickEditBranch(page);
    const val = await page.locator('input[type="text"]').nth(4).innerText();
    expect(val.trim()).toEqual(nameT1.trim());
    await BranchesManagment.cancelEditBranchDialog(page);
  }

  static async verifyBranchEmailInEditDialog(page: any) {
    const nameT1 = await page.locator('.p-datatable-tbody > :nth-child(1) > :nth-child(7)').innerText();
    await BranchesManagment.clickEditBranch(page);
    const val = await page.locator('input[type="text"]').nth(3).innerText();
    expect(val.trim()).toEqual(nameT1.trim());
    await BranchesManagment.cancelEditBranchDialog(page);
  }

  static async validateTheSuccessMessage(page: any) {
    await page.locator('#swal2-title').expectText('Success');
    await page.locator('#swal2-html-container').expectText('Branch Updated Successfully');
    await page.locator('.swal2-confirm').click();
    await page.locator('.swal2-success-ring').expectVisible();
  }

  static async implementAddNewBranch(page: any) {
    await BranchesManagment.clickAddNewButton(page);
    await BranchesManagment.inputBranchName(page, BranchesManagmentData.branchName);
    await BranchesManagment.selectCountry(page);
    await BranchesManagment.inputBranchRegion(page, BranchesManagmentData.branchRegion);
    await BranchesManagment.inputBranchCity(page, BranchesManagmentData.branchCity);
    await BranchesManagment.inputBranchEmail(page, BranchesManagmentData.branchMail);
    await BranchesManagment.inputBranchAddress(page, BranchesManagmentData.branchAddress);
    await BranchesManagment.selectMobileCode(page);
    await BranchesManagment.inputMobileNumber(page, BranchesManagmentData.mobileNumber);
  }
}

export { BranchesManagment };
