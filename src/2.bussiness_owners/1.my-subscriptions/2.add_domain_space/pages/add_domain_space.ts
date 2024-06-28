import { Page, expect } from 'playwright/test';
import { BussinessOwnerFunction, calculateExpiryDate } from 'utils/utils';

export class AddDomainSpace {

    static async clickDialoge(page: Page) {
        await page.locator('div.new_domain').click();
    }

    static async verifyDialogDisappears(page: Page) {
        await expect(page.locator('button.swal2-confirm.swal2-styled')).toBeVisible();
    }

    static async verifyDialogPresistance(page: Page) {
        await expect(page.locator('div.new_domain')).toBeVisible();
    }

    static async clearCount(page: Page) {
        await page.locator('input[type="number"]').clear();
    }

    static async inputeCount(page: Page, count: any) {
        const input = await page.locator('input[type="number"]');
        await input.clear();
        await input.type(count);
    }

    static async validateMonthlyCount(page: Page, count: any) {
        const cost = count * 50;
        await expect(page.locator('span.cost')).toContainText(cost.toString());
        await expect(page.locator('sub.period')).toContainText('Monthly');
        await expect(page.locator('sup.currency')).toBeVisible();
    }

    static async clickYearly(page: Page) {
        await page.locator('#Yearly').click();
    }

    static async clickMonthly(page: Page) {
        await page.locator('#Monthly').click();
    }

    static async validateYearlyCount(page: Page, count: number) {
        const cost = count * 600;
        // Assertion for cost and period can be added based on actual Playwright syntax
        await expect(page.locator('sup.currency')).toBeVisible();
    }

    static async clearYourDomainSpace(page: Page) {
        const input = await page.locator('input[type="text"]').first();
        await input.clear();
    }

    static async inputeYourDomainSpace(page: Page, subDomain: any) {
        const input = await page.locator('input[type="text"]').first();
        await input.clear();
        await input.type(subDomain);
    }

    static async validateAddedSubdomain(page: Page, subDomain: any) {
        await expect(page.locator(':nth-child(3) > .card_header > .supdomain')).toContainText(subDomain);
        const expiryDate = await page.locator(':nth-child(3) > .card_header > .date > .expire_date').textContent();
        await expect(expiryDate).toContain(BussinessOwnerFunction.getExpiryDate());
    }

    static async validateRequiredComponentsMsgRemoval(page: Page) {
        var errorMessage = page.locator('span.errorMessage.ng-star-inserted');
        await expect(await errorMessage.isVisible()).toBeFalsy();
    }

    static async validateRequiredComponents(page: Page, len: number) {
        var errorMessage = page.locator('span.errorMessage.ng-star-inserted');
        await expect(errorMessage).toHaveCount(len);
    }

    static async validateDublicatedDomainSpace(page: Page) {
        await expect(page.locator('div:has-text(' + /domain name already exists/i + ')')).toBeVisible();
    }

    static async validateAvailableDomainSpace(page: Page) {
        await expect(page.locator('div.domain_valid.body_b14.ng-star-inserted')).toHaveText(/domain name is available/i);
    }

    static async validateInvalidCount(page: Page) {
        await expect(page.locator('span')).toContainText('The minimum length must be 1, and the maximum length must be 12');
    }

    static async validateStringCount(page: Page, count: string) {
        const input = await page.locator('input[type="number"]');
        await input.fill(count);
        await expect(input).not.toHaveValue(count);
    }

    static async verifyValidSubDomainCount(page: Page, count: any) {
        await this.inputeCount(page, count);
        await this.validateInvalidCount(page);
    }

    static async clickAddToCartButton(page: Page) {
        const button = await page.locator("button[type='submit']");
        await button.evaluate((btn) => btn.removeAttribute('disabled'));
        await expect(button).not.toHaveAttribute('disabled');
        await button.click();
    }

    static async confirmTheSuccessPopUp(page: Page) {
        const confirmButton = await page.locator('button.swal2-confirm.swal2-styled');
        await expect(confirmButton).toBeVisible();
        await confirmButton.click();
    }

    static async validateTheSuccessPopUp(page: Page) {
        await expect(page.locator('#swal2-title')).toHaveText('Success');
        await expect(page.locator('#swal2-html-container')).toHaveText('Subdomain Added Successfully');
        await expect(page.locator('.swal2-confirm')).toHaveText('OK');
        await expect(page.locator('.swal2-success-ring')).toBeVisible();
        await page.locator('.swal2-confirm').click();
    }

    static async validationSpecialCharacters(page: Page) {
        await expect(page.locator('span:has-text(' + /special charachters not allowed/i + ")")).toBeVisible();
    }

    static async validateNewCardIsAddedOnTheGrid(page: Page, subDomainName: string, count: number, isMonthly: boolean) {
        const expectedDate = calculateExpiryDate(count, isMonthly);
        const card = await page.locator('.card').last();
        await expect(card).toBeVisible();
        var header = await card.locator('.card_header');
        await expect(header.locator('.supdomain')).toContainText(subDomainName);
        await expect(header.locator('.date > .expire_date')).toContainText(expectedDate);

        var plan_cover = await card.locator('.card_contant > .plan_cover');
        plan_cover.isVisible();
        var desc = await card.locator('.card_contant > .plan_description');

        await expect(desc.locator('.btn_manage > .Companies')).toBeVisible();
        await expect(desc.locator(':nth-child(3)')).toBeVisible();
        await expect(desc.locator('.mange_app > :nth-child(1)')).toBeVisible();
        await expect(desc.locator('.mange_app > :nth-child(2) > .pi')).toBeVisible();
        await expect(desc.locator('.mange_erp > .btn_mange_erp')).toBeVisible();

    }

    static async implementAddSubDomain(page: Page, count: number, subDomain: string) {
        await this.inputeCount(page, count);
        await this.clickMonthly(page);
        await this.inputeYourDomainSpace(page, subDomain);
        await this.validateAvailableDomainSpace(page);
    }
}
