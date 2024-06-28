import { generateRandomString } from "utils/utils";

export class CompanyData {
  static cListGrid_selector = "table";
  static cCardItem_selector = "tr";
  static cName = generateRandomString(12);
  static cCountry = "Germany";
  static cCity = "Berlin";
  static cRegion = "Berlin Region";
  static address = "Address 12 33 45 66, Berlin";
  static cLongitude = "123456.789";
  static cLatitude = "987.651";
  static cTelephone = "1234265517";
  static cMail = "ccccc@gooo.com";
  static cAddress = "77 ddp Berlin 199877";
  static cPerson = "Ahhh Adam";
  static cPersonMail = "ppppp@gggg.com";
  static cContactPersonPosition = "Manager";
  static OrganizationUnit = "OrganizationUnit OrganizationUnit";
  static Organization = "Organization Organization";
  static TaxID = "TaxID TaxID";
  static CommercialID = "CommercialID CommercialID";
  static RegisteredAddress = "RegisteredAddress RegisteredAddress";
  static BusinessCategory = "BusinessCategory BusinessCategory";
  static StreetName = "StreetName StreetName";
  static CitySubdivisionName = "CitySubdivisionName CitySubdivisionName";
  static CompanyAddCityName = "CompanyAddCityName CompanyAddCityName";
  static PostalZone = "PostalZone PostalZone";
  static CountrySubentity = "CountrySubentity CountrySubentity";
  static BuildingNumber = "BuildingNumber BuildingNumber";
  static AdditionalStreetName = "AdditionalStreetName AdditionalStreetName";
  static RegistrationName = "RegistrationName RegistrationName";
  static branchesThSelector = 'th[role="columnheader"]';
  static codeTh = "Code";
  static BranchNameTh = "Branch Name";
  static BranchRegionTh = "Branch Region";
  static BranchCityTh = "Branch City";
  static BranchAdressTh = "Branch Address";
  static BranchPhoneTh = "Phone";
  static BranchEmailTh = "Branch Email";
  static BranchStatusRh = "Status";
  static BranchActionsTh = "Actions";
  static branchHeadersList = [
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
