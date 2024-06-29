import { chromium, Browser, Page } from 'playwright';
import { CostCenterPage } from '../pages/cost_center'; // Adjust import path as per your project structure
import { beforeEach } from 'node:test';
import test, { expect } from 'playwright/test';
import { clickContinueAs, getCountOfDetailAccount, getCountOfParentAccount, getLastItemInDropDownList } from 'utils/playwrightUtils';
import { generateRandomString, trimText } from 'utils/utils';

let costCenterName = "CC " + generateRandomString(5);

test.describe('Adding Cost Center', () => {
    let browser: Browser;
    let page: Page;

    test.beforeAll(async () => {
        browser = await chromium.launch();
        page = await browser.newPage();
        await page.goto('https://ggggggg.microtecdev.com:2050/accounting/');
    });

    test.afterAll(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        await page.waitForTimeout(2000);
        await clickContinueAs(page); // Implement your clickContinueAs function in Playwright
    });

    test('1. Verify that all Components are visible in Add Cost Center Screen', async () => {
        await CostCenterPage.clickSideBarIcon(page);
        await CostCenterPage.clickSideMasterData(page);
        await CostCenterPage.clickSideCostCenter(page);
        await CostCenterPage.clickTreeAddButton(page);
        await CostCenterPage.verifyAddPanalLabels(page);
        await CostCenterPage.verifyIsDetailCheckBox(page);
        await CostCenterPage.verifySaveButton(page);
        await CostCenterPage.verifyCostCenterCode(page);
        await CostCenterPage.verifyCostCenterName(page);
        await CostCenterPage.verifyParentCodeDropDownNotEmpty(page);
    });

    test('Validate The Cost Center Name Required Message', async () => {
        await CostCenterPage.clickSideBarIcon(page);
        await CostCenterPage.clickSideMasterData(page);
        await CostCenterPage.clickSideCostCenter(page);
        await CostCenterPage.clickTreeAddButton(page);
        await CostCenterPage.clickSaveButton(page);

        await page.waitForSelector('span:contains("required")');
        await expect(page.locator('span:contains("required")')).toBeVisible();

        await CostCenterPage.inputCostCenterName(page, costCenterName);
        await expect(page.locator('span:contains("required")')).not.toBeVisible();

        await CostCenterPage.clickSaveButton(page);
        await CostCenterPage.verifyDialogDisappears(page);
        await CostCenterPage.verifySuccessMessagePopUp(page);
    });

    test('Verify Adding Parent Cost Centre On The Tree', async () => {
        await CostCenterPage.clickSideBarIcon(page);
        await CostCenterPage.clickSideMasterData(page);
        await CostCenterPage.clickSideCostCenter(page);
        await page.waitForTimeout(1500);

        const folderLen1 = await getCountOfParentAccount(page);
        const expectedLength1 = parseInt(trimText(folderLen1.toString().trim())) + 1;

        await CostCenterPage.clickTreeAddButton(page);
        await CostCenterPage.inputCostCenterName(page, costCenterName);
        await CostCenterPage.clickSaveButton(page);
        await CostCenterPage.verifyDialogDisappears(page);
        await CostCenterPage.verifySuccessMessagePopUp(page);

        await page.reload();
        await page.waitForTimeout(1500);
        await clickContinueAs(page);

        const folderLen2 = await getCountOfParentAccount(page);
        expect(folderLen2).toBe(expectedLength1);

        await CostCenterPage.verifyNewParentCostCenter(page, costCenterName);
    });

    test('Verify Adding Detail Cost Centre On The Tree Without Assigned Parent Account', async () => {
        await CostCenterPage.clickSideBarIcon(page);
        await CostCenterPage.clickSideMasterData(page);
        await CostCenterPage.clickSideCostCenter(page);
        await page.waitForTimeout(1500);

        const fileLen1 = await getCountOfDetailAccount(page);
        const expectedLength1 = parseInt(trimText(fileLen1.toString().trim())) + 1;

        await CostCenterPage.clickTreeAddButton(page);
        await CostCenterPage.inputCostCenterName(page, costCenterName);
        await CostCenterPage.clickIsDetailCheckBox(page);
        await CostCenterPage.clickSaveButton(page);
        await CostCenterPage.verifyDialogDisappears(page);
        await CostCenterPage.verifySuccessMessagePopUp(page);

        await page.reload();
        await page.waitForTimeout(1500);
        await clickContinueAs(page);

        await CostCenterPage.verifyNewDetailCostCenterWithoutParentAccount(page, costCenterName);

        const fileLen2 = await getCountOfDetailAccount(page);
        expect(fileLen2).toBe(expectedLength1);
    });

    test('Verify Adding Detail Cost Centre On The Tree with Selected Parent Code', async () => {
        await CostCenterPage.clickSideBarIcon(page);
        await CostCenterPage.clickSideMasterData(page);
        await CostCenterPage.clickSideCostCenter(page);
        await page.waitForTimeout(1500);
        await CostCenterPage.clickAllTreeButtonNodes(page);

        const fileLen1 = await getCountOfDetailAccount(page);
        const expectedLength1 = parseInt(trimText(fileLen1.toString().trim())) + 1;

        await CostCenterPage.clickTreeAddButton(page);
        await CostCenterPage.inputCostCenterName(page, costCenterName);
        const parentCs = await getLastItemInDropDownList(page);
        await CostCenterPage.selectParentAccountCode(page);
        await CostCenterPage.clickIsDetailCheckBox(page);
        await CostCenterPage.clickSaveButton(page);
        await CostCenterPage.verifyDialogDisappears(page);
        await CostCenterPage.verifySuccessMessagePopUp(page);

        await page.reload();
        await page.waitForTimeout(1500);
        await clickContinueAs(page);
        await CostCenterPage.clickAllTreeButtonNodes(page);

        const parentCsValue = trimText(parentCs.toString().trim());
        await CostCenterPage.verifyDetailCSUnderParentCs(page, parentCsValue, costCenterName);

        const fileLen2 = await getCountOfDetailAccount(page);
        expect(fileLen2).toBe(expectedLength1);
    });

    test("AAAA", async () => {
        await page.waitForTimeout(2000);
        await clickContinueAs(page); // Implement your clickContinueAs function in Playwright

        await CostCenterPage.clickSideBarIcon(page);
        await CostCenterPage.clickSideMasterData(page);
        await CostCenterPage.clickSideCostCenter(page);
        await page.waitForTimeout(1500);
    });
});
