import { Page } from "playwright";
import { expect } from "playwright/test";
import { getRandomNumber, getTodayDate } from "utils/utils";

const todayDate = getTodayDate();
let i = getRandomNumber(10, 1000);

export class JournalEntry {
    private page: Page;

    constructor(page: Page) {
        page = page;
    }
    static async addNewJournalEntry(page: Page) {
        await page.locator('button.add_new').click();
    }

    static async clickWalkTrough(page: Page) {
        var btnWalk = await page.locator('.btn_walk');
        expect(btnWalk).toBeVisible();
        await page.locator('.btn_walk').click();
    }

    static async inputDateAdd(page: Page) {
        let y = 2000;
        const journalDateInput = await page.locator('input[placeholder="Journal Date"]');
        await journalDateInput.clear(); // Clear the input field
        await journalDateInput.click({ clickCount: 3 }); // Click to select all text in the input field
        await journalDateInput.press('Backspace'); // Clear any existing text
        await journalDateInput.fill(`${y}-06-01`);
    }

    static async clickCostCenterImg(page) {
        await page.locator('.costCenterImg').last().scrollIntoViewIfNeeded();
        await page.locator('.costCenterImg').last().click();
    }

    static async chooseCostCenter(page) {
        await page.locator('div.p-dropdown.p-component.p-inputwrapper.p-inputwrapper-filled').click();
        await page.locator('p-dropdownitem li span').last().click();
    }

    static async addCostCenterPercentage(page) {
        await page.locator('.ng-untouched.ng-star-inserted > :nth-child(2) > .ng-untouched > .p-inputtext').clear();
        await page.locator('.ng-untouched.ng-star-inserted > :nth-child(2) > .ng-untouched > .p-inputtext').type('1');
    }

    static async clickSaveCostCenter(page) {
        await page.locator('.saveBtn > .p-ripple').click();
    }

    static async addCostCenter(page) {
        await this.clickCostCenterImg(page);
        await this.chooseCostCenter(page);
        await this.addCostCenterPercentage(page);
        await this.clickSaveCostCenter(page);
    }

    static async verifyIsRequiedMessage(page: Page, num: number) {
        const errorMessages = await page.locator('span.errorMessage.ng-star-inserted').count();
        if (num === 0) {
            expect(errorMessages).toBe(0);
        } else {
            expect(errorMessages).toBe(num);
        }
    }

    static async verifyNumberOfRowsInTable(page: Page, num: number) {
        const rows = await page.locator("tbody tr");
        if (num === 0) {
            await expect(rows).not.toHaveCount(1);
        } else {
            await expect(rows).toHaveCount(num);
        }
    }

    static async inputFirstLineData(page: Page, num: string) {
        await page.locator("[peditablecolumnfield=\"fg.controls['account']\"]").click();
        await page.locator(".p-dropdown-label").click();
        await page.locator('li span.ng-star-inserted').nth(1).click();
        await page.locator('td[peditablecolumnfield="lineDescription"]').click();
        const input = await page.locator("td p-celleditor lib-text-input input");
        await input.clear();
        await input.type(`First Line Description ${num}`);
        await page.locator('[peditablecolumnfield="debitAmount"]').click();
        const debitInput = await page.locator('td p-celleditor lib-text-input input[type="number"]');
        await debitInput.clear();
        await debitInput.type(num);
    }

    static async inputSecondLineData(page: Page, num: string) {
        await page.locator('.ng-pristine > [peditablecolumnfield="fg.controls[\'account\']"]').click();
        await page.locator('.ng-pristine.ng-star-inserted > :nth-child(3)').click();
        await page.locator('.ng-pristine > [peditablecolumnfield="fg.controls[\'account\']"]').click();
        await page.locator('.p-dropdown-trigger-icon').click();
        await page.locator('li span.ng-star-inserted').nth(1).click();
        await page.locator('.ng-invalid > [peditablecolumnfield="lineDescription"]').click();
        const input = await page.locator('p-celleditor.p-element > .ng-untouched > .p-inputtext');
        await input.clear();
        await input.type(`Second Line Description ${num}`);
        await page.locator('.ng-invalid > [peditablecolumnfield="debitAmount"]').click();
        const creditInput = await page.locator('.ng-invalid.ng-dirty > [peditablecolumnfield="creditAmount"]');
        await creditInput.clear();
        await creditInput.type(num);
    }

