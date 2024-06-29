import { EditCompanyScreen } from "2.bussiness_owners/1.my-subscriptions/3.manage_companies/edit_company/edit_company_screen/pages/edit_compnay";
import { Page } from "playwright";
import { expect } from "playwright/test";
import { clickContinueAs } from "utils/playwrightUtils";
import { getRandomNumber, trimText } from "utils/utils";
import { LoginPage } from "../../../../1.authentication/2.login/pages/loginPage";
import { MySubscriptionsPage } from "../../../1.my-subscriptions/1.my_subscriptions_page/pages/my-subscriptions_page";
import { AddDomainSpace } from "../../../1.my-subscriptions/2.add_domain_space/pages/add_domain_space";
import { AddCompanyDialog } from "../../../1.my-subscriptions/3.manage_companies/add_company_dialoge/pages/AddCompanyDialoge";
import { ManageApps } from "../../../2.manage_apps/pages/manage_apps";

export class GeneralSetting {
    static async visitTheSubDomain(page: Page, sdURL: string) {
        // Visit the domain
        await page.goto(sdURL);
        // Confirm Refactoring
        await page.waitForTimeout(500);
        // Check if the button is visible and click it
        await clickContinueAs(page);
    }

    static async clickDeleteIcon(page: Page) {
        const deleteButtons = await page.$$('button.p-ripple.p-element.p-button.p-component.p-button-icon-only.p-button-secondary.p-button-rounded.p-button-text');
        const lastDeleteButton = deleteButtons[deleteButtons.length - 1];
        await lastDeleteButton.scrollIntoViewIfNeeded();
        await lastDeleteButton.click();
    }

    static async confirmDeletePopUp(page: Page) {
        const yesButton = page.locator('button', { hasText: /yes, change status/i });
        await yesButton.waitFor();
        await yesButton.click();
    }

    static async verifyThatNewTagNameIsNOTAddedToTheTable(page: Page, tagName: string) {
        const lastRow = await page.locator('table tbody tr').last();
        const cell = await lastRow.locator('td').nth(2);
        await cell.scrollIntoViewIfNeeded();
        await expect(cell).not.toContainText(tagName);
    }

    static async clickTheShiftingAppCloseIcon(page: Page) {
        const closeButton = page.locator('button timesicon');
        await closeButton.waitFor();
        await closeButton.click();
    }

    static async clickDialogSaveButton(page: Page) {
        const saveButton = page.locator('button', { hasText: /save/i });
        await saveButton.waitFor();
        await saveButton.click();
    }

    static async clickDialogDiscardButton(page: Page) {
        const discardButton = page.locator('button', { hasText: /discard/i });
        await discardButton.waitFor();
        await discardButton.click();
    }

    static async clickAddNewButton(page: Page) {
        const addNewButton = page.locator('button', { hasText: /add new/i });
        await addNewButton.waitFor();
        await addNewButton.click();
    }

    static async inputTagName(page: Page, tagName: string) {
        const inputField = page.locator('input.p-inputtext.p-component.p-element.ng-star-inserted');
        await inputField.clear();
        await inputField.type(tagName);
    }

    static async clearTagName(page: Page) {
        const inputField = page.locator('input.p-inputtext.p-component.p-element.ng-star-inserted');
        await inputField.clear();
    }

    static async validateRequiredMessage(page: Page, num: number) {
        const errorMessageSelector = '.customWidth > .group > lib-field-validations > .error > .errorMessage';
        const errorMessages = page.locator(errorMessageSelector);

        if (num === 0) {
            await expect(errorMessages).not.toBeVisible();
        } else {
            await expect(errorMessages).toHaveText(' Required ');
            const elements = await errorMessages.elementHandles();
            expect(elements.length).toBe(num);
        }
    }

    static async verifyAddNewTagDisplaying(page: Page) {
        const header = page.locator('#pn_id_17_header');
        await header.waitFor();
    }

    static async verifyAddNewTagDisappearing(page: Page) {
        const header = page.locator('#pn_id_17_header');
        await expect(header).not.toBeVisible();
    }

    static async clickEditButton(page: Page) {
        const editButtons = page.locator('p-button.p-element.edit');
        await editButtons.last().scrollIntoViewIfNeeded();
        await editButtons.last().click();
    }

    static async clickShifttingButton(page: Page) {
        const shiftButton = page.locator('button.btn_mod_select').nth(1);
        await shiftButton.waitFor();
        await shiftButton.click();
    }

