describe("Page - Home", () => {
  const randomDelay = Cypress._.random(100, 500)

  beforeEach(() => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    });
    cy.visit('/', {
      headers: {
        "Accept-Encoding": "gzip, deflate, br",
      },
    });
    cy.wait(randomDelay)
  })

  context("Section - Menu", () => {
    it("TP-PH-01 Kembali ke home page", () => {
      cy.get('[data-testid="icnHeaderIcon"] > img').click().wait(randomDelay)
      cy.url().should("include", "/").wait(randomDelay)
    })
    
    it("TP-PH-02 Download mobile-apps via website", () => {
      cy.get('.css-5b0cy').trigger('mouseover')
      cy.get('#qrCodeEl').should('be.visible')
      cy.get('[style="margin-top: 9px;"] > a > img').should('be.visible')
      cy.get('[style="margin-top: 8px;"] > a > img').should('be.visible')
      cy.get('.css-5b0cy').invoke('removeAttr', 'target').click().wait(randomDelay)
      cy.url().should("include", "/mobile-apps").wait(randomDelay)
    })
    
    it("TP-PH-03 Download mobile-apps via playstore", () => {
      cy.get('.css-5b0cy').should('be.visible').trigger('mouseover');
      cy.get('[style="margin-top: 9px;"] > a').should('be.visible').invoke('removeAttr', 'target').click().wait(randomDelay)
      cy.url().should("eq", "https://play.google.com/store/apps/details?id=com.tokopedia.tkpd").wait(randomDelay)
    })
    
    it("TP-PH-06XX", () => {
      cy.get('[data-testid="btnHeaderAbout"]').invoke('removeAttr', 'target').click().wait(randomDelay)
      cy.url().should("include", "/about")
      
    })
    // it.only("TP-PH-02 Download mobiel-apps via website", () => {
    //   cy.get('[data-testid="headerText"]').trigger('mouseover').wait(randomDelay)
    //   // cy.get('[data-testid="headerText"]').invoke('show')

    //   cy.get('[data-testid="btnHeaderCategory#1"] > div').click()
    //   cy.url().should("include", "/p/rumah-tangga", {
    //     headers: {
    //       "Accept-Encoding": "gzip, deflate, br",
    //     },
    //   })
    //   // cy.get('[data-testid="showHide#1"]').trigger('mouseover')
    // })
    
  })
})