    static async clickCloseIcon(page) {
        await page.locator('.p-dialog-header-close-icon').click({ force: true });
    }

    static async clickDeleteLine(page) {
        const deleteIcon = await page.locator('span.pi.pi-trash.p-button-icon.ng-star-inserted').last();
        await deleteIcon.scrollIntoViewIfNeeded();
        await expect(deleteIcon).toBeVisible();
        await deleteIcon.click();
    }


    static async verifyAddTemplateOnTableBottom(page: Page) {
        const addTemplate = page.locator('.add_new > :nth-child(2)');
        await addTemplate.isVisible();
        await addTemplate.isEnabled();
        await addTemplate.textContent().then(text => {
            expect(text.trim()).toBe('Add Template');
        });
    }


    static async verifyDisAppearingWalkthroughPopUps(page: Page) {
        var guidedTourOverlay = await page.locator('div.guided-tour-spotlight-overlay');
        expect(guidedTourOverlay).toBeHidden();
    }

    static async clickNextWalkThroughStep(page: Page) {
        var nextButton = await page.locator('.next-button');
        expect(nextButton).toBeVisible();
        await page.locator('.next-button').click();
    }

    static async verifySkipButton(page: Page) {
        var skipButton = await page.locator('.skip-button');
        expect(skipButton).toBeVisible();
        expect(skipButton).toBeEnabled();
        expect(skipButton).toHaveText('  skip  ');
    }

    static async verifyTourTitle(page: Page, txt: string) {
        var tourTitle = await page.locator('.tour-title');
        expect(tourTitle).toBeVisible();
        expect(tourTitle).toHaveText(txt);
    }

    static async verifyTourContent(page: Page, txt: string) {
        var tourContent = await page.locator('.tour-content');
        expect(tourContent).toBeVisible();
        expect(tourContent).toHaveText(txt);
    }
    static async verifyNextButton(page: Page, txt: any) {
        var nextButton = await page.locator('.next-button');
        expect(nextButton).toBeVisible();
        expect(nextButton).toBeEnabled();
        expect(nextButton).toHaveText('next   2/4');
    }
    static async verifyGuidedOverlay(page: Page) {
        var guidedOverlay = await page.locator('.guided-tour-spotlight-overlay');
        expect(guidedOverlay).toBeVisible()
    }
    static async verifyTheFirstWalkThroughStep(page: Page) {
        this.verifyTourTitle(page, 'Step 1');
        this.verifyTourContent(page, 'Fill In Reference Number');
        this.verifySkipButton(page);
        this.verifyNextButton(page, 'next   1/4');
        this.verifyGuidedOverlay(page);
    }
    static async verifySecondWalkThroughStep(page: Page) {
        this.verifyTourTitle(page, 'Step 2');
        this.verifyTourContent(page, 'Select Date');
        this.verifySkipButton(page);
        this.verifyNextButton(page, 'next   2/4');
        this.verifyGuidedOverlay(page);
    }
    static async verifyThirdWalkThroughStep(page: Page) {
        this.verifyTourTitle(page, 'Step 3');
        this.verifyTourContent(page, 'Add Journal Entry Description');
        this.verifySkipButton(page);
        this.verifyNextButton(page, 'next   3/4');
        this.verifyGuidedOverlay(page);
    }

