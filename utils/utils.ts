import { Page } from "playwright";

export async function clearCookies(page: Page) {
  const context = page.context();
  await context.clearCookies();
}

export async function clearLocalStorage(page: Page) {
  await page.evaluate(() => {
    window.localStorage.clear();
  });
}

export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomString(length: any) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function generateRandomEmail() {
  var email = generateRandomString(8) + "@test.com";
  return email;
}

export function generateRandomMobileNumber() {
  const prefix = '010';
  const randomNumber = Math.floor(Math.random() * 1e5).toString().padStart(5, '0');
  return prefix + randomNumber;
}

export function calculateExpiryDate(count: number, isMonthly: boolean): string {
  const today = new Date();
  let expiryDate;
  if (isMonthly) {
    expiryDate = new Date(today.setMonth(today.getMonth() + count));
  } else {
    expiryDate = new Date(today.setFullYear(today.getFullYear() + count));
  }
  expiryDate.setDate(expiryDate.getDate() - 1);
  const day = String(expiryDate.getDate()).padStart(2, "0");
  const month = String(expiryDate.getMonth() + 1).padStart(2, "0");
  const year = expiryDate.getFullYear();
  const formattedExpiryDate = `${day}/${month}/${year}`;
  return formattedExpiryDate;
}




export function cleanText(txt: string): string {
  const cleanedText = txt.replace(/\u00a0/g, ' ').trim().toString().trim().replace("&nbsp;", "");
  return cleanedText;
}

export function getNextYearSameDay(): string {
  const today = new Date();
  const nextYear = today.getFullYear() + 1;
  const nextYearDate = new Date(today.setFullYear(nextYear));

  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  return nextYearDate.toLocaleDateString('en-US', options);
}

export const trimText = (text: string) => text.replace(/\s/g, "");

export function getExpiryDate(): Date {
  // Get today's date
  const today = new Date();
  // Set the date to next year
  const nextYear = today.getFullYear() + 1;
  // Create a new Date object with the same month and day but in the next year
  const sameDateNextYear = new Date(nextYear, today.getMonth(), today.getDate());
  return sameDateNextYear;
}

export function getTodayDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}


