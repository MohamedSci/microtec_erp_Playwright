import { Browser, Page, chromium } from "playwright";
import { CostCenterPage } from "../pages/cost_center";
import test from "playwright/test";
import { clickContinueAs } from "utils/playwrightUtils";

test.describe("Editing Cost Center", () => {
    let browser: Browser;
    let page: Page;

    test.beforeAll(async () => {
        browser = await chromium.launch();
        page = await browser.newPage();
        await page.goto("https://ggggggg.microtecdev.com:2050/accounting/account/cost-center");
    });

    test("1.verify that all Components are visible in Edit Cost Center Screen pf Parent Account", () => {
        page.waitForTimeout(2000);
        clickContinueAs(page);
        // click Side bar Side Icon
        CostCenterPage.clickSideBarIcon(page);
        // click Master data Drop Down button
        CostCenterPage.clickSideMasterData(page);
        // click Cost Center button
        CostCenterPage.clickSideCostCenter(page);
        CostCenterPage.clickEditButtonParentAccount(page);
        CostCenterPage.verifyAddPanalLabels(page);
        CostCenterPage.verifyIsDetailCheckBox(page);
        CostCenterPage.verifySaveButton(page);
        CostCenterPage.verifyCostCenterCode(page);
        CostCenterPage.verifyCostCenterName(page);
        CostCenterPage.verifyParentCodeDropDownNotEmpty(page);
    });
    test("2.verify that all Components are visible in Edit Cost Center Screen pf Detail Account", () => {
        page.waitForTimeout(2000);
        clickContinueAs(page);
        // click Side bar Side Icon
        CostCenterPage.clickSideBarIcon(page);
        // click Master data Drop Down button
        CostCenterPage.clickSideMasterData(page);
        // click Cost Center button
        CostCenterPage.clickSideCostCenter(page);
        CostCenterPage.clickEditButtonDetailAccount(page);
        CostCenterPage.verifyAddPanalLabels(page);
        CostCenterPage.verifyIsDetailCheckBox(page);
        CostCenterPage.verifySaveButton(page);
        CostCenterPage.verifyCostCenterCode(page);
        CostCenterPage.verifyCostCenterName(page);
        CostCenterPage.verifyParentCodeDropDownNotEmpty(page);
    });
});