    static async shiftToAnotherApp(page: Page, index: number) {
        const card = page.locator('div.card.ng-star-inserted').nth(index);
        await card.waitFor();
        await card.click();
    }

    static async chooseTheJournalEntryListButton(page: Page) {
        const chooseAppButton = page.locator('span', { hasText: 'Choose App' });
        await chooseAppButton.waitFor();
        await chooseAppButton.click();

        const firstModule = page.locator('.containar_modules > :nth-child(1)');
        await firstModule.waitFor();
        await firstModule.click();
    }

    static async verifyNavigatingToTheJournalEntryListButton(page: Page) {
        const menuItemText = page.locator('.p-menuitem-text');
        await menuItemText.waitFor();
        await expect(menuItemText).toHaveText('journal Entry List');

        const headers = [
            'Id', 'Journal Code', 'Reference', 'Date', 'Type',
            'Document Name', 'Document Code', 'Repeated',
            'Reversed', 'Status', 'Debit', 'Credit', 'Actions'
        ];

        for (let i = 0; i < headers.length; i++) {
            const header = page.locator('.p-datatable-thead > tr.ng-star-inserted > :nth-child(' + (i + 1) + ')');
            await header.scrollIntoViewIfNeeded();
            await expect(header).toHaveText(headers[i]);
        }

        const searchInput = page.locator('.p-input-icon-left > .p-inputtext');
        await expect(searchInput).toBeVisible();
        await expect(searchInput).toBeEnabled();

        const addNewButton = page.locator('.group > :nth-child(2) > :nth-child(1)');
        await expect(addNewButton).toBeVisible();
        await expect(addNewButton).toBeEnabled();
        await expect(addNewButton).toHaveText(' Add New ');

        const exportButton = page.locator('.export');
        await expect(exportButton).toBeVisible();
        await expect(exportButton).toBeEnabled();
        await expect(exportButton).toHaveText(' Export ');

    }

    static async clickGeneralSetting(page: Page) {
        const chooseAppButton = page.locator('span', { hasText: 'Choose App' });
        await chooseAppButton.waitFor();
        await chooseAppButton.click();

        const generalSetting = page.locator(':nth-child(2) > .card_photo > img');
        await generalSetting.waitFor();
        await generalSetting.click();
    }

    static async navigateToTheLastSubDomainGeneralSettings(page: Page) {
        await clickContinueAs(page);
        const subDomain = page.locator('div.supdomain.paragraph_b20').last();
        await subDomain.scrollIntoViewIfNeeded();
        const domainText = await subDomain.textContent();
        const cURL = "https://" + domainText + ":2050/erp/";
        await GeneralSetting.visitTheSubDomain(page, cURL);
    }



    static async verifyAddNewButton(page: Page) {
        const button = page.locator(".p-button-label");
        await expect(button).toHaveClass(/p-button-label/);
        await expect(button).toHaveText("Add New");
    }

    static async verifySearchTextField(page: Page) {
        const searchField = page.locator(".flex > .p-inputtext");
        await expect(searchField).toBeVisible();
        await expect(searchField).toBeEnabled();
        await expect(searchField).not.toBeChecked();
    }

    static async verifyColumnHeaders(page: Page) {
        const headers = ["Id", "Code", "Name", "Status", "Modules", "Actions"];
        for (let i = 0; i < headers.length; i++) {
            const header = page.locator(`tr.ng-star-inserted > :nth-child(${i + 1})`);
            await expect(header).toHaveText(` ${headers[i]} `);
        }
    }

    static async verifyPaginator(page: Page) {
        const paginator = page.locator(".p-paginator");
        await expect(paginator).toBeVisible();
        await expect(paginator).toHaveText("10");
        await expect(paginator).toHaveClass(/p-paginator/);
    }

    static async clickAddNewTag(page: Page) {
        const addNewTagButton = page.locator(".p-button-label");
        await addNewTagButton.click();
    }

    static async closeTheDialogIcon(page: Page) {
        const closeIcon = page.locator(".p-dialog-header-close-icon > path");
        await expect(closeIcon).toBeVisible();
    }

    static async verifyCodeTextField(page: Page) {
        const codeTextField = page.locator(".form-control > .p-inputtext");
        await expect(codeTextField).toBeVisible();
        await expect(codeTextField).toBeDisabled();
        await expect(codeTextField).not.toBeChecked();
        await expect(codeTextField).toHaveClass(/read/);
    }

