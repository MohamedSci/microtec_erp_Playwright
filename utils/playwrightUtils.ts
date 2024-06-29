// 
export async function clickContinueAs(page: Page) {
    const buttonSelector = 'button.custom-btn.w-75.text-center.my-4';
    const button = await page.waitForSelector(buttonSelector);
    if (button) {
        await button.click();
    } else {
        console.log("Continue As Button is not visible");
    }
}

// export async function checkRegExInCompatibility(page: Page, fieldSelector: string, inputStr: string, regEx: RegExp) {
//   await page.locator(fieldSelector).fill(''); // Clear the field
//   await page.locator(fieldSelector).fill(inputStr);
//   const value = await page.locator(fieldSelector).evaluate((el) => el.value);
//   expect(value).not.toMatch(regEx);
// }
export async function checkRegExInCompatibility(page: Page, fieldSelector: string, inputStr: string, regEx: RegExp) {
    await page.locator(fieldSelector).fill('');
    await page.locator(fieldSelector).fill(inputStr);

    const element = await page.locator(fieldSelector);
    const value = typeof element === 'object' && 'value' in element ? element.value : '';

    expect(value).not.toMatch(regEx);
}


async function checkRegExCompatibility(page: Page, fieldSelector: string, inputStr: string, regEx: RegExp) {
    await page.locator(fieldSelector).fill('');
    await page.locator(fieldSelector).fill(inputStr);

    const element = await page.locator(fieldSelector);
    const value = typeof element === 'object' && 'value' in element ? element.value : '';

    expect(value).toMatch(regEx);
}


export async function getCountOfCardsinGrid(page: Page, parentElement: string, gridElement: string) {
    await page.waitForSelector(parentElement);
    const gridElements = await page.$$(gridElement);
    const domainAppCountsInit = gridElements.length;
    return domainAppCountsInit;
}

//  for findAppCardAndValidate with null handling
export async function findAppCardAndValidate(page: Page, subdomain: string, expectedPrice: any) {
    const gridElements = await page.$$('div.data_body div.grid');
    for (const element of gridElements) {
        const subdomainElement = await element.$('div.item.col-2');
        const expectedPriceElement = await element.$('div.item.col-2 + div');
        // Optional chaining and nullish coalescing to handle potential null values
        const subdomainText = await subdomainElement?.evaluate(el => el.textContent?.trim() ?? '');
        const expectedPriceText = await expectedPriceElement?.evaluate(el => el.textContent?.trim() ?? '');
        // Perform your validations/assertions
        if (subdomainText && expectedPriceText) {
            expect(subdomainText).toContain(subdomain);
            expect(expectedPriceText).toContain(expectedPrice);
        } else {
            console.error('Error retrieving text content for subdomain or expected price.');
        }
    }
}

export async function displayingInvalidEmailMessage(page: Page) {
    const errorMessage = await page.waitForSelector('.errorMessage');
    const textContent = await errorMessage?.innerText();
    if (textContent.trim() !== "Invalid Email Address, the pattern should be :ABC@cba.com") {
        throw new Error('Error message does not match expected text.');
    }
}

export async function displayingRequiredMessage(page: Page) {
    const spanLocator = page.locator('span');
    await expect(spanLocator).toContainText(/required/i);
}

export async function increaseScreenItemsCountToHundred(page: Page) {
    const tableRows = await page.$$('table tr');
    const rowCount = tableRows.length;
    if (rowCount > 10) {
        await page.click('.p-dropdown-trigger');
        await page.click('li:has-text("100")');
        await page.click('.p-paginator-bottom');
        const dropdownLabel = page.locator('.p-dropdown-label');
        await expect(dropdownLabel).toHaveText('100');
    }
}

export async function navigateToTheLatestScreen(page: Page) {
    const paginatorCurrent = await page.waitForSelector('.p-paginator-current');
    const pTxt = await paginatorCurrent.innerText();
    let currentPage = pTxt.split("f")[1].toString().trim();
    if (parseInt(currentPage) > 1) {
        await page.click(`[aria-label="${currentPage}"]`);
    }
}

