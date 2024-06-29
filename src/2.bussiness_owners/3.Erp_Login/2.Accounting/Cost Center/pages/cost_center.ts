import { Page } from "playwright";
import { expect } from "playwright/test";

export class CostCenterPage {

    static async clickSideBarIcon(page: Page) {
        await page.click(
            ':nth-child(2) > app-layout-page.ng-star-inserted > [dir="ltr"] > .Layout > app-layout-sidebar > .sidebar > .logo-details > .pi'
        );
    }

    static async clickSideMasterData(page: Page) {
        const sideMasterDataSelector =
            ':nth-child(2) > app-layout-page.ng-star-inserted > [dir="ltr"] > .Layout > app-layout-sidebar > .sidebar > .nav-links > :nth-child(1) > #parent0 > .arrow';

        await page.waitForSelector(sideMasterDataSelector);
        await page.click(sideMasterDataSelector);
        await page.waitForTimeout(1000);
    }

    static async continueClickingSideMasterData(page: Page) {
        await page.waitForTimeout(1000);
        while (true) {
            const isVisible = await page.isVisible('ul[class="nav-links"] li ul[class="sub-menuu2"]');
            if (isVisible) break;
            await page.reload();
            await this.clickSideMasterData(page);
        }
    }

    static async clickAllTreeButtonNodes(page: Page) {
        const treeButtonSelector = ':nth-child(1) > .p-treenode > .p-treenode-content > .p-ripple > .p-element > .p-icon';
        await page.waitForSelector(treeButtonSelector, { state: 'visible' });
        const buttons = await page.$$(treeButtonSelector);
        for (const button of buttons) {
            await button.click();
        }
    }

    static async clickSideCostCenter(page: Page) {
        await this.continueClickingSideMasterData(page);
        const costCenterButton = page.locator(".sub-menuu2 > :nth-child(4) > .ng-star-inserted");
        await page.waitForTimeout(1000);
        await costCenterButton.click({ force: true });
        await page.waitForSelector(".p-menuitem-text", { state: 'visible' });
    }

    static async verifyTreeAddButton(page: Page) {
        const addButton = page.locator(".chart_account > .btn_tree_item");
        await expect(addButton).toBeVisible();
        await expect(addButton).toBeEnabled();
        await expect(addButton).toHaveClass(/btn_add/);
        await expect(addButton).toHaveClass(/pi-plus/);
    }

    static async clickTreeAddButton(page: Page) {
        const addButton = page.locator(".chart_account > .btn_tree_item");
        await expect(addButton).toBeVisible();
        await expect(addButton).toBeEnabled();
        await addButton.click();
    }

    static async clickEditButtonParentAccount(page: Page) {
        const editButton = page.locator('button[class="btn_tree_item btn_edit pi pi-pencil"]').last();
        await expect(editButton).not.toBeVisible();
        const treeItem = page.locator('div[class="ui-tree-node-content label_text tree-item-container"]').last();
        await treeItem.hover();

        const display = await editButton.evaluate(el => getComputedStyle(el).display);
        if (display === 'none') {
            await editButton.evaluate(el => el.style.display = 'block');
        }
        await editButton.click({ force: true });
    }

    static async clickEditButtonDetailAccount(page: Page) {
        const firstIcon = page.locator(":nth-child(1) > .p-treenode > .p-treenode-content > .p-ripple > .p-element > .p-icon").last();
        await firstIcon.click();
        await this.clickEditButtonParentAccount(page);
    }

    static async verifyAddPanalLabels(page: Page) {
        await expect(page.locator(".cost_add_page")).toBeVisible();
        await expect(page.locator(":nth-child(1) > lib-form-group > .group > .paragraph_b18")).toHaveText(" Cost Center code");
        await expect(page.locator(":nth-child(2) > lib-form-group > .group > lib-label > .form-label")).toHaveText("   Cost Center Name  *");
        await expect(page.locator(":nth-child(3) > lib-form-group > .group > lib-label > .form-label")).toHaveText("   Parent Account ");
        await expect(page.locator(":nth-child(4) > lib-form-group > .group > p.paragraph_b18")).toContainText(/is detail/i);
    }

    static async verifyIsDetailCheckBox(page: Page) {
        const checkBox = page.locator("#isDetail");
        await expect(page.locator(":nth-child(4) > lib-form-group > .group > lib-label > .form-label")).toHaveText("   yes ");
        await expect(checkBox).toBeVisible();
        await expect(checkBox).toBeEnabled();
        await expect(checkBox).not.toBeChecked();
    }

    static async verifyDialogDisappears(page: Page) {
        await expect(page.locator("#isDetail")).not.toBeVisible();
    }