    static async verifyNameTextField(page: Page) {
        const nameTextField = page.locator(":nth-child(2) > lib-form-group > .group > .ng-untouched > .p-inputtext");
        await expect(nameTextField).toBeVisible();
        await expect(nameTextField).toBeEnabled();
        await expect(nameTextField).not.toBeChecked();
        await expect(nameTextField).toHaveClass(/p-inputtext/);
    }

    static async verifyMultiApplicabilityDropDown(page: Page) {
        const dropDown = page.locator(".p-multiselect-label");
        await dropDown.click({ force: true });
        const checkBox = page.locator(".p-checkbox-box");
        await expect(checkBox).toBeVisible();
        await expect(checkBox).toHaveAttribute("aria-checked", "false");
        await expect(checkBox).toHaveClass(/p-checkbox-box/);
        const filter = page.locator(".p-multiselect-filter");
        await expect(filter).toBeVisible();
        await expect(filter).toBeEnabled();
        await expect(filter).not.toBeChecked();
        await expect(filter).toHaveClass(/p-multiselect-filter/);
        await expect(filter).toHaveClass(/p-inputtext/);
        await expect(filter).toHaveAttribute("autocomplete", "off");
        const emptyMessage = page.locator(".p-multiselect-empty-message");
        await expect(emptyMessage).toBeVisible();
        await emptyMessage.click();
        const lastLabelContainer = page.locator('div.p-element.p-multiselect-label-container').last();
        await lastLabelContainer.click({ force: true });
    }

    static async verifyDiscardButton(page: Page) {
        const discardButton = page.locator(".custom-danger-outline > .p-ripple");
        await expect(discardButton).toBeVisible();
        await expect(discardButton).toBeEnabled();
        await expect(discardButton).toHaveText(" Discard ");
        await expect(discardButton).toHaveClass(/p-element/);
    }

    static async verifySaveButton(page: Page) {
        const saveButton = page.locator(".custom-light-blue > .p-ripple");
        await expect(saveButton).toBeVisible();
        await expect(saveButton).toBeEnabled();
        await expect(saveButton).toHaveClass(/p-button/);
        await expect(saveButton).toHaveText(" Save ");
    }

    static async verifyDialogCloseIcon(page: Page) {
        const closeIcon = page.locator(".custom-light-blue > .p-ripple");
        await closeIcon.click();
    }

    static async TagListMainTitle(page: Page) {
        const tagListTitle = page.locator(".p-menuitem-text");
        await expect(tagListTitle).toHaveText("Tag List");
        const generalSettingsButton = page.locator(':nth-child(2) > app-layout-page.ng-star-inserted > [dir="ltr"] > app-layout-header > nav > .card > .header_bussiness > .header_content > p-menubar.p-element > .p-menubar > .p-menubar-start > .start_nav > .modules > .btn_mod_select');
        await expect(generalSettingsButton).toBeVisible();
        await expect(generalSettingsButton).toBeEnabled();
        await expect(generalSettingsButton).toHaveClass(/btn_mod_select/);
        await expect(generalSettingsButton).toHaveText(" General Settings ");
    }

    static async verifyAddNewTagButton(page: Page) {
        const addNewTagHeader = page.locator("#pn_id_17_header");
        await expect(addNewTagHeader).toBeVisible();
        await expect(addNewTagHeader).toHaveText("Add New Tag");
    }

    static async navigateToTheLastSubDomainAccounting(page: Page) {
        await clickContinueAs(page);
        await LoginPage.visit(page);
        const subDomain = page.locator('div.supdomain.paragraph_b20').last();
        await subDomain.scrollIntoViewIfNeeded();
        const domainText = await subDomain.textContent();
        const cURL = `https://${domainText}:2050/accounting/`;
        await GeneralSetting.visitTheSubDomain(page, cURL);
    }


    static async navigateToTheLastSubDomainHR(page: Page) {
        await clickContinueAs(page);
        const subDomainElements = page.locator('div.supdomain.paragraph_b20');
        await expect(subDomainElements).toBeVisible();
        const lastSubDomain = subDomainElements.last();
        await lastSubDomain.scrollIntoViewIfNeeded();
        await expect(lastSubDomain).toBeVisible();
        const domainText = await lastSubDomain.textContent();
        const cURL = `https://${domainText}:2050/hr/`;
        await GeneralSetting.visitTheSubDomain(page, cURL);
    }

