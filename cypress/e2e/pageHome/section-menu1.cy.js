import {dataUrl} from '../../utils/dataUrl.js'
import { dataImage } from '../../utils/dataImage.js';

function randomDelay(){
  // return Cypress._.random(500, 800)
  return Cypress._.random(100, 500)
}

describe("Page - Home", () => {
  
  beforeEach(() => {
    cy.on('uncaught:exception', (err, runnable) => {
        return false
    });
    cy.visit('/', {
      headers: {
          "Accept-Encoding": "gzip, deflate, br",
        },
    });
    cy.wait(randomDelay())
  })

  context("Section - Secondary Menu", () => {
    it("TP-PH-02 Download mobile-apps via website", () => {
      cy.get('.css-5b0cy').should('be.visible').trigger('mouseover');
      cy.get('#qrCodeEl').should('be.visible')
      cy.get('[style="margin-top: 9px;"] > a > img').should('be.visible')
      cy.get('[style="margin-top: 8px;"] > a > img').should('be.visible')
      cy.get('.css-5b0cy').invoke('removeAttr', 'target').click().wait(randomDelay())
      cy.url().should("include", dataUrl.mobileApps).wait(randomDelay())
    })
    
    it("TP-PH-03 Download mobile-apps via playstore", () => {
      cy.get('.css-5b0cy').should('be.visible').trigger('mouseover');
      cy.get('[style="margin-top: 9px;"] > a').should('be.visible').invoke('removeAttr', 'target').click().wait(randomDelay())
      cy.url().should("eq", dataUrl.playstore).wait(randomDelay())
    })
    
    it("TP-PH-04 Download mobile-apps via appstore", () => {
      cy.get('.css-5b0cy').should('be.visible').trigger('mouseover');
      cy.get('[style="margin-top: 8px;"] > a').should('be.visible').invoke('removeAttr', 'target').click().wait(randomDelay())
      cy.url().should("eq", dataUrl.appstore).wait(randomDelay())
    })
    
    it("TP-PH-05 Download mobile-apps via QR Code", () => {
      cy.get('.css-5b0cy').should('be.visible').trigger('mouseover');
      cy.get('#qrCodeEl').should('be.visible')
      cy.get('[style="padding: 5px; border-radius: 10px; border: 1px solid var(--GN500, #00AA5B);"] > img')
        .invoke('attr', 'src').should('include', dataImage.qrCode)
    })
    
    it("TP-PH-06 Redirect page about", () => {
      cy.get('[data-testid="btnHeaderAbout"]').invoke('removeAttr', 'target').click().wait(randomDelay())
      cy.url().should("include", dataUrl.about).wait(randomDelay())  
    })
    
    it("TP-PH-07 Redirect page Mitra Tokopedia", () => {
      cy.get('[data-testid="btnHeaderMitra"]').invoke('removeAttr', 'target').click().wait(randomDelay())
      cy.url().should("include", dataUrl.mitra).wait(randomDelay())  
    })
    
    it("TP-PH-08 Redirect page Mulai Berjualan", () => {
      cy.get('[data-testid="btnHeaderSellerEdu"]').invoke('removeAttr', 'target').click().wait(randomDelay())
      cy.url().should("include", dataUrl.mulaiBerjualan).wait(randomDelay())  
    })
    
    it("TP-PH-09 Redirect page Promo", () => {
      cy.get('[data-testid="btnHeaderPromo"]').invoke('removeAttr', 'target').click().wait(randomDelay())
      cy.url().should("include", dataUrl.promo[1]).wait(randomDelay())  
    })
    
    it("TP-PH-10 Redirect page Tokopedia Care", () => {
      cy.get('[data-testid="btnHeaderHelp"]').invoke('removeAttr', 'target').click().wait(randomDelay())
      cy.url().should("include", dataUrl.help).wait(randomDelay())  
    })
  })
    
  context("Section - Main Menu", () => {
    function navToSubCategory(category, subCat, linkSubCat) {
      // Get every sub-cat
      cy.get(`[data-testid="${subCat}"]`).trigger('mouseover').wait(randomDelay()).click();
      cy.url().should("include", linkSubCat).wait(randomDelay())
      cy.go(-1)
      cy.get(`[data-testid="headerText"]`).should('be.visible').trigger('mouseover').wait(randomDelay());
      cy.get(`[data-testid="${category}"] div`).click().wait(randomDelay());
    }

    it("TP-PH-01 Kembali ke home page", () => {
      cy.get('[data-testid="icnHeaderIcon"] > img').click().wait(randomDelay())
      cy.url().should("include", "/").wait(randomDelay())
    })
    
    // IT IS RECOMMENDED TO DO DATA FETCHING AGAIN SO THAT IT IS UPDATED.
    it("TP-PH-11.A (1-5) Redirect page every sub category from category Belanja", () => {
      // btn "Kategori"
      cy.get(`[data-testid="headerText"]`).should('be.visible').trigger('mouseover').wait(randomDelay());
      cy.fixture('data_allCat').then((allCat) => {
        // Category "Belanja"
        const _belanja = allCat[0]
        cy.get(`[data-testid="${_belanja.id}"] div`).click().wait(randomDelay());
        
        // Access All sub-cat
        _belanja.subCats.forEach((_subCat, idxSubCat) => {
          if (idxSubCat >= 5) return    // Sub-Cat 1-5
          cy.log("INDEX ", idxSubCat)
          navToSubCategory(_belanja.id, _subCat.id, _subCat.href)
        })
      })
    })
    
    it("TP-PH-11.B (6-10) Redirect page every sub category from category Belanja", () => {
      // btn "Kategori"
      cy.get(`[data-testid="headerText"]`).should('be.visible').trigger('mouseover').wait(randomDelay());
      cy.fixture('data_allCat').then((allCat) => {
        // Category "Belanja"
        const _belanja = allCat[0]
        cy.get(`[data-testid="${_belanja.id}"] div`).click().wait(randomDelay());
        
        // Access All sub-cat
        _belanja.subCats.forEach((_subCat, idxSubCat) => {
          if (idxSubCat < 5 || idxSubCat >= 10) return    // Sub-Cat 6-10
          cy.log("INDEX ", idxSubCat)
          navToSubCategory(_belanja.id, _subCat.id, _subCat.href)
        })
      })
    })
    
    it("TP-PH-11.C (11-15) Redirect page every sub category from category Belanja", () => {
      // btn "Kategori"
      cy.get(`[data-testid="headerText"]`).should('be.visible').trigger('mouseover').wait(randomDelay());
      cy.fixture('data_allCat').then((allCat) => {
        // Category "Belanja"
        const _belanja = allCat[0]
        cy.get(`[data-testid="${_belanja.id}"] div`).click().wait(randomDelay());
        
        // Access All sub-cat
        _belanja.subCats.forEach((_subCat, idxSubCat) => {
          if (idxSubCat < 10 || idxSubCat >= 15) return    // Sub-Cat 11-15
          cy.log("INDEX ", idxSubCat)
          navToSubCategory(_belanja.id, _subCat.id, _subCat.href)
        })
      })
    })
    
    it("TP-PH-11.D (16-20) Redirect page every sub category from category Belanja", () => {
      // btn "Kategori"
      cy.get(`[data-testid="headerText"]`).should('be.visible').trigger('mouseover').wait(randomDelay());
      cy.fixture('data_allCat').then((allCat) => {
        // Category "Belanja"
        const _belanja = allCat[0]
        cy.get(`[data-testid="${_belanja.id}"] div`).click().wait(randomDelay());
        
        // Access All sub-cat
        _belanja.subCats.forEach((_subCat, idxSubCat) => {
          if (idxSubCat < 15 || idxSubCat >= 20) return    // Sub-Cat 16-20
          cy.log("INDEX ", idxSubCat)
          navToSubCategory(_belanja.id, _subCat.id, _subCat.href)
        })
      })
    })
    
    it("TP-PH-11.E (21-25) Redirect page every sub category from category Belanja", () => {
      // btn "Kategori"
      cy.get(`[data-testid="headerText"]`).should('be.visible').trigger('mouseover').wait(randomDelay());
      cy.fixture('data_allCat').then((allCat) => {
        // Category "Belanja"
        const _belanja = allCat[0]
        cy.get(`[data-testid="${_belanja.id}"] div`).click().wait(randomDelay());
        
        // Access All sub-cat
        _belanja.subCats.forEach((_subCat, idxSubCat) => {
          if (idxSubCat < 20 || idxSubCat >= 25) return    // Sub-Cat 21-25
          cy.log("INDEX ", idxSubCat)
          navToSubCategory(_belanja.id, _subCat.id, _subCat.href)
        })
      })
    })
    
    it("TP-PH-11.F (26-30) Redirect page every sub category from category Belanja", () => {
      // btn "Kategori"
      cy.get(`[data-testid="headerText"]`).should('be.visible').trigger('mouseover').wait(randomDelay());
      cy.fixture('data_allCat').then((allCat) => {
        // Category "Belanja"
        const _belanja = allCat[0]
        cy.get(`[data-testid="${_belanja.id}"] div`).click().wait(randomDelay());
        
        // Access All sub-cat
        _belanja.subCats.forEach((_subCat, idxSubCat) => {
          if (idxSubCat < 25) return    // Sub-Cat 26-30
          cy.log("INDEX ", idxSubCat)
          navToSubCategory(_belanja.id, _subCat.id, _subCat.href)
        })
      })
    })
  })
})