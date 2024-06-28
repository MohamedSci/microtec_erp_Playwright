import { LoginPage } from "1.authentication/2.login/pages/loginPage";
import { CompanyData } from "2.bussiness_owners/1.my-subscriptions/3.manage_companies/data/company_data";
import test from "playwright/test";
import { EditCompanyScreen } from "../pages/edit_compnay";
import { EditCompanyScreenVerify } from "../pages/verify_company";


test.describe("Edit Company Screen", () => {
    test.beforeEach(
    '1) Verify that the system navigates to Company list when user clicks "Manage Companies" in the subdomain card',
    ({page}) => {
      LoginPage.visit(page);
      EditCompanyScreen.clickManageCompanies(page);
    }
  );
  test.beforeEach(
    "2) Verify That The Edit is navigate To The Edit Company of The Company Represent on This Row.",
    ({page}) => {
      EditCompanyScreen.clickCompanyToEdit(page);
    }
  );

  test("Verify That The User Can Navigate Between All Tabs",async({page}) => {
    EditCompanyScreen.clickContactTab(page);
    EditCompanyScreen.clickLegalTab(page);
    EditCompanyScreen.clickHierarchyTab(page);
    EditCompanyScreen.clickBranchesTab(page);
    EditCompanyScreen.clickAddressTab(page);
  });
  test("Verify  Editting Address Tab", async({page})=> {
    // Click Edit Button
    EditCompanyScreen.clickEditBtn(page);
    // Click The Drop down button
    EditCompanyScreen.clickCountryDropDown(page);
    // Choose Country
    EditCompanyScreen.selectCountry(page);
    EditCompanyScreen.clickCountryDropDown(page);
    // Input City
    EditCompanyScreen.inputCity(page,CompanyData.cCity);
    // Input Region
    EditCompanyScreen.inputRegion(page,CompanyData.cRegion);
    // Input Address
    EditCompanyScreen.inputAddress(page,CompanyData.address);
    // Input Latitude
    EditCompanyScreen.inputLatitude(page,CompanyData.cLatitude);
    // Input Langitude
    EditCompanyScreen.inputLangitude(page,CompanyData.cLongitude);
    // Submit
    EditCompanyScreen.clickSaveBtn(page);
    // Check and close the Success POp up
    EditCompanyScreen.treatSuccessAlert(page);
  });

  test("verify Editting Adress Tab is Successfully Saved",async({page}) => {
    EditCompanyScreen.clickEditBtn(page);
    EditCompanyScreenVerify.verifyCity(page,CompanyData.cCity);
    // Input Region
    EditCompanyScreenVerify.verifyRegion(page,CompanyData.cRegion);
    // Input Address
    EditCompanyScreenVerify.verifyAddress(page,CompanyData.address);
    // Input Latitude
    EditCompanyScreenVerify.verifyLatitude(page,CompanyData.cLatitude);
    // Input Langitude
    EditCompanyScreenVerify.verifyLangitude(page,CompanyData.cLongitude);
  });
  test("Verify  Editting Contact Tab", async({page}) => {
    EditCompanyScreen.clickContactTab(page);
    EditCompanyScreen.clickEditBtn(page);
    EditCompanyScreen.selectCountryCode(page);
    EditCompanyScreen.inputTelephon(page,CompanyData.cTelephone, 0);
    EditCompanyScreen.inputCompnayName(page,CompanyData.cName);

    EditCompanyScreen.inputCompnayEmail(page,CompanyData.cMail);
    EditCompanyScreen.inputCompanyAddress(page,CompanyData.cAddress);
    EditCompanyScreen.inputContactPersonal(page,CompanyData.cPerson);
    EditCompanyScreen.inputContactPersonalEmail(page,CompanyData.cPersonMail);
    EditCompanyScreen.selectSecCountryCode(page);
    EditCompanyScreen.inputTelephon(page,CompanyData.cTelephone, 1);
    EditCompanyScreen.inputContactPersonalPosition(
      page,CompanyData.cContactPersonPosition
    );
    EditCompanyScreen.clickSaveBtn(page);
    EditCompanyScreen.treatSuccessAlert(page);
  });
  test("verify Editting Contact Tab is Successfully Saved", async({page}) => {
    EditCompanyScreen.clickContactTab(page);
    EditCompanyScreen.clickEditBtn(page);
    EditCompanyScreenVerify.verifyTelephon(page,CompanyData.cTelephone, 0);
    EditCompanyScreenVerify.verifyTelephon(page,CompanyData.cTelephone, 1);
    EditCompanyScreenVerify.verifyCompnayEmail(page,CompanyData.cMail);
    EditCompanyScreenVerify.verifyCompanyAddress(page,CompanyData.cAddress);
    EditCompanyScreenVerify.verifyPersonal(page,CompanyData.cPerson);
    EditCompanyScreenVerify.verifyContactPersonalEmail(page,CompanyData.cPersonMail);
    EditCompanyScreenVerify.verifyContactPersonalPosition(
      page,CompanyData.cContactPersonPosition
    );
  });

  test("Verify  Editting Legal Tab", async({page}) => {
    EditCompanyScreen.clickLegalTab(page);
    EditCompanyScreen.clickEditBtn(page);
    EditCompanyScreen.inputCompanyNameE(page,CompanyData.cName);
    EditCompanyScreen.inputCompanyEmail(page,CompanyData.cMail);
    EditCompanyScreen.inputOrganizationUnit(page,CompanyData.OrganizationUnit);
    EditCompanyScreen.inputOrganization(page,CompanyData.Organization);
    EditCompanyScreen.inputTaxID(page,CompanyData.TaxID);
    EditCompanyScreen.inputCommercialID(page,CompanyData.CommercialID);
    EditCompanyScreen.inputRegisteredAddress(page,CompanyData.RegisteredAddress);
    EditCompanyScreen.inputBusinessCategory(page,CompanyData.BusinessCategory);
    EditCompanyScreen.inputStreetName(page,CompanyData.StreetName);
    EditCompanyScreen.inputCitySubdivisionName(page,CompanyData.CitySubdivisionName);
    EditCompanyScreen.inputCompanyAddCityName(page,CompanyData.CompanyAddCityName);
    EditCompanyScreen.inputPostalZone(page,CompanyData.PostalZone);
    EditCompanyScreen.inputCountrySubentity(page,CompanyData.CountrySubentity);
    EditCompanyScreen.inputBuildingNumber(page,CompanyData.BuildingNumber);
    EditCompanyScreen.inputAdditionalStreetName(
      page,CompanyData.AdditionalStreetName
    );
    EditCompanyScreen.inputRegistrationName(page,CompanyData.RegistrationName);
    EditCompanyScreen.clickSaveBtn(page);
    EditCompanyScreen.treatSuccessAlert(page);
  });
  test("verify Editting Legal Tab is Successfully Saved", async({page}) => {
    EditCompanyScreen.clickLegalTab(page);
    EditCompanyScreen.clickEditBtn(page);
    EditCompanyScreenVerify.verifyCompanyNameE(page,CompanyData.cName);
    EditCompanyScreenVerify.verifyCompanyEmail(page,CompanyData.cMail);
    EditCompanyScreenVerify.verifyOrganizationUnit(
      page,CompanyData.OrganizationUnit
    );
    EditCompanyScreenVerify.verifyOrganization(page,CompanyData.Organization);
    EditCompanyScreenVerify.verifyTaxID(page,CompanyData.TaxID);
    EditCompanyScreenVerify.verifyCommercialID(page,CompanyData.CommercialID);
    EditCompanyScreenVerify.verifyRegisteredAddress(
      page,CompanyData.RegisteredAddress
    );
    EditCompanyScreenVerify.verifyBusinessCategory(
      page,CompanyData.BusinessCategory
    );
    EditCompanyScreenVerify.verifyStreetName(page,CompanyData.StreetName);
    EditCompanyScreenVerify.verifyCitySubdivisionName(
      page,CompanyData.CitySubdivisionName
    );
    EditCompanyScreenVerify.verifyCompanyAddCityName(
      page,CompanyData.CompanyAddCityName
    );
    EditCompanyScreenVerify.verifyPostalZone(page,CompanyData.PostalZone);
    EditCompanyScreenVerify.verifyCountrySubentity(
      page,CompanyData.CountrySubentity
    );
    EditCompanyScreenVerify.verifyBuildingNumber(page,CompanyData.BuildingNumber);
    EditCompanyScreenVerify.verifyAdditionalStreetName(
      page,CompanyData.AdditionalStreetName
    );
    EditCompanyScreenVerify.verifyRegistrationName(
      page,CompanyData.RegistrationName
    );
  });

  test("Verify  Editting Hierarchy Tab", async({page}) => {
    EditCompanyScreen.clickHierarchyTab(page);
    EditCompanyScreen.validateCompanyType(page,"Holding");
  });

  test("Verify  Editting Branches Tab", async({page}) => {
    EditCompanyScreen.clickBranchesTab(page);
    EditCompanyScreen.validateBranchesTab(page);
  });
});