    static async verifySuccessMessagePopUp(page: Page) {
        await expect(page.locator("#swal2-title")).toHaveText("Success");
        await expect(page.locator("#swal2-html-container")).toHaveText("Data Has Been Added Successfully");
        const confirmButton = page.locator(".swal2-confirm");
        await expect(confirmButton).toBeVisible();
        await expect(confirmButton).toBeEnabled();
        await expect(confirmButton).toHaveText("OK");
        await confirmButton.click();
        await expect(page.locator(".swal2-actions")).not.toBeVisible();
    }

    static async verifyDetailCSUnderParentCs(page: Page, parent: string, child: string) {
        const mainEl = page.locator('li[aria-expanded="true"]').last();
        await expect(mainEl).toBeVisible();

        const parentLocator = mainEl.locator('div[class="p-treenode-content"]').filter({ hasText: parent });
        await expect(parentLocator).toBeVisible();

        const childLocator = mainEl.locator('ul[class="p-treenode-children"]').filter({ hasText: child });
        await expect(childLocator).toBeVisible();
    }

    static async clickIsDetailCheckBox(page: Page) {
        const checkBox = page.locator("#isDetail");
        await expect(checkBox).toBeVisible();
        await checkBox.check();
    }

    static async verifySaveButton(page: Page) {
        const saveButton = page.locator(".btn");
        await expect(saveButton).toBeVisible();
        await expect(saveButton).toBeEnabled();
        await expect(saveButton).toHaveText(" save\n");
    }

    static async clickSaveButton(page: Page) {
        const saveButton = page.locator(".btn");
        await expect(saveButton).toBeVisible();
        await saveButton.click();
    }


    static async verifyCostCenterCode(page: Page) {
        const costCenterCode = page.locator(
            ':nth-child(1) > lib-form-group > .group > lib-text-input > .p-inputtext'
        );
        await expect(costCenterCode).toBeVisible();
        await expect(costCenterCode).toBeDisabled();
        await expect(costCenterCode).not.toBeChecked();
        await expect(costCenterCode).toHaveClass('reads');
    }

    static async verifyCostCenterName(page: Page) {
        const costCenterName = page.locator(
            'input[class="p-inputtext p-component p-element ng-star-inserted"]'
        );
        await expect(costCenterName).toBeVisible();
        await expect(costCenterName).toBeEnabled();
        await expect(costCenterName).not.toBeChecked();
    }

    static async inputCostCenterName(page: Page, txt: string) {
        const costCenterNameInput = page.locator(
            'input[class="p-inputtext p-component p-element ng-star-inserted"]'
        );
        await costCenterNameInput.clear();
        await costCenterNameInput.type(txt);
    }

    static async selectParentAccountCode(page: Page) {
        // Assuming cy.selectLastItemInDropDownList(page:Page) is a custom command, implement similarly
        // or use Playwright's API to interact with dropdowns.
    }

    static async verifyParentCodeDropDownNotEmpty(page: Page) {
        await page.locator('.p-dropdown-trigger-icon').click();
        await expect(page.locator('.p-dropdown-filter')).toBeVisible();
        await expect(page.locator('.p-dropdown-filter')).toBeEnabled();
        await expect(page.locator('.p-dropdown-filter')).not.toBeChecked();
        await expect(page.locator('p-dropdownitem li span')).toBeVisible();
    }

    static async verifyParentCodeDropDownEmpty(page: Page) {
        await page.locator('.p-dropdown-trigger-icon').click();
        await expect(page.locator('.p-dropdown-filter')).toBeVisible();
        await expect(page.locator('.p-dropdown-filter')).toBeEnabled();
        await expect(page.locator('.p-dropdown-filter')).not.toBeChecked();
        const elementsCount = await page.locator('p-dropdownitem li span').count();
        expect(elementsCount).toBe(0);
    }

    static async verifyTreeFilter(page: Page) {
        await expect(page.locator('.p-tree-filter')).toBeVisible();
        await expect(page.locator('.p-tree-filter')).toBeEnabled();
        await expect(page.locator('.p-tree-filter')).not.toBeChecked();
    }

    static async verifyMenuHeaders(page: Page) {
        await expect(
            page.locator(
                ':nth-child(2) > app-layout-page > [dir="ltr"] > app-layout-header > nav > .card > .header_bussiness > .header_content > p-menubar.p-element > .p-menubar > .p-menubar-start > .start_nav > .modules > .btn_mod_select > .icon'
            )
        ).toBeVisible();

        await expect(page.locator('.p-menuitem-icon')).toBeVisible();

        await expect(page.locator('.p-menuitem-text')).toBeVisible();
        await expect(page.locator('.p-menuitem-text')).toHaveText('Cost Center');

        await expect(page.locator('.actions > :nth-child(1) > .pi')).toBeVisible();
        await expect(page.locator('.active > .pi')).toBeVisible();
        await expect(page.locator('.chart_togel > img')).toBeVisible();

        await expect(page.locator('.text')).toBeVisible();
        await expect(page.locator('.text')).toHaveText('Cost center');
    }