export async function scrollToElement(page: Page, containerSelector: string, elementSelector: string) {
    const container = await page.waitForSelector(containerSelector);
    await container.scrollIntoViewIfNeeded();
    const element = await container.waitForSelector(elementSelector);
    await element.scrollIntoViewIfNeeded();
}

export async function scrollToLastElement(page: Page) {
    const tableRows = await page.$$('table tbody tr');
    await tableRows[tableRows.length - 1].scrollIntoViewIfNeeded();
}

export async function verifyCorrectColumnsHeaders(page: Page, expectedHeaders: string[]) {
    const tableHeaders = await page.$$('table th');
    for (let i = 0; i < tableHeaders.length; i++) {
        const text = await tableHeaders[i].innerText();
        expect(text.trim()).toEqual(expectedHeaders[i].trim());
    }
}

export async function getLastCellInTableValue(page: Page, col: number) {
    const tableRows = await page.$$('table tbody tr');
    if (tableRows.length > 0) {
        const lastRow = tableRows[tableRows.length - 1];
        const cells = await lastRow.$$('td');
        if (cells.length > col) {
            const text = await cells[col].innerText();
            return text.trim();
        } else {
            throw new Error(`Column ${col} not found in the last row.`);
        }
    } else {
        throw new Error('No visible rows in the table.');
    }
}

export async function getCountOfDetailAccount(page: Page): Promise<number> {
    // Wait for the tree nodes to be visible
    const treeNodeElements = await page.$$('p-treenode');
    if (treeNodeElements.length > 0) {
        // Scroll to the last 'file' span element
        await treeNodeElements[treeNodeElements.length - 1].scrollIntoViewIfNeeded();
        // Get the count of 'file' span elements
        const fileElements = await page.$$('span.file');
        return fileElements.length;
    } else {
        throw new Error('Tree nodes not visible or not found.');
    }
}

export async function getCountOfParentAccount(page: Page): Promise<number> {
    // Wait for the tree nodes to be visible
    const treeNodeElements = await page.$$('p-treenode');
    if (treeNodeElements.length > 0) {
        // Scroll to the last 'folder' span element
        await treeNodeElements[treeNodeElements.length - 1].scrollIntoViewIfNeeded();
        // Get the count of 'folder' span elements
        const folderElements = await page.$$('span.folder');
        return folderElements.length;
    } else {
        throw new Error('Tree nodes not visible or not found.');
    }
}

export async function getLastItemInDropDownList(page: Page): Promise<string> {
    // Click on the dropdown trigger icon
    await page.click('.p-dropdown-trigger-icon');
    // Wait for the listbox to appear
    const listbox = await page.waitForSelector('ul[role="listbox"]');
    // Check if dropdown items are visible
    const items = await listbox.$$('p-dropdownitem li span');
    if (items.length > 0) {
        // Scroll to the last visible item
        await items[items.length - 1].scrollIntoViewIfNeeded();
        // Get the text of the last item
        const lastParentAccountCode = await items[items.length - 1].innerText();
        return lastParentAccountCode.trim();
    } else {
        throw new Error('Dropdown items not visible or not found.');
    }
}