    static async verifyFourthWalkThrough(page: Page) {
        this.verifyTourTitle(page, 'Step 3');
        this.verifyTourContent(page, 'Add Journal Entry Description');
        this.verifySkipButton(page);
        this.verifyNextButton(page, /done/i);
        this.verifyGuidedOverlay(page);
    }


    static async verifyAccountingIsDisplayedOnHeader(page: Page) {
        await page.locator(':nth-child(2) > app-layout-page.ng-star-inserted > [dir="ltr"] > app-layout-header > nav > .card > .header_bussiness > .header_content > p-menubar.p-element > .p-menubar > .p-menubar-start > .start_nav > .modules > .btn_mod_select')
            .isVisible();
        await page.locator(':nth-child(2) > app-layout-page.ng-star-inserted > [dir="ltr"] > app-layout-header > nav > .card > .header_bussiness > .header_content > p-menubar.p-element > .p-menubar > .p-menubar-start > .start_nav > .modules > .btn_mod_select')
            .isEnabled();
        await page.locator(':nth-child(2) > app-layout-page.ng-star-inserted > [dir="ltr"] > app-layout-header > nav > .card > .header_bussiness > .header_content > p-menubar.p-element > .p-menubar > .p-menubar-start > .start_nav > .modules > .btn_mod_select')
            .textContent().then(text => {
                expect(text.trim()).toBe('Accounting');
            });
    }

    static async verifyMenuItemIsDisplayedOnHeader(page: Page, txt: string) {
        const menuItem = page.locator('.p-menuitem-text');
        await menuItem.isVisible();
        await menuItem.textContent().then(text => {
            expect(text.trim()).toBe(txt);
        });
    }

    static async verifySearchInputTextField(page: Page) {
        const inputField = page.locator('.p-input-icon-left > .p-inputtext');
        await inputField.isVisible();
        await inputField.isEnabled();
        await inputField.evaluate((node: HTMLInputElement) => {
            expect(node.checked).toBe(false);
        });
    }

    static async verifyAddNewButtonIsDisplayedOnHeader(page: Page) {
        const addNewButton = page.locator('.group > :nth-child(2) > :nth-child(1)');
        await addNewButton.isVisible();
        await addNewButton.isEnabled();
        await addNewButton.textContent().then(text => {
            expect(text.trim()).toBe('Add New');
        });
    }

    static async verifyExportButtonIsDisplayedOnHeader(page: Page) {
        const exportButton = page.locator('.export');
        await exportButton.isVisible();
        await exportButton.isEnabled();
        await exportButton.textContent().then(text => {
            expect(text.trim()).toBe('Export');
        });
    }

    static async verifySideSliderIsDisplayedOnTheBottom(page: Page) {
        const sideSlider = page.locator(':nth-child(2) > app-layout-page.ng-star-inserted > [dir="ltr"] > .Layout > app-layout-sidebar > .sidebar > .logo-details > .pi');
        await sideSlider.isVisible();
        await sideSlider.isEnabled();
    }

    static async verifyDiscardButtonIsDisplayedOnBottom(page: Page) {
        const discardButton = page.locator('.discard');
        await discardButton.isVisible();
        await discardButton.isEnabled();
        await discardButton.textContent().then(text => {
            expect(text.trim()).toBe('discard');
        });
    }

    static async verifySaveButtonIsDisplayedOnBottom(page: Page) {
        const saveButton = page.locator('.save');
        await saveButton.isVisible();
        await saveButton.isEnabled();
        await saveButton.textContent().then(text => {
            expect(text.trim()).toBe('Save');
        });
    }

    static async addHeaderReferenceNumber(page: Page) {
        const inputField = page.locator('input[placeholder="Reference Number"]');
        await inputField.fill('');
        await inputField.type('11111' + i);
        await inputField.click(); // Click to trigger any events associated
    }

