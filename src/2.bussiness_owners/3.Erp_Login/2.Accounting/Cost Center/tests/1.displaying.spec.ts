import test, { describe, it } from 'node:test';
import { chromium, Browser, Page, Locator } from 'playwright';
import { CostCenterPage } from '../pages/cost_center';
import { clickContinueAs } from 'utils/playwrightUtils';
import { expect } from 'playwright/test';

test.describe('Displaying Cost Center', () => {
    let browser: Browser;
    let page: Page;

    test.before(async () => {
        browser = await chromium.launch();
        page = await browser.newPage();
        await page.goto('https://ggggggg.microtecdev.com:2050/accounting/account/cost-center');
    });

    test.after(async () => {
        await browser.close();
    });

    test.beforeEach(async () => {
        await page.waitForTimeout(2000);
        await clickContinueAs; // Implement your clickContinueAs function in Playwright
    });

    test('1. Verify all components are visible in Cost Center Screen', async () => {
        await CostCenterPage.clickSideBarIcon(page);
        await CostCenterPage.clickSideMasterData(page);
        await CostCenterPage.clickSideCostCenter(page);
        await CostCenterPage.verifyMenuHeaders(page);
        await CostCenterPage.verifyListModeIsNotExist(page);
        await CostCenterPage.verifyPiBarsButton(page);
        await CostCenterPage.verifySiteMapButton(page);
        await CostCenterPage.verifyTreeAddButton(page);
        await CostCenterPage.verifyTreeFilter(page);
        await CostCenterPage.verifySideBarButton(page);
    });

    test('2. Verify that User Can Shift between Tree to List Mode', async () => {
        await CostCenterPage.clickSideBarIcon(page);
        await CostCenterPage.clickSideMasterData(page);
        await CostCenterPage.clickSideCostCenter(page);

        await page.waitForSelector('.active > .pi');
        await expect(page.locator('.active > .pi')).toBeVisible();

        await expect(page.locator('table')).not.toBeVisible();

        await page.click('i.pi.pi-bars');
        await expect(page.locator('table')).toBeVisible();

        await page.click('i.pi.pi-sitemap');
        await expect(page.locator('table')).not.toBeVisible();
    });

    test('3. Verify Empty Data Cost Center', async () => {
        await page.goto('https://lowerdomain717976.microtecdev.com:2050/accounting/account/cost-center');
        await page.waitForTimeout(2000);
        await clickContinueAs; // Implement your clickContinueAs function in Playwright

        await CostCenterPage.clickSideBarIcon(page);
        await CostCenterPage.clickSideMasterData(page);
        await CostCenterPage.clickSideCostCenter(page);

        await expect(page.locator('.p-tree')).toBeVisible();
        await expect(page.locator('.p-tree')).toHaveClass('p-tree');
        await expect(page.locator('.p-tree')).toHaveText(' No results found ');
    });
});


