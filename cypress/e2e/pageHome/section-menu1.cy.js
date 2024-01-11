import {dataUrl} from '../../utils/dataUrl.js'
import { dataImage } from '../../utils/dataImage.js';

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

  context("Section - Secondary Menu", () => {
    it("TP-PH-02 Download mobile-apps via website", () => {
      cy.get('.css-5b0cy').should('be.visible').trigger('mouseover');
      cy.get('#qrCodeEl').should('be.visible')
      cy.get('[style="margin-top: 9px;"] > a > img').should('be.visible')
      cy.get('[style="margin-top: 8px;"] > a > img').should('be.visible')
      cy.get('.css-5b0cy').invoke('removeAttr', 'target').click().wait(randomDelay)
      cy.url().should("include", dataUrl.mobileApps).wait(randomDelay)
    })
    
    it("TP-PH-03 Download mobile-apps via playstore", () => {
      cy.get('.css-5b0cy').should('be.visible').trigger('mouseover');
      cy.get('[style="margin-top: 9px;"] > a').should('be.visible').invoke('removeAttr', 'target').click().wait(randomDelay)
      cy.url().should("eq", dataUrl.playstore).wait(randomDelay)
    })
    
    it("TP-PH-04 Download mobile-apps via appstore", () => {
      cy.get('.css-5b0cy').should('be.visible').trigger('mouseover');
      cy.get('[style="margin-top: 8px;"] > a').should('be.visible').invoke('removeAttr', 'target').click().wait(randomDelay)
      cy.url().should("eq", dataUrl.appstore).wait(randomDelay)
    })
    
    it("TP-PH-05 Download mobile-apps via QR Code", () => {
      cy.get('.css-5b0cy').should('be.visible').trigger('mouseover');
      cy.get('#qrCodeEl').should('be.visible')
      cy.get('[style="padding: 5px; border-radius: 10px; border: 1px solid var(--GN500, #00AA5B);"] > img')
        .invoke('attr', 'src').should('include', dataImage.qrCode)
    })
    
    it("TP-PH-06 Redirect page about", () => {
      cy.get('[data-testid="btnHeaderAbout"]').invoke('removeAttr', 'target').click().wait(randomDelay)
      cy.url().should("include", dataUrl.about).wait(randomDelay)  
    })
    
    it("TP-PH-07 Redirect page Mitra Tokopedia", () => {
      cy.get('[data-testid="btnHeaderMitra"]').invoke('removeAttr', 'target').click().wait(randomDelay)
      cy.url().should("include", dataUrl.mitra).wait(randomDelay)  
    })
    
    it("TP-PH-08 Redirect page Mulai Berjualan", () => {
      cy.get('[data-testid="btnHeaderSellerEdu"]').invoke('removeAttr', 'target').click().wait(randomDelay)
      cy.url().should("include", dataUrl.mulaiBerjualan).wait(randomDelay)  
    })
    
    it.only("TP-PH-09 Redirect page Promo", () => {
      cy.get('[data-testid="btnHeaderPromo"]').invoke('removeAttr', 'target').click().wait(randomDelay)
      cy.url().should("include", dataUrl.promo[1]).wait(randomDelay)  
    })
    
    it("TP-PH-10 Redirect page Tokopedia Care", () => {
      cy.get('[data-testid="btnHeaderHelp"]').invoke('removeAttr', 'target').click().wait(randomDelay)
      cy.url().should("include", dataUrl.help).wait(randomDelay)  
    })
  })
    
  context("Section - Main Menu", () => {
    it("TP-PH-01 Kembali ke home page", () => {
      cy.get('[data-testid="icnHeaderIcon"] > img').click().wait(randomDelay)
      cy.url().should("include", "/").wait(randomDelay)
    })
  })
})