    static async verifyThePaginatorIsDisplayedOnTheBottom(page: Page) {
        const paginator = page.locator('.p-paginator');
        await paginator.isVisible();
        await paginator.textContent().then(text => {
            expect(text.trim()).toBe('10');
        });
        const ngUntouched = page.locator('.ng-untouched');
        await ngUntouched.isVisible();
        await ngUntouched.textContent().then(text => {
            expect(text.trim()).toBe('10');
        });
    }


    static async verifyTheColumnHeadersAreDisplayed(page: Page) {
        const headers = [
            "Id", "Journal Code", "Reference", "Date", "Type",
            "Document Name", "Document Code", "Repeated",
            "Reversed", "Status", "Debit", "Credit", "Actions"
        ];

        for (let index = 0; index < headers.length; index++) {
            const header = page.locator('th').nth(index);
            await header.isVisible();
            if (index >= 7) {
                await header.scrollIntoViewIfNeeded();
            }
            await header.textContent().then(text => {
                expect(text.trim()).toBe(headers[index]);
            });
        }
    }

    static async verifyWalkThroughIsDisplayedOnHeader(page: Page) {
        const walkThroughButton = page.locator('.btn_walk');
        await walkThroughButton.isVisible();
        await walkThroughButton.isEnabled();
        await walkThroughButton.textContent().then(text => {
            expect(text.trim()).toBe('walk through');
        });
    }

    static async verifyHeaderTitle(page: Page, txt: string) {
        const headerTitle = page.locator('.title');
        await headerTitle.isVisible();
        await headerTitle.textContent().then(text => {
            expect(text.trim()).toBe(txt);
        });
    }

    static async verifyReferenceNumberTextFieldOnHeader(page: Page) {
        const referenceNumberTextField = page.locator('.step-1-element > .ng-untouched > .p-inputtext');
        await referenceNumberTextField.isVisible();
        await referenceNumberTextField.isEnabled();
        await referenceNumberTextField.evaluate((node: HTMLInputElement) => {
            expect(node.checked).toBe(false);
        });
    }


    static async verifyDatePickerTextFieldOnHeader(page: Page) {
        const datePicker = page.locator(".step-2-element > .ng-untouched > .p-inputtext");
        await expect(datePicker).toBeVisible();
        await expect(datePicker).toBeEnabled();
        await expect(datePicker).not.toBeChecked();
        await expect(datePicker).toHaveValue(todayDate);
    }

    static async verifyPeriodReadOnlyTextFieldOnHeader(page: Page) {
        const periodField = page.locator(":nth-child(3) > .ng-untouched > .p-inputtext");
        await expect(periodField).toBeVisible();
        await expect(periodField).toBeDisabled();
        await expect(periodField).not.toBeChecked();
    }

    static async verifyAttachButton(page: Page) {
        const attachButton = page.locator(".attach");
        await expect(attachButton).toBeVisible();
        await expect(attachButton).toBeEnabled();
        await expect(attachButton).toHaveText("Attach");
    }

    static async verifyDescriptionTextFieldOnHeader(page: Page) {
        const descriptionField = page.locator(".md\\:col-12 > .ng-untouched > .p-inputtext");
        await expect(descriptionField).toBeVisible();
        await expect(descriptionField).toBeEnabled();
        await expect(descriptionField).not.toBeChecked();
    }

    static async inputHeaderDescriptionData(page: Page) {
        const descriptionField = page.locator('input[placeholder="Description"]');
        await descriptionField.fill("");
        await descriptionField.type("header Description " + i);
    }

    static async verifyAddNewLineOnBottom(page: Page) {
        const addNewLineButton = page.locator(".Line");
        await expect(addNewLineButton).toBeVisible();
        await expect(addNewLineButton).toBeEnabled();
        await expect(addNewLineButton).toHaveText(" Add New Line ");
    }

