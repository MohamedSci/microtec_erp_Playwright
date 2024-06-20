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

// 
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

export async function verifyALastCellInTable(page: Page, col: number, txt: string) {
    const tableRows = await page.$$('table tbody tr');
    const lastRow = tableRows[tableRows.length - 1];
    const cells = await lastRow.$$('td');
    const cellText = await cells[col].innerText();
    expect(cellText.trim()).toContain(txt);
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


export async function checkRegExCompatibility(page: Page, fieldSelector: string, inputStr: string, regEx: RegExp) {
    await page.fill(fieldSelector, inputStr);
    const val = await page.$eval(fieldSelector, (el) => {
        const inputElement = el as HTMLInputElement;
        return inputElement.value;
    });
    expect(val).toMatch(regEx);
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
export async function getAllItemsCount(page: Page, gridSelector: string, itemSelector: string) {
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
// export {checkRegExCompatibility}
// export {
//     clickContinueAs, getCountOfCardsinGrid, findAppCardAndValidate, displayingInvalidEmailMessage
//     , displayingRequiredMessage, increaseScreenItemsCountToHundred, navigateToTheLatestScreen,
//     scrollToElement, scrollToLastElement, verifyCorrectColumnsHeaders, getLastCellInTableValue,
//     verifyALastCellInTable, verifyText, inputText, visibilityOfRequiredStar,
//     logOut, validateTableHeaders, validateRequiredComponents, VerifyTableVisibility, setLocalStorage,
//     loginSession, saveLocalStorageToFile, getAllItemsCount, getLoginResponse, checkImageVisibilityBySrc
// };






