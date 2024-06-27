import { getRandomNumber } from "utils/utils";

let r = Math.floor(Math.random() * 1000);

export class SubDomainData {
  static count = 5;
  static subDomainName = "lowerdomain" + getRandomNumber(1, 1000000).toString();
  static isMonthly = true;
  static todayDate = new Date().toISOString().split("T")[0];
  static subDomainGridSelector = "div.card-container.grid";
  static subDomainCardSelector = "div.card.col-12.md:col-5";
}