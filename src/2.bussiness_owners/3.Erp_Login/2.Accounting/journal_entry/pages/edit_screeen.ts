import { Page } from "playwright";
import { expect } from "playwright/test";
import { clickContinueAs } from "utils/playwrightUtils";

export class JDEditScreen {
    private page: Page;

    constructor(page: Page) {
        page = page;
    }
        static async navigatesToTheLastScreenInTHeGrid(page:Page) {
            await page.click('div[aria-label="dropdown trigger"]');
            await page.click('li[aria-label="30"]');
            await page.click('[aria-label="3"]');
            await page.reload();
            await page.waitForTimeout(1000);
            await clickContinueAs(page); // Assuming you have a custom function for this
            await page.click('div[aria-label="dropdown trigger"]');
            await page.click('li[aria-label="30"]');
            await page.click('[aria-label="3"]');
        }
    
        static async clickSaveButton(page:Page) {
            await page.locator('button.btn.save').scrollIntoViewIfNeeded();
            await expect(page.locator('button.btn.save')).toBeVisible();
            await page.locator('button.btn.save').click();
        }
    
        static async clickDiscardButton(page:Page) {
            await page.locator('button.btn.discard').scrollIntoViewIfNeeded();
            await expect(page.locator('button.btn.discard')).toBeVisible();
            await page.locator('button.btn.discard').click();
        }
    
        static async clickEditButton(page:Page) {
            const editButton = await page.locator('.edit > .p-ripple > .pi').last();
            await editButton.scrollIntoViewIfNeeded();
            await expect(editButton).toBeVisible();
            await editButton.click();
        }
    
        static async submitDataOnEditScreen(page:Page) {
            await page.locator('button.btn.save').scrollIntoViewIfNeeded();
            await page.locator('button.btn.save').click();
        }
    
        static async postData(page:Page) {
            const saveButton = await page.locator('button.btn.btn.save').last();
            await saveButton.scrollIntoViewIfNeeded();
            await saveButton.click();
            await page.locator('.swal2-confirm').click();
        }
    
        static async verifyEditScreenHeaders(page:Page) {
            await expect(page.locator(':nth-child(2) > app-layout-page.ng-star-inserted > [dir="ltr"] > app-layout-header > nav > .card > .header_bussiness > .header_content > p-menubar.p-element > .p-menubar > .p-menubar-start > .start_nav > .modules > .btn_mod_select')).toBeVisible();
            await expect(page.locator(':nth-child(2) > app-layout-page.ng-star-inserted > [dir="ltr"] > app-layout-header > nav > .card > .header_bussiness > .header_content > p-menubar.p-element > .p-menubar > .p-menubar-start > .start_nav > .modules > .btn_mod_select')).toBeEnabled();
            await expect(page.locator('.grid > :nth-child(1) > lib-label > .form-label')).toBeVisible();
            await expect(page.locator('.grid > :nth-child(1) > lib-label > .form-label')).toHaveText('   Journal Code ');
            await expect(page.locator(':nth-child(1) > .view')).toBeVisible();
            // Repeat assertions for other elements...
        }
    
