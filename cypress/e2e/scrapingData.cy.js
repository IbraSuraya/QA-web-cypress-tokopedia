function randomDelay(){
  return Cypress._.random(500, 1000)
}

describe('Scraping Data', () => {
  // Note : use .only
  
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
  
  // PERHATIKAN DELAY TIME

  // DONE
  it('Get all the sub-categories of each category', () => {
    let categories = []
    // get btn kategori in menu bar
    cy.get(`[data-testid="headerText"]`).should('be.visible').trigger('mouseover').wait(randomDelay());
    // get container all category
    cy.get('[data-testid="allCategoryTab"] > div').each(($category, index) => {
      // <div class="css-11icpy4" data-testid="btnHeaderCategory#2"><div>Featured</div></div>
      const _idCat = $category.attr('data-testid');
      categories.push({
        id: _idCat,
        name: $category.find('div').text().trim(),
        cls: $category.attr('class'),
        subCats: []
      });

      // get btn tiap category
      cy.get(`[data-testid="${_idCat}"] div`).click().wait(randomDelay());

      // for category belanja
      if(_idCat == "btnHeaderCategory#1"){
        // Get list sub categories
        cy.get('[data-testid="allCategories"] a').each(($subCat) => {
          // <a href="/p/buku" class="css-19zjbhc" data-testid="showHide#3">Buku</a>
          const subCat = {}
          subCat.id = $subCat.attr('data-testid'),
          subCat.name = $subCat.text().trim()
          subCat.href =  $subCat.attr('href')
          subCat.cls =  $subCat.attr('class')

          categories[index].subCats.push(subCat)
        }).wait(randomDelay());
      } else {
        // Get list sub categories
        cy.get('.css-sbvsi7 a').each(($subCat) => {
          // <a href="/tokopedia-cobrand" class="css-sc810n">Tokopedia Card</a>
          const subCat = {}
          subCat.href = $subCat.attr("href")
          subCat.cls = $subCat.attr("class")
          subCat.name = $subCat.text().trim()

          categories[index].subCats.push(subCat)
        }).wait(randomDelay());
      }
    }).wait(randomDelay());

    // cy.log(categories).wait(randomDelay());
    cy.writeFile('cypress/fixtures/data_allCat.json', categories).wait(randomDelay());    // Save to file
  })

  it.only("Get all segments and their sub segments from all sub categories of the 'belanja' category.", () => {
    // get btn kategori in menu bar
    cy.get(`[data-testid="headerText"]`).should('be.visible').trigger('mouseover').wait(randomDelay())

    cy.fixture('data_allCat').then((allCat) => {
      const allSegment = []
      const catBelanja = allCat[0];
      // get category belanja
      cy.get(`[data-testid="${catBelanja.id}"] div`).click().wait(randomDelay())

      catBelanja.subCats.forEach((_subCat, indexCat) => {
        const noSegment = ["showHide#17", "showHide#27"]
        if(noSegment.includes(_subCat.id)) {
          return
        }
        
        // if(indexCat > 15) return

        allSegment.push({
          id: _subCat.id,
          name: _subCat.name,
          href: _subCat.href,
          cls: _subCat.cls,
          catNavs: []
        })
        
        // get sub category rumah tangga
        cy.get(`[data-testid="${_subCat.id}"]`).trigger('mouseover').wait(randomDelay());
        cy.get('.css-s0g7na .css-1owj1eu', { timeout: 5000 }).should('exist').each((navigate, indexNav) => {
          // <div class="css-1owj1eu" data-testid="catNavigation#1">pass</div>
          allSegment[indexCat].catNavs.push({
            id : navigate.attr('data-testid'),
            class : navigate.attr('class'),
            segment : {}
          })

          // // <a href="/p/rumah-tangga/dekorasi" class="css-1okvkby">Dekorasi</a>
          // const segment = navigate.find('.css-1okvkby');
          // allSegment[indexCat].catNavs[indexNav].segment.name = segment.text().trim()
          // allSegment[indexCat].catNavs[indexNav].segment.class = segment.attr("class"),
          // allSegment[indexCat].catNavs[indexNav].segment.href = segment.attr("href"),
          // allSegment[indexCat].catNavs[indexNav].segment.subSegs = []

          // // Get sub-segment data
          // navigate.find('.css-bfgk5q a').each(($subIndex, subSegment) => {
          //   // <a data-testid="categoryNavigation#2" href="/p/rumah-tangga/dekorasi/cover-kursi" class="css-ges1q2">Cover Kursi</a>
          //   allSegment[indexCat].catNavs[indexNav].segment.subSegs.push({
          //     id : Cypress.$(subSegment).attr("data-testid"),
          //     href : Cypress.$(subSegment).attr("href"),
          //     clss : Cypress.$(subSegment).attr("class"),
          //     name: Cypress.$(subSegment).text().trim()
          //   })
          // })
        })
      })
      // cy.log(allSegment)
      cy.writeFile('cypress/fixtures/data_allSub.json', allSegment).wait(randomDelay())
    })
  })

  // Done
  it("get all Trending Populer Keyword", () => {
    const keyPop = []
    cy.get("#trending-popular-keywords a").each(($_keyword, index) => {
      keyPop.push({
        id: $_keyword.attr("data-testid"),
        href: $_keyword.attr("href").replace("https://www.tokopedia.com", ""),
        name: $_keyword.text().trim()
      })
    })
    cy.log(keyPop)
    cy.writeFile('cypress/fixtures/data_keyPop.json', keyPop).wait(randomDelay());    // Save to file
  })
});