export async function verifyLastCellInTable(page: Page, index: number, txt: string) {
    const tableBody = await page.locator('table tbody');
    if (await tableBody.count() > 0) {
        const tableRow = tableBody.locator('tr').last();
        const cell = tableRow.locator('td').nth(index);

        if (!(await cell.isVisible())) {
            // Scroll the element into view using evaluate
            await tableRow.evaluate((el) => el.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
        }
        await expect(cell).toContainText(txt);
    } else {
        console.log('Row is not visible');
    }
}

export async function verifySliderButtonOnTheBottom(page: Page) {
    await this.page.locator(':nth-child(2) > app-layout-page.ng-star-inserted > [dir="ltr"] > .Layout > app-layout-sidebar > .sidebar > .logo-details > .pi').expect({ state: 'visible' });
    await this.page.locator(':nth-child(2) > app-layout-page.ng-star-inserted > [dir="ltr"] > .Layout > app-layout-sidebar > .sidebar > .logo-details > .pi').expect('class').toContain('pi-angle-right');
}

export async function verifyMenuItemIcon(page: Page) {
    await this.page.locator('.p-menuitem-icon').expect({ state: 'visible' });
}

export async function verifyMenuItemText(txt: string) {
    await this.page.locator('.p-menuitem-text').expect({ state: 'visible' });
    const textContent = await this.page.locator('.p-menuitem-text').textContent();
    expect(textContent).toContain(txt);
}

export async function verifyHeaderSearchTextField(page: Page) {
    await this.page.locator('.p-input-icon-left > .p-inputtext').expect({ state: 'visible' });
    await this.page.locator('.p-input-icon-left > .p-inputtext').expect({ state: 'enabled' });
}

export async function verifyAppNameInMenuItem(txt: string) {
    await this.page.locator(':nth-child(2) > app-layout-page.ng-star-inserted > [dir="ltr"] > app-layout-header > nav > .card > .header_bussiness > .header_content > p-menubar.p-element > .p-menubar > .p-menubar-start > .start_nav > .modules > .btn_mod_select').expect({ state: 'visible' });
    const textContent = await this.page.locator(':nth-child(2) > app-layout-page.ng-star-inserted > [dir="ltr"] > app-layout-header > nav > .card > .header_bussiness > .header_content > p-menubar.p-element > .p-menubar > .p-menubar-start > .start_nav > .modules > .btn_mod_select').textContent();
    expect(textContent).toContain(txt);
}

export async function verifyAddNewButtonOnTheScreenTop(page: Page) {
    await this.page.locator('.add_new').expect({ state: 'visible' });
    await this.page.locator('.add_new').expect({ state: 'enabled' });
    const buttonText = await this.page.locator('.add_new').textContent();
    expect(buttonText.toLowerCase()).toContain('add new');
}

export async function verifyExportButtonOnTheScreenTop(page: Page) {
    await this.page.locator('.export').expect({ state: 'visible' });
    await this.page.locator('.export').expect({ state: 'enabled' });
    const buttonText = await this.page.locator('.export').textContent();
    expect(buttonText.trim()).toBe('Export');
}

export async function verifyPaginatorOnScreenBottom(page: Page) {
    await this.page.locator('.p-paginator').scrollIntoView();
    await this.page.locator('.p-paginator').expect({ state: 'visible' });
    await this.page.locator('.p-highlight').expect({ state: 'visible' });
    await this.page.locator('.p-highlight').expect({ state: 'enabled' });
    await this.page.locator('.p-dropdown-trigger').expect({ state: 'visible' });
    await this.page.locator('.p-paginator-last > .p-element > .p-icon').expect({ state: 'visible' });
    await this.page.locator('.p-paginator-next > .p-element > .p-icon').expect({ state: 'visible' });
    await this.page.locator('[aria-label="1"]').expect({ state: 'visible' });
    await this.page.locator('[aria-label="1"]').expect({ state: 'enabled' });
}





export async function verifyText(page: Page, index: number, str: string) {
    const input = await page.$$('input[type="text"]');
    const value = await input[index].inputValue();
    expect(value).toEqual(str);
}

export async function inputText(page: Page, index: number, str: string) {
    const input = await page.$$('input[type="text"]');
    await input[index].fill(str);
}


export async function visibilityOfRequiredStar(page: Page, fieldSelector: string) {
    await page.waitForSelector(fieldSelector, { state: 'attached' });
    const textContent = await page.$eval(fieldSelector, (el) => el.textContent);
    if (!textContent || !textContent.includes('*')) {
        throw new Error('Required star (*) is not visible.');
    }
}


export async function logOut(page: Page) {
    const profileButton = await page.waitForSelector('button.btn_profaile', { state: 'attached' });
    const isVisible = await profileButton.isVisible();
    if (isVisible) {
        await profileButton.click();
        await page.waitForTimeout(500);
        await page.waitForSelector('button.log_link', { state: 'attached' });
        await page.click('button.log_link');
    } else {
        console.log("Element is not visible");
    }
}

export async function validateTableHeaders(page: Page, headerSelector: string, expectedHeaders: string[]) {
    const headers = await page.$$eval(headerSelector, els => els.map(el => el.textContent?.trim() || ''));
    for (let i = 0; i < headers.length; i++) {
        expect(headers[i]).toContain(expectedHeaders[i]);
    }
}

export async function validateRequiredComponents(page: Page, len: number) {
    const elements = await page.$$('span.errorMessage.ng-star-inserted');
    if (elements.length !== len) {
        throw new Error(`Expected ${len} required components, but found ${elements.length}.`);
    }
}

export async function VerifyTableVisibility(page: Page, my_table: string) {
    await page.waitForSelector(my_table, { state: 'attached' });
    const rows = await page.$$('tr');
    for (const row of rows) {
        const isVisible = await row.isVisible();
        if (!isVisible) {
            throw new Error('Table row is not visible.');
        }
        const cells = await row.$$('td');
        for (const cell of cells) {
            const cellVisible = await cell.isVisible();
            if (!cellVisible) {
                throw new Error('Table cell is not visible.');
            }
        }
    }
}


export async function setLocalStorage(page: Page, key: string, value: string) {
    await page.evaluate(([key, value]) => {
        localStorage.setItem(key, value);
    }, [key, value]);
}


// Load environment variables from .env file
import { config } from 'dotenv';
import { Page } from 'playwright';
import { expect } from 'playwright/test';
config();

// Define your variables with optional chaining and nullish coalescing
const loginUrl = process.env.loginUrl ?? ''; // Use empty string as default if loginUrl is undefined
const mail = process.env.mail ?? '';
const pass = process.env.pass ?? '';

// Define the loginSession function
export async function loginSession(page: Page) {
    // Clear cookies and local storage before each test
    await page.context().clearCookies();
    await page.goto(loginUrl);
    // Fill in the username
    await page.waitForSelector('input[id="Username"]', { state: 'visible', timeout: 15000 });
    await page.fill('input[id="Username"]', mail);
    await page.locator('input[id="Username"]').evaluate((el, value) => {
        if (el instanceof HTMLInputElement) {
            return el.value === value;
        }
        return false; // Handle other cases if needed
    }, mail);
    // Fill in the password
    await page.waitForSelector('input[id="Password"]', { state: 'visible', timeout: 15000 });
    await page.fill('input[id="Password"]', pass);
    await page.locator('input[id="Password"]').evaluate((el, value) => {
        if (el instanceof HTMLInputElement) {
            return el.value === value;
        }
        return false; // Handle other cases if needed
    }, pass);
    // Click the login button
    await page.waitForSelector('.custom-btn:has-text("Login")', { state: 'visible' });
    await page.click('.custom-btn:has-text("Login")');
    // Verify the URL contains 'bussinessowners'
    await page.waitForURL('**/bussinessowners');
}


export async function saveLocalStorageToFile(page: Page, filename: string) {
    const data = await page.evaluate(() => {
        return JSON.stringify(localStorage);
    });
    // Use a Playwright task or similar approach to write data to a file
    // Example: await page.evaluate(...) and then use Node.js fs module to write to a file
}

export async function getAllItemsCount(page: Page, gridSelector: string, itemSelector: string): Promise<number> {
    await page.waitForSelector(gridSelector, { state: 'attached' });
    await page.waitForSelector(itemSelector, { state: 'attached' });

    const items = await page.$$(itemSelector);
    await items[items.length - 1].scrollIntoViewIfNeeded();

    return items.length;
}


// Define the LoginResponse type here or import it if defined elsewhere
type LoginResponse = {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
    // Add other properties as needed
};

export async function getLoginResponse(page: Page): Promise<LoginResponse | null> {
    const storedLoginResponse = await page.evaluate(() => {
        const storedResponse = window.localStorage.getItem("loginResponse");
        return storedResponse ? JSON.parse(storedResponse) : null;
    });
    return storedLoginResponse;
}




export async function checkImageVisibilityBySrc(page: Page, imgSrc: string) {
    await page.waitForSelector(`img[src='${imgSrc}']`, { state: 'visible' });
}