        static async verifyEditScreenTableColumnHeaders(page:Page) {
            await expect(page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(1)')).toBeVisible();
            await expect(page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(1)')).toHaveText('Id');
            await expect(page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(2)')).toBeVisible();
            await expect(page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(2)')).toHaveText('Account Code');
            // Repeat assertions for other table headers...
        }
    
    


    
        static async verifyAddNewLine(page:Page) {
            await expect(await page.locator('.add_new > .btn')).toBeVisible();
            await expect(await page.locator('.add_new > .btn')).toBeEnabled();
            await expect(await page.locator('.add_new > .btn')).toHaveText(' Add New Line ');
        }
    
        static async verifyDiscardButton(page:Page) {
            await expect(await page.locator('.discard')).toBeVisible();
            await expect(await page.locator('.discard')).toBeEnabled();
            await expect(await page.locator('.discard')).toHaveText(' Discard ');
        }
    
        static async verifyDiscardButtonDisAppearing(page:Page) {
            var discardBtnCount =await page.locator('.discard');
            await expect(discardBtnCount).toBe(0);
        }
    
        static async verifySaveButton(page:Page) {
            await expect(await page.locator('.btn_group > :nth-child(2) > .btn')).toBeVisible();
            await expect(await page.locator('.btn_group > :nth-child(2) > .btn')).toBeEnabled();
            await expect(await page.locator('.btn_group > :nth-child(2) > .btn')).toHaveText('Save');
        }
    
        static async verifySubmitButton(page:Page) {
            await expect(await page.locator(':nth-child(3) > .btn')).toBeVisible();
            await expect(await page.locator(':nth-child(3) > .btn')).toBeEnabled();
            await expect(await page.locator(':nth-child(3) > .btn')).toHaveText(' Submit ');
        }
    
        static async verifySideSliderButton(page:Page) {
            await expect(await page.locator(':nth-child(2) > app-layout-page.ng-star-inserted > [dir="ltr"] > .Layout > app-layout-sidebar > .sidebar > .logo-details > .pi')).toBeVisible();
            await expect(await page.locator(':nth-child(2) > app-layout-page.ng-star-inserted > [dir="ltr"] > .Layout > app-layout-sidebar > .sidebar > .logo-details > .pi')).toBeEnabled();
        }
    
        static async editCreditAmount(page:Page,num: string) {
            await page.locator(':nth-child(2) > [peditablecolumnfield="creditAmount"] > .p-element').click();
            await page.locator('p-celleditor.p-element > .ng-untouched > .p-inputtext').clear();
            await page.locator('p-celleditor.p-element > .ng-untouched > .p-inputtext').type(num);
        }
    
        static async clickSubmitButton(page:Page) {
            await page.locator(':nth-child(3) > .btn').click();
        }
    
        static async verifySubmittingUnbalancedPOpUp(page:Page) {
            await expect(await page.locator('#swal2-title')).toBeVisible();
            await expect(await page.locator('#swal2-title')).toHaveText('One or more validation failures have occurred.');
            await expect(await page.locator('#swal2-html-container')).toBeVisible();
            await expect(await page.locator('#swal2-html-container')).toHaveText('Journal entry not balanced');
            await expect(await page.locator('.swal2-x-mark-line-right')).toBeVisible();
            await expect(await page.locator('.swal2-confirm')).toBeVisible();
            await expect(await page.locator('.swal2-confirm')).toBeEnabled();
            await expect(await page.locator('.swal2-confirm')).toHaveText('OK');
            await page.locator('.swal2-confirm').click();
        }
    
        static async verifySubmittingBalanced(page:Page) {
            await page.locator('.swal2-confirm').click();
            await page.locator('.btn_group > :nth-child(2) > .btn').click();
            await page.locator('.swal2-confirm').click();
        }
    
        static async clickPostButton(page:Page) {
            await page.locator('button.btn.save').scrollIntoViewIfNeeded();
            await page.locator('button.btn.save').click();
        }
    
        static async verifyBeforePosting(page:Page) {
            await expect(await page.locator('.btn_group > div > .btn')).toBeVisible();
            await expect(await page.locator('.btn_group > div > .btn')).toBeEnabled();
        }
    
        static async verifyAfterPosting(page:Page) {
            var postButton = await page.locator('button:has-text('+/post/i+')').count();
            await expect(postButton).toBe(0);
        }
    
        static async verifyJDDisplayColumnHeaders(page:Page) {
            await expect(await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(1)')).toBeVisible();
            await expect(await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(1)')).toHaveText(' Id ');
            await expect(await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(2)')).toBeVisible();
            await expect(await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(2)')).toHaveText(' Journal Code ');
            await expect(await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(3)')).toBeVisible();
            await expect(await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(3)')).toHaveText(' Reference ');
            await expect(await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(4)')).toBeVisible();
            await expect(await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(4)')).toHaveText(' Date ');
            await expect(await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(5)')).toBeVisible();
            await expect(await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(5)')).toHaveText(' Type ');
            await expect(await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(6)')).toBeVisible();
            await expect(await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(6)')).toHaveText(' Document Name ');
            await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(7)').scrollIntoViewIfNeeded();
            await expect(await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(7)')).toBeVisible();
            await expect(await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(7)')).toHaveText(' Document Code ');
            await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(8)').scrollIntoViewIfNeeded();
            await expect(await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(8)')).toBeVisible();
            await expect(await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(8)')).toHaveText(' Repeated ');
            await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(9)').scrollIntoViewIfNeeded();
            await expect(await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(9)')).toBeVisible();
            await expect(await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(9)')).toHaveText(' Reversed ');
            await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(10)').scrollIntoViewIfNeeded();
            await expect(await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(10)')).toBeVisible();
            await expect(await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(10)')).toHaveText(' Status ');
            await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(11)').scrollIntoViewIfNeeded();
            await expect(await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(11)')).toBeVisible();
            await expect(await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(11)')).toHaveText(' Debit ');
            await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(12)').scrollIntoViewIfNeeded();
            await expect(await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(12)')).toBeVisible();
            await expect(await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(12)')).toHaveText(' Credit ');
            await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(13)').scrollIntoViewIfNeeded();
            await expect(await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(13)')).toBeVisible();
            await expect(await page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(13)')).toHaveText(' Actions ');
        }
    
    

}