    static async verifySideBarButton(page: Page) {
        await expect(
            page.locator(
                ':nth-child(2) > app-layout-page > [dir="ltr"] > .Layout > app-layout-sidebar > .sidebar > .logo-details > .pi'
            )
        ).toBeVisible();
        await expect(
            page.locator(
                ':nth-child(2) > app-layout-page > [dir="ltr"] > .Layout > app-layout-sidebar > .sidebar > .logo-details > .pi'
            )
        ).toBeEnabled();

        await expect(
            page.locator(
                ':nth-child(2) > app-layout-page > [dir="ltr"] > .Layout > app-layout-sidebar > .sidebar > .nav-links > :nth-child(1) > #parent0 > a > .pi'
            )
        ).toBeVisible();
        await expect(
            page.locator(
                ':nth-child(2) > app-layout-page > [dir="ltr"] > .Layout > app-layout-sidebar > .sidebar > .nav-links > :nth-child(3) > :nth-child(1) > .pi'
            )
        ).toBeVisible();
        await expect(page.locator('.actions > :nth-child(1) > .pi')).toBeVisible();
        await expect(page.locator('.active > .pi')).toBeVisible();
    }

    static async verifyListModeIsNotExist(page: Page) {
        const table = await page.locator('table').count();
        expect(table).toBe(0);
    }

    static async verifyPiBarsButton(page: Page) {
        await expect(page.locator('i[class="pi pi-bars"]')).toBeVisible();
    }

    static async verifySiteMapButton(page: Page) {
        await expect(page.locator('i[class="pi pi-sitemap"]')).toBeVisible();
    }

    static async verifyNewParentCostCenter(page: Page, txt: string) {
        const lastTreeNodeLabel = await page.locator('span.p-treenode-label').last();
        await expect(lastTreeNodeLabel).toBeVisible();

        const descriptionDiv = await lastTreeNodeLabel.locator('div.description');
        await expect(descriptionDiv.locator('span.folder')).toBeVisible();
        await descriptionDiv.scrollIntoViewIfNeeded();

        await expect(descriptionDiv.locator('span[id="label_tree"]')).toContainText(txt);

        const actionDiv = await lastTreeNodeLabel.locator('div.action');
        const actionButtons = await actionDiv.locator('button');
        await expect(actionButtons).toHaveCount(3);
        await expect(actionButtons[0]).not.toBeVisible();
        await expect(actionButtons[0]).toHaveClass('btn_tree_item btn_edit pi pi-pencil');
        await expect(actionButtons[1]).not.toBeVisible();
        await expect(actionButtons[1]).toHaveClass('btn_tree_item btn_delet pi pi-trash');
        await expect(actionButtons[2]).toBeVisible();
        await expect(actionButtons[2]).toHaveClass('btn_add btn_tree_item pi pi-plus');
    }

    static async verifyNewDetailCostCenterWithoutParentAccount(page: Page, txt: string) {
        await expect(page.locator('span[id="label_tree"]')).toContainText(txt);
        await expect(page.locator('span[id="label_tree"]')).toHaveCount(1);
    }

    static async verifyNewDetailCostCenter(page: Page, txt: string) {
        const lastTreeNodeLabel = await page.locator('span.p-treenode-label').last();
        await expect(lastTreeNodeLabel).toBeVisible();

        const descriptionDivs = await lastTreeNodeLabel.locator('div.description').all();
        for (const descriptionDiv of descriptionDivs) {
            await expect(descriptionDiv.locator('span.file.ng-star-inserted')).toBeVisible();
            await expect(descriptionDiv.locator('span[id="label_tree"]')).toContainText(txt);
        }


        const actionDivs = await lastTreeNodeLabel.locator('div.action').all();
        for (const actionDiv of actionDivs) {
            const actionButtons = await actionDiv.locator('button');
            await expect(actionButtons).toHaveCount(2);
            await expect(actionButtons[0]).toBeVisible();
            await expect(actionButtons[0]).toHaveClass('btn_tree_item btn_edit pi pi-pencil');
            await expect(actionButtons[1]).toBeVisible();
            await expect(actionButtons[1]).toHaveClass('btn_tree_item btn_delet pi pi-trash');
            await expect(actionButtons).toHaveCount(0);

        }

    }

}
