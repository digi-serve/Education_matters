const Common = require("../../../../setup/common.js");

const folderName = __dirname.match(/[^\\/]+$/);

Cypress.on("uncaught:exception", () => false);

before(() => {
   Common.ResetDB(cy);
   Common.AuthLogin(cy);
   cy.request("POST", "/test/import", {
      file: `imports/${folderName}/app_Education_Matters_20221003.json`,
   });
});

beforeEach(() => {
   Common.AuthLogin(cy);
   Common.RunSQL(cy, folderName, ["reset_tables.sql", "insert_data.sql"]);
   // Open the App
   cy.visit("/");
   cy.get('[data-cy="portal_work_menu_sidebar"]').should("exist").click();
   cy.get("[data-cy='ab7ab867-549a-498f-a1ff-a9e2f97dd525']")
      .should("exist")
      .click();
});

describe("Adding Child", () => {
   it("Can Add New Child", () => {
      cy.get(
         "[data-cy='menu-item Add Child f9c62acf-9d2f-433b-b9dd-aa3060b0eb9d 56c95826-8f2a-401a-accf-949677fda0be']"
      )
         .should("exist")
         .click();
      cy.get(
         "[data-cy='string First Name db4a4e5b-0b41-477a-a750-bacaa9309e10 36ec27e9-85d6-4e34-9d20-98c65988b0e8']"
      )
         .click()
         .type("Johnny");
      cy.get(
         "[data-cy='string Last Name 9745668a-d3f6-4c84-a282-f115499dee8b 36ec27e9-85d6-4e34-9d20-98c65988b0e8']"
      )
         .click()
         .type("walker");
      cy.get(
         "[data-cy='string Nick Name ed84ddf8-cf83-4349-a893-40753cdef614 36ec27e9-85d6-4e34-9d20-98c65988b0e8']"
      )
         .click()
         .type("John");
      cy.get(
         "[data-cy='date Date of Birth 9b9af619-5db9-489a-81c0-9ff317337352 36ec27e9-85d6-4e34-9d20-98c65988b0e8']"
      )
         .click()
         .type("13/08/2012")
         .type("{enter}");
      cy.get(
         "[data-cy='list Gender 5032517e-9771-4133-8108-d2b96a83e4a3 36ec27e9-85d6-4e34-9d20-98c65988b0e8']"
      ).click();
      cy.get(
         "[data-cy='list options Male 5032517e-9771-4133-8108-d2b96a83e4a3 36ec27e9-85d6-4e34-9d20-98c65988b0e8']"
      ).click();
      cy.get(
         "[data-cy='button save 36ec27e9-85d6-4e34-9d20-98c65988b0e8']"
      ).click();
   });
});