    static async verifyColumnHeadersAddNewScreen(page: Page) {
        const headers = [
            "Id", "Acc. Code", "Acc. Name", "Line Description", "DB Amount",
            "CR Amount", "Currency", "Rate", "DB Amount Local", "CR Amount Local"
        ];

        for (let index = 0; index < headers.length; index++) {
            const header = page.locator('thead > .ng-star-inserted').nth(index);
            await expect(header).toBeVisible();
            await expect(header).toHaveText(headers[index]);
        }
    }

    static async addNewLine(page: Page) {
        const line = page.locator(".Line");
        await line.scrollIntoViewIfNeeded();
        await expect(line).toBeVisible();
        await line.click();
    }

    static async verifyAddingNewLineId(page: Page) {
        const newLineId = page.locator("tbody .ng-untouched > :nth-child(1)");
        await expect(newLineId).toBeVisible();
        // Ensure the text is visible
        // const text = await newLineId.textContent();
        // await expect(text).toBeVisible();
    }

    static async selectAnAccountFromDropDownList(page: Page) {
        await page.locator("[peditablecolumnfield=\"fg.controls['account']\"]").click();
        await page.locator(".p-dropdown-label").click();
        await page.locator("#pn_id_23_0").click();
    }

    static async inputLineDescription(page: Page, txt: string) {
        const lineDescriptionField = page.locator('[peditablecolumnfield="lineDescription"]');
        await lineDescriptionField.click();
        const inputField = page.locator("p-celleditor.p-element > .ng-untouched > .p-inputtext");
        await inputField.fill("");
        await inputField.type(txt);
    }

    static async inputDebitAmount(page: Page) {
        const debitAmountField = page.locator('[peditablecolumnfield="debitAmount"]');
        await debitAmountField.click();
        const inputField = page.locator("p-celleditor.p-element > .ng-untouched > .p-inputtext");
        await inputField.fill("");
        await inputField.type("11");
    }

    static async inputCreditAmount(page: Page) {
        const creditAmountField = page.locator('[peditablecolumnfield="creditAmount"]');
        await creditAmountField.click();
        const inputField = page.locator("p-celleditor.p-element > .ng-untouched > .p-inputtext");
        await inputField.fill("");
    }

    static async checkAccountReference(page: Page) {
        const accountField = page.locator("[peditablecolumnfield=\"fg.controls['account']\"] > .p-element");
        await expect(accountField).toBeVisible();
        await expect(accountField).toHaveText(" 1101001001 ");
        const referenceField = page.locator("tr.ng-untouched > :nth-child(3)");
        await expect(referenceField).toHaveText(" صندوق 1 ");
    }

    static async clickDeleteLineIcon(page: Page) {
        const deleteIcon = page.locator(".p-ripple > .pi");
        await deleteIcon.scrollIntoViewIfNeeded();
        await expect(deleteIcon).toBeVisible();
        await deleteIcon.click();
    }

    static async verifyLineIsDeletedSuccessfully(page: Page) {
        const accountField = page.locator("[peditablecolumnfield=\"fg.controls['account']\"]");
        await expect(accountField).not.toBeVisible();
    }

    static async clickAddNewTemplate(page: Page) {
        await page.locator(".add_new > :nth-child(2)").click();
        // Ensure dialog header is visible with increased timeout
        // await page.locator(".p-dialog-header").waitFor({ state: 'visible', timeout: 15000 });
    }

    static async verifyNewTemplateDialog(page: Page) {
        const dialogHeader = page.locator(".p-dialog-header");
        await expect(dialogHeader).toBeVisible();
        const dialog = page.locator('div[role="dialog"]');
        await dialog.scrollIntoViewIfNeeded();
        await page.mouse.wheel(0, -500); // Zoom out
        await expect(dialog).toBeVisible();

        const headers = [
            " Select ", " Code ", " Period Name ", " Type ",
            " Total Debit Amount ", " Total Credit Amount "
        ];

        for (let index = 0; index < headers.length; index++) {
            const header = dialog.locator("th").nth(index);
            await expect(header).toBeVisible();
            await expect(header).toHaveText(headers[index]);
        }
    }




}

