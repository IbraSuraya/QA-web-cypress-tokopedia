describe("Page - Home", () => {
  beforeEach(() => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })
    cy.visit('/', {
      headers: {
        "Accept-Encoding": "gzip, deflate, br",
      },
    });
    cy.url().should("include", "/")
  })

  context("Section - Menu", () => {
    it("Access Home Page", () => {
      cy.get('[data-testid="icnHeaderIcon"] > img')
    })
  })
})