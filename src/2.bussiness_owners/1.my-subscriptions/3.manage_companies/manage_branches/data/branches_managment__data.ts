import { generateRandomString, generateRandomEmail, getRandomNumber, generateRandomMobileNumber } from "utils/utils";

export class BranchesManagmentData {
  static branchName = "branch " + generateRandomString(5);
  static branchRegion = "region " + generateRandomString(8);
  static branchCity = "city " + generateRandomString(12);
  static branchMail = generateRandomEmail();
  static branchCountry = "United Arab Emirates";
  static branchCountryCode = "971";
  static branchAddress = "address" + getRandomNumber(1, 1000);
  static mobileNumber = "010"+generateRandomMobileNumber();

  static labelsList: string[] = [
    "Branch Name",
    "Country",
    "Branch Region",
    "Branch City",
    "Branch Email",
    "Branch Address",
    "Mobile Number Code",
    "Mobile Number",
  ];

  static tableHeaders: string[] = [
    "Code",
    "Branch Name",
    "Branch Region",
    "Branch City",
    "Branch Address",
    "Phone",
    "Branch Email",
    "Status",
    "Actions",
  ];
}
