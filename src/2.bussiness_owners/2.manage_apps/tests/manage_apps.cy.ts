
import test, { expect } from 'playwright/test';
import { trimText } from 'utils/utils';
import { SubDomainData } from '../../data/sub_domain_data';
import { ManageApps } from '../pages/manage_apps';
import { LoginPage } from '1.authentication/2.login/pages/loginPage';
import { MySubscriptionsPage } from '2.bussiness_owners/1.my-subscriptions/1.my_subscriptions_page/pages/my-subscriptions_page';
import { AddDomainSpace } from '2.bussiness_owners/1.my-subscriptions/2.add_domain_space/pages/add_domain_space';
let appIndex = 0;

test.describe('Manage Apps', () => {
    test.beforeEach(async ({ page }) => {
        await LoginPage.visit(page);
        await page.reload();
    });

    test('000.Create New Subdomain', async ({ page }) => {
        await MySubscriptionsPage.clickAddDomainSpaceBtn(page);
        // implement Add SubDomain and Monthly
        await AddDomainSpace.implementAddSubDomain(page, SubDomainData.count, SubDomainData.subDomainName);
        await AddDomainSpace.clickAddToCartButton(page);
        await page.waitForTimeout(12000);
        await AddDomainSpace.confirmTheSuccessPopUp(page);
        await AddDomainSpace.verifyDialogDisappears(page);
        // Verify That The Saved Data is Stored and Displayed Successfully
        await AddDomainSpace.validateNewCardIsAddedOnTheGrid(page, SubDomainData.subDomainName, SubDomainData.count, SubDomainData.isMonthly);
    });

    test("0.Verify that the Cart List Screen has Text button 'Start Shopping' When there are not any items", async ({ page }) => {
        await ManageApps.clickShoppingCart(page);
        await ManageApps.verifyDisplayingStartShoppingText(page);
        await ManageApps.verifyDisplayingRouterlinkAppStore(page);
        await ManageApps.verifyAppCountIsZero(page);
    });

    test('1.Verify that the users can switch from Vertical to Horizontal List view and Vice versa', async ({ page }) => {
        await ManageApps.clickAppStore(page);
        await expect(page.locator('div[class="card card_list"]')).not.toBeVisible();
        await page.locator('.slider').click();
        await expect(page.locator('div[class="card card_list"]')).toBeVisible();
    });

    test('2.Verify that All the Subdomains names are displayed on Add to Cart DropDown', async ({ page }) => {
        const subDomainElements = page.locator('div[class="supdomain paragraph_b20"]');
        await expect(subDomainElements).toBeVisible();
        const length = await subDomainElements.count();
        let allDomains = '';
        for (let c = 0; c < length; c++) {
            const txt = await subDomainElements.nth(c).innerText();
            allDomains = allDomains + '---' + txt.split('.')[0];
        }
        await ManageApps.clickAppStore(page);
        await ManageApps.clickAddToCart(page, appIndex);
        await ManageApps.clickSubDomainsDropDown(page);
        const allDomainsList = allDomains.split('---');
        for (const domain of allDomainsList) {
            await expect(page.locator(`li:has-text("${domain}")`)).toBeVisible();
        }
    });

    test('3.Verify that All Components are Displayed in Manage Apps Screen', async ({ page }) => {
        await ManageApps.clickAppStore(page);
        // Header Label
        await expect(page.locator('.p-menuitem-text')).toHaveText('App Store');
        // HeaderAppCountLabel
        await expect(page.locator('.count_of_apps')).toHaveText(' 3 App in Store ');
        // sliderisVisible
        const slider = page.locator('.slider');
        await expect(slider).toBeVisible();
        await expect(slider).toHaveClass('slider');

        // Verify Each Card Components
        const cardElements = page.locator('div[class="card"]');
        const len = await cardElements.count();
        for (let i = 0; i < len - 1; i++) {
            await ManageApps.verifyCardTitle(page, i);
            await ManageApps.verifyCardRenew(page, i);
            await ManageApps.verifyCardDesc(page, i);
            await ManageApps.verifyCardAddToCart(page, i);
        }
    });

    test('4.Verify that the user can add a new App to the Checkout List', async ({ page }) => {
        await ManageApps.clickCheckOutIcon(page);
        const dataTable = page.locator('div[class="data_table"]');
        let initAppsCount = 0;
        if (await dataTable.locator('div[class="data_body"]').isVisible()) {
            initAppsCount = await page.locator('div[class="title"]').count();
        }
        await ManageApps.clickAppStore(page);
        await ManageApps.clickAddToCart(page, appIndex);
        await page.locator('.p-dropdown-label').click();
        const subDomainName1 = await page.locator('li span').last().innerText();
        await page.locator('li span').last().click({ force: true });
        const subDomainName2 = await page.locator('.p-dropdown-label').innerText();
        expect(trimText(subDomainName1.trim())).toBe(trimText(subDomainName2.trim()));
        await ManageApps.clickSave(page);
        await ManageApps.verifySuccessAlertComponent(page);
        await ManageApps.confirmSuccessAlert(page);
        await ManageApps.clickShoppingCart(page);
        await page.reload();
        const finalAppsCount = await page.locator('div[class="title"]').count();
        expect(finalAppsCount).toBe(initAppsCount + 2);
    });

    test('5.verify that the user cannot buy an app for the same Subdomain multiple times', async ({ page }) => {
        await ManageApps.clickAppStore(page);
        await ManageApps.clickAddToCart(page, appIndex);
        await ManageApps.clickSubDomainsDropDown(page);
        const subDomainName1 = await page.locator('li span').last().innerText();
        await page.locator('li span').last().click({ force: true });
        const subDomainName2 = await page.locator('span[role="combobox"]').innerText();
        expect(trimText(subDomainName1.trim())).toBe(trimText(subDomainName2.trim()));
        await ManageApps.clickSave(page);
        await ManageApps.confirmOperationFailedDuplicatedAppsOnASubDomain(page);
    });

    test('6.Verify That the user can delete an app from Checkout list', async ({ page }) => {
        await page.waitForTimeout(500);
        await ManageApps.clickLastSubDomainManageApp(page);

        const domainAppCountsInit = await page.locator('div[class="col-12 md:col-12"] div.card.ng-star-inserted').count();
        await ManageApps.clickShoppingCart(page);
        const initCount = await page.locator('button.pi.pi-trash.delet').count();
        await ManageApps.deleteFromCheckOutList(page);
        await ManageApps.verifySuccessDeletePopUp(page);
        await ManageApps.confirmDeleteButton(page);
        await page.locator('button.swal2-confirm.swal2-styled').click();
        const finalCount = await page.locator('button.pi.pi-trash.delet').count();
        expect(finalCount).toBe(initCount - 1);
        // Verify that the canceled App in the checkout screen does not be saved in the Subdomain's App Management Screen
        await ManageApps.navigateToMySubscriptions(page);
        await page.waitForTimeout(500);
        await ManageApps.clickLastSubDomainManageApp(page);
        const domainAppCountsFinal = await page.locator('div[class="col-12 md:col-12"] div.card.ng-star-inserted').count();
        expect(domainAppCountsFinal).toBe(domainAppCountsInit);
    });

    test('7.Verify that the user can re-add to Cart a canceled App in the checkout screen', async ({ page }) => {
        await ManageApps.clickAppStore(page);
        await ManageApps.clickAddToCart(page, appIndex);
        await page.locator('.p-dropdown-label').click();
        const subDomainName1 = await page.locator('li span').last().innerText();
        await page.locator('li span').last().click({ force: true });
        const subDomainName2 = await page.locator('.p-dropdown-label').innerText();
        expect(trimText(subDomainName1.trim())).toBe(trimText(subDomainName2.trim()));
        await ManageApps.clickSave(page);
        await ManageApps.verifySuccessAlertComponent(page);
        await ManageApps.confirmSuccessAlert(page);
    });

    test('9.Verify that the Checklist Screen has all components', async ({ page }) => {
        await ManageApps.clickCheckOutIcon(page);
        await expect(page.locator('.p-menuitem-text')).toHaveText('Cart List');

        await expect(page.locator('.cart_header > .title')).toHaveText('Shopping Cart');
        await expect(page.locator('.body_b16')).toHaveText(' Enter an item number and press Enter to load the product inormation and variants . Tab to select variants and quantity . press on the quantity arrows to add the product to the list ');
        await expect(page.locator('.data_head > .grid > .col-4')).toHaveText('Product');
        await expect(page.locator('.data_head > .grid > :nth-child(2)')).toHaveText('Subdomain');
        await expect(page.locator('.data_head > .grid > :nth-child(3)')).toHaveText('Price');
        await expect(page.locator('.data_head > .grid > :nth-child(4)')).toHaveText('Total');

        await expect(page.locator('.text > :nth-child(1)')).toHaveText('Shopping Cart');
        await expect(page.locator('.text > :nth-child(2)')).toHaveText('Details');

        var titleEl =page.locator('.total_items > .title');
        await expect(titleEl).toBeVisible();
        await expect(titleEl).toContainText(/items/i);

        var checkOutEl = page.locator('.Check_out');
        await expect(checkOutEl).toBeVisible();
        await expect(checkOutEl).toBeEnabled();
        await expect(checkOutEl).toHaveText(' Check out ');

        var cancelEl = page.locator('.Cancel');
        await expect(cancelEl).toBeVisible();
        await expect(cancelEl).toBeEnabled();
        await expect(cancelEl).toHaveText('Cancel');
    });

    test('10.Verify That the Checkout Process is Finished Successfully', async ({ page }) => {
        await page.waitForTimeout(500);
        await ManageApps.clickLastSubDomainManageApp(page);
        await ManageApps.clickShoppingCart(page);
        await ManageApps.clickCheckOut(page);
        await ManageApps.verifySuccessCheckOut(page);
    });

    test('11.Verify that the Subdomain\'s App Management Screen has all Components', async ({ page }) => {
        await page.waitForTimeout(1000);
        await ManageApps.clickLastSubDomainManageApp(page);
        await expect(page.locator('.p-menuitem-text')).toHaveText('Manage Apps');
        var countOfAppsEl = page.locator('.count_of_apps');
        await expect(countOfAppsEl).toContainText(/app in store/i);
        await expect(countOfAppsEl).toBeVisible();
        await expect(page.locator('.slider')).toHaveClass('slider');
    });

    test('12.Verify that the user can shift between Horizontal to vertical Listview Mode in the Subdomain\'s App Management Screen', async ({ page }) => {
        await page.waitForTimeout(1000);
        await ManageApps.clickLastSubDomainManageApp(page);
        const cardElements = page.locator('div[class="col-12 md:col-12"] div.card.ng-star-inserted');
        if (await cardElements.count() > 0) {
            await expect(page.locator('div[class="card card_list"]')).not.toBeVisible();
            await page.locator('.slider').click();
            await expect(page.locator('div[class="card card_list"]')).toBeVisible();
        }
    });
});