    static async verifyNavigatingToGeneralSetting(page: Page) {
        const headers = [
            { selector: ".p-datatable-thead > tr.ng-star-inserted > :nth-child(1)", text: " Id " },
            { selector: ".p-datatable-thead > tr.ng-star-inserted > :nth-child(2)", text: " Code " },
            { selector: ".p-datatable-thead > tr.ng-star-inserted > :nth-child(3)", text: " Name " },
            { selector: ".p-datatable-thead > tr.ng-star-inserted > :nth-child(4)", text: " Status " },
            { selector: ".p-datatable-thead > tr.ng-star-inserted > :nth-child(5)", text: " Modules " },
            { selector: ".p-datatable-thead > tr.ng-star-inserted > :nth-child(6)", text: " Actions " },
        ];

        for (const header of headers) {
            const element = page.locator(header.selector);
            await expect(element).toHaveText(header.text);
            await element.scrollIntoViewIfNeeded();
        }
    }

    static async verifyNavigatingToHR(page: Page) {
        const headers = page.locator("thead tr th");
        await expect(headers).toBeVisible();
        await expect(headers.nth(0)).toHaveText(/name/i);
        await expect(headers.nth(1)).toHaveText(/code/i);
        await expect(headers.nth(2)).toHaveText(/attendance code/i);
        await expect(headers.nth(3)).toHaveText(/actions/i);
    }

    static async createNewSubDomain(page: Page) {
        const subDomainName = `lowerdomain${getRandomNumber(1, 1000000).toString()}`;
        const count = 6;
        await MySubscriptionsPage.clickAddDomainSpaceBtn(page);
        await AddDomainSpace.implementAddSubDomain(page, count, subDomainName);
        await AddDomainSpace.clickAddToCartButton(page);
        await page.waitForTimeout(2000);
    }

    static async createNewCompany(page: Page) {
        await LoginPage.visit(page);
        await page.waitForTimeout(1000);
        await EditCompanyScreen.clickManageCompanies(page);
        await AddCompanyDialog.clickAddCompanyButton(page);
        await page.waitForTimeout(500);
        await AddCompanyDialog.clickCancelButton(page);
        await AddCompanyDialog.clickAddCompanyButton(page);
        await AddCompanyDialog.inputAllReqData(page);
        await AddCompanyDialog.clickSaveButton(page);
        await AddCompanyDialog.treatSuccessAlert(page);
    }

    static async confirmNavigationToSubDomain(page: Page) {
        const button = page.locator(".w-75");
        await button.click();
    }

    static async selectMultipleApps(page: Page) {
        const multiSelectLabel = page.locator('div.p-element.p-multiselect-label-container').last();
        await expect(multiSelectLabel).toBeVisible();
        await multiSelectLabel.click();
        await page.locator('span:text("accounting")').click();
        await page.locator('span:text("general settings")').click();
        await page.locator('span:text("hr")').click();
        const closeButton = page.locator('button[aria-label="Close"]').last();
        await closeButton.click();
    }

    static async unSelectAnApp(page: Page) {
        const multiSelectLabel = page.locator('div.p-element.p-multiselect-label-container').last();
        await expect(multiSelectLabel).toBeVisible();
        await multiSelectLabel.click();
        await page.locator('span:text("accounting")').click();
        const closeButton = page.locator('button[aria-label="Close"]').last();
        await closeButton.click();
    }

    static async confirmSuccessAlert(page: Page) {
        const confirmButton = page.locator(".swal2-confirm");
        await confirmButton.click();
    }

    static async addAppsFromAppStore(page: Page) {
        for (let i = 0; i < 3; i++) {
            await ManageApps.clickAppStore(page);
            await page.waitForTimeout(500);
            await clickContinueAs(page);
            await page.waitForTimeout(500);
            await ManageApps.clickAddToCart(page, i);
            const dropdownLabel = page.locator(".p-dropdown-label");
            await dropdownLabel.click();
            const lastSpan = page.locator("li span").last();
            await lastSpan.scrollIntoViewIfNeeded();
            const subDomainName1 = await lastSpan.textContent();
            await lastSpan.click({ force: true });
            const subDomainName2 = await dropdownLabel.textContent();
            expect(trimText(subDomainName1!.trim())).toEqual(trimText(subDomainName2!.trim()));
            await ManageApps.clickSave(page);
            await ManageApps.confirmSuccessAlert(page);
        }
    }

    static async checkOutTheApps(page: Page) {
        await ManageApps.clickShoppingCart(page);
        await ManageApps.clickCheckOut(page);
        await ManageApps.verifySuccessCheckOut(page);
    }



    static async clickContinueAs(page: Page) {
        const continueButton = page.locator('button:has-text("Continue as")');
        await continueButton.waitFor();
        await continueButton.click();
    }



}
