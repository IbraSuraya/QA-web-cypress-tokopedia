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
    it("TP-PH-01 Kembali ke home page", () => {
      cy.get('[data-testid="icnHeaderIcon"] > img').click().wait(randomDelay())
      cy.url().should("include", "/").wait(randomDelay())
    })
  })

  // IT IS RECOMMENDED TO DO DATA FETCHING AGAIN SO THAT IT IS UPDATED.
  context("Section - Sub Main Menu | Category Belanja", () => {
    // SECTION SUB CATEGORY - CATEGORY BELANJA
    function navToSubCat_Belanja(category, subCat, linkSubCat) {
      // Get every sub-cat
      cy.get(`[data-testid="${subCat}"]`).trigger('mouseover').wait(randomDelay()).click();
      cy.url().should("include", linkSubCat).wait(randomDelay())
      cy.go(-1)
      cy.get(`[data-testid="headerText"]`).should('be.visible').trigger('mouseover').wait(randomDelay());
      cy.get(`[data-testid="${category}"] div`).click().wait(randomDelay());
    }

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
          navToSubCat_Belanja(_belanja.id, _subCat.id, _subCat.href)
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
          navToSubCat_Belanja(_belanja.id, _subCat.id, _subCat.href)
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
          navToSubCat_Belanja(_belanja.id, _subCat.id, _subCat.href)
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
          navToSubCat_Belanja(_belanja.id, _subCat.id, _subCat.href)
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
          navToSubCat_Belanja(_belanja.id, _subCat.id, _subCat.href)
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
          navToSubCat_Belanja(_belanja.id, _subCat.id, _subCat.href)
        })
      })
    })
    
    // SECTION SEGMENT - SUB-CATEGORY RUMAH TANGGA - CATRGORY BELANJA
    function navToSegment(subCat, catNav, segCls, segHref){
      cy.get(`[data-testid="${catNav}"] > :nth-child(1) > .${segCls}`).wait(randomDelay()).click()
      cy.url().should("include", segHref).wait(randomDelay())
      cy.go(-1)
      cy.get(`[data-testid="headerText"]`).should('be.visible').trigger('mouseover').wait(randomDelay());
      cy.get(`[data-testid="btnHeaderCategory#1"] div`).click().wait(randomDelay());
      cy.get(`[data-testid="${subCat}"]`).trigger('mouseover').wait(randomDelay());
    }

    it("TP-PH-12.A (1-6) Redirect page every segment from sub category rumah tangga", () => {
      // btn "Kategori"
      cy.get(`[data-testid="headerText"]`).should('be.visible').trigger('mouseover').wait(randomDelay());
      // get category "Belanja"
      cy.get(`[data-testid="btnHeaderCategory#1"] div`).click().wait(randomDelay());
      
      cy.fixture("data_allSub").then((subCats) => {
        const _rmhTangga = subCats[0]
        cy.get(`[data-testid="${_rmhTangga.id}"]`).trigger('mouseover').wait(randomDelay());
        
        _rmhTangga.catNavs.forEach((catNav, idxNavSeg) => {
          if(idxNavSeg >= (_rmhTangga.catNavs.length / 2)) return   // 1-6
          // cy.log("INDEX : ", idxNavSeg)
          navToSegment(_rmhTangga.id, catNav.id, catNav.segment.class, catNav.segment.href)
        })
      })
    })

    it("TP-PH-12.B (7-12) Redirect page every segment from sub category rumah tangga", () => {
      // btn "Kategori"
      cy.get(`[data-testid="headerText"]`).should('be.visible').trigger('mouseover').wait(randomDelay());
      // get category "Belanja"
      cy.get(`[data-testid="btnHeaderCategory#1"] div`).click().wait(randomDelay());
      
      cy.fixture("data_allSub").then((subCats) => {
        const _rmhTangga = subCats[0]
        cy.get(`[data-testid="${_rmhTangga.id}"]`).trigger('mouseover').wait(randomDelay());
        
        _rmhTangga.catNavs.forEach((catNav, idxNavSeg) => {
          if(idxNavSeg < (_rmhTangga.catNavs.length / 2)) return   // 7-12
          // cy.log("INDEX : ", idxNavSeg)
          navToSegment(_rmhTangga.id, catNav.id, catNav.segment.class, catNav.segment.href)
        })
      })
    })

    // SECTION SUB CATEGORY - CATEGORY FEATURED    
    function navToSubCat_All(category, linkSubCat, idxSubCat) {
      // Get every sub-cat
      cy.get(`.css-sbvsi7 > :nth-child(${idxSubCat+1})`).trigger('mouseover').wait(randomDelay()).click();
      cy.url().should("include", linkSubCat).wait(randomDelay())
      cy.go(-1)
      cy.get(`[data-testid="headerText"]`).should('be.visible').trigger('mouseover').wait(randomDelay());
      cy.get(`[data-testid="${category}"] div`).click().wait(randomDelay());
    }
    
    // KECUALI SUB CATEGORY PROMO
    it("TP-PH-14 Redirect page every sub category from category Featured", () => {
      // btn "Kategori"
      cy.get(`[data-testid="headerText"]`).should('be.visible').trigger('mouseover').wait(randomDelay());
      cy.fixture('data_allCat').then((allCat) => {
        // Category "Featured"
        const _featured = allCat[1]
        cy.get(`[data-testid="${_featured.id}"] div`).click().wait(randomDelay());
        
        // Access All sub-cat
        _featured.subCats.forEach((_subCat, idxSubCat) => {
          if (idxSubCat === 1) return
          navToSubCat_All(_featured.id, _subCat.href, idxSubCat)
        })
      })
    })

    it("TP-PH-15 Redirect page every sub category from category butuhHari2", () => {
      // btn "Kategori"
      cy.get(`[data-testid="headerText"]`).should('be.visible').trigger('mouseover').wait(randomDelay());
      cy.fixture('data_allCat').then((allCat) => {
        // Category "butuhHari2"
        const _butuhHari2 = allCat[2]
        cy.get(`[data-testid="${_butuhHari2.id}"] div`).click().wait(randomDelay());
        
        // Access All sub-cat
        _butuhHari2.subCats.forEach((_subCat, idxSubCat) => {
          navToSubCat_All(_butuhHari2.id, _subCat.href, idxSubCat)
        })
      })
    })

    // KECUALI SUB CATEGORY LANGGANAN
    it("TP-PH-16 Redirect page every sub category from category tagihan", () => {
      // btn "Kategori"
      cy.get(`[data-testid="headerText"]`).should('be.visible').trigger('mouseover').wait(randomDelay());
      cy.fixture('data_allCat').then((allCat) => {
        // Category "tagihan"
        const _tagihan = allCat[3]
        cy.get(`[data-testid="${_tagihan.id}"] div`).click().wait(randomDelay());
        
        // Access All sub-cat
        _tagihan.subCats.forEach((_subCat, idxSubCat) => {
          if (idxSubCat === 7) return
          navToSubCat_All(_tagihan.id, _subCat.href, idxSubCat)
        })
      })
    })

    it("TP-PH-17 Redirect page every sub category from category topUp", () => {
      // btn "Kategori"
      cy.get(`[data-testid="headerText"]`).should('be.visible').trigger('mouseover').wait(randomDelay());
      cy.fixture('data_allCat').then((allCat) => {
        // Category "topUp"
        const _topUp = allCat[4]
        cy.get(`[data-testid="${_topUp.id}"] div`).click().wait(randomDelay());
        
        // Access All sub-cat
        _topUp.subCats.forEach((_subCat, idxSubCat) => {
          navToSubCat_All(_topUp.id, _subCat.href, idxSubCat)
        })
      })
    })

    // KECUALI SUB CATEGORY PROTEKSI,  KLAIM PROTEKSI, MODAL TOKO
    it("TP-PH-18 Redirect page every sub category from category tokpedUang", () => {
      // btn "Kategori"
      cy.get(`[data-testid="headerText"]`).should('be.visible').trigger('mouseover').wait(randomDelay());
      cy.fixture('data_allCat').then((allCat) => {
        // Category "tokpedUang"
        const _tokpedUang = allCat[5]
        cy.get(`[data-testid="${_tokpedUang.id}"] div`).click().wait(randomDelay());
        
        // Access All sub-cat
        _tokpedUang.subCats.forEach((_subCat, idxSubCat) => {
          if (idxSubCat <= 1 || idxSubCat === 5) return
          navToSubCat_All(_tokpedUang.id, _subCat.href, idxSubCat)
        })
      })
    })
    
    // KECUALI SUB CATEGORY KARTU PRAKERJA
    it("TP-PH-19 Redirect page every sub category from category pajakPendidikan", () => {
      // btn "Kategori"
      cy.get(`[data-testid="headerText"]`).should('be.visible').trigger('mouseover').wait(randomDelay());
      cy.fixture('data_allCat').then((allCat) => {
        // Category "pajakPendidikan"
        const _pajakPendidikan = allCat[6]
        cy.get(`[data-testid="${_pajakPendidikan.id}"] div`).click().wait(randomDelay());
        
        // Access All sub-cat
        _pajakPendidikan.subCats.forEach((_subCat, idxSubCat) => {
          if (idxSubCat === 5) return
          navToSubCat_All(_pajakPendidikan.id, _subCat.href, idxSubCat)
        })
      })
    })

    it("TP-PH-20 Redirect page every sub category from category travelEntertain", () => {
      // btn "Kategori"
      cy.get(`[data-testid="headerText"]`).should('be.visible').trigger('mouseover').wait(randomDelay());
      cy.fixture('data_allCat').then((allCat) => {
        // Category "travelEntertain"
        const _travelEntertain = allCat[7]
        cy.get(`[data-testid="${_travelEntertain.id}"] div`).click().wait(randomDelay());
        
        // Access All sub-cat
        _travelEntertain.subCats.forEach((_subCat, idxSubCat) => {
          navToSubCat_All(_travelEntertain.id, _subCat.href, idxSubCat)
        })
      })
    })

    // KECUALI REKSADANA SYARIAH
    it("TP-PH-21 Redirect page every sub category from category lain2", () => {
      // btn "Kategori"
      cy.get(`[data-testid="headerText"]`).should('be.visible').trigger('mouseover').wait(randomDelay());
      cy.fixture('data_allCat').then((allCat) => {
        // Category "halaCorner"
        const _halaCorner = allCat[8]
        cy.get(`[data-testid="${_halaCorner.id}"] div`).click().wait(randomDelay());
        
        // Access All sub-cat
        _halaCorner.subCats.forEach((_subCat, idxSubCat) => {
          if (idxSubCat === 4) return
          navToSubCat_All(_halaCorner.id, _subCat.href, idxSubCat)
        })
      })
    })

    // KECUALI TUKAR TAMBAH
    it("TP-PH-22 Redirect page every sub category from category lain2", () => {
      // btn "Kategori"
      cy.get(`[data-testid="headerText"]`).should('be.visible').trigger('mouseover').wait(randomDelay());
      cy.fixture('data_allCat').then((allCat) => {
        // Category "lain2"
        const _lain2 = allCat[9]
        cy.get(`[data-testid="${_lain2.id}"] div`).click().wait(randomDelay());
        
        // Access All sub-cat
        _lain2.subCats.forEach((_subCat, idxSubCat) => {
          if (idxSubCat >= 3) return
          navToSubCat_All(_lain2.id, _subCat.href, idxSubCat)
        })
      })
    })

    // KHUSUS AFFILIATE
    it.only("TP-PH-22 Redirect page AFFILIATE sub category from category lain2", () => {
      // btn "Kategori"
      cy.get(`[data-testid="headerText"]`).should('be.visible').trigger('mouseover').wait(randomDelay());
      cy.fixture('data_allCat').then((allCat) => {
        // Category "lain2"
        const _lain2 = allCat[9]
        cy.get(`[data-testid="${_lain2.id}"] div`).click().wait(randomDelay());
        
        // Access All sub-cat
        _lain2.subCats.forEach((_subCat, idxSubCat) => {
          if (idxSubCat === 4) {
            cy.get(`.css-sbvsi7 > :nth-child(${idxSubCat+1})`).trigger('mouseover').wait(randomDelay()).click();
            cy.url().should("include", _subCat.href).wait(randomDelay())
          }
        })
      })
    })
    
  })
})