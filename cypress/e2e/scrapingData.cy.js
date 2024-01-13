function randomDelay(){
  return Cypress._.random(100, 500)
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
  
  it('All Category', () => {
    let categories = []
    // get btn kategori in menu bar
    cy.get(`[data-testid="headerText"]`).should('be.visible').trigger('mouseover').wait(randomDelay());
    // get container all category
    cy.get('[data-testid="allCategoryTab"] > div').each(($category, index) => {
      // <div class="css-11icpy4" data-testid="btnHeaderCategory#2"><div>Featured</div></div>
      categories.push({
        id: $category.attr('data-testid'),
        name: $category.find('div').text().trim(),
        cls: $category.attr('class')
      });
      
    }).wait(randomDelay());
    // cy.log(categories).wait(randomDelay());
    cy.writeFile('cypress/fixtures/data_allCat.json', categories).wait(randomDelay());    // Save to file
  })

  it.only('All Sub Category from category Belanja', () => {
    let allData = []
    // get btn kategori in menu bar
    cy.get(`[data-testid="headerText"]`).should('be.visible').trigger('mouseover').wait(randomDelay());
    // akses semua categories
    cy.fixture('data_allCat').then((allCat) => {
      allCat.forEach((_cat) => {
        // get btn tiap category
        cy.get(`[data-testid="${_cat.id}"] div`).click().wait(randomDelay())
        
        const _data = {}
        _data.id = _cat.id,
        _data.name = _cat.name,
        _data.cls = _cat.cls,
        _data.subCat = []
        
        // Try category belanja
        if(_cat.name === "Belanja"){
          // Get list sub categories
          cy.get('[data-testid="allCategories"] a').each(($subCat, index) => {
            // <a href="/p/buku" class="css-19zjbhc" data-testid="showHide#3">Buku</a>
            const subCat = {}
            subCat.id = $subCat.attr('data-testid'),
            subCat.name = $subCat.text().trim(),
            subCat.href =  $subCat.attr('href'),
            subCat.cls =  $subCat.attr('class')

            _data.subCat.push(subCat)
          }).wait(randomDelay());
          
          allData.push(_data)
          cy.log(allData)
          cy.writeFile(`cypress/fixtures/data_subCat-${_cat.name}.json`, allData).wait(randomDelay())
        }
        // else{
        //   let subCategories = []
        //   // Get list sub categories
        //   cy.get('.css-sbvsi7 a').each(($subCat, index) => {
        //     // <a href="/tokopedia-cobrand" class="css-sc810n">Tokopedia Card</a>
        //     subCategories.push({
        //       href: $subCat.attr('href'),
        //       cls: $subCat.attr('class'),
        //       name: $subCat.text().trim()
        //     })
        //   })
        // }
      })
    })
  })

  it("All segment and sub segment from all sub category belanja", () => {
    // get btn kategori in menu bar
    cy.get(`[data-testid="headerText"]`).should('be.visible').trigger('mouseover').wait(randomDelay())
    // get category belanja
    cy.get('[data-testid="btnHeaderCategory#1"] div').click().wait(randomDelay())
    // get sub category rumah tangga
    cy.get('[data-testid="showHide#1"]').should('be.visible').trigger('mouseover').wait(randomDelay())

    const catNavigates = [];
    // Get all category elements
    cy.get('.css-s0g7na .css-1owj1eu').each((category, index) => {
      const navigateData = {};

      // Get title and class of the navigate
      navigateData.id = navigate.attr('data-testid');
      navigateData.class = navigate.attr('class');

      // Get segment data
      navigateData.segment = {};
      const segment = navigate.find('.css-1okvkby');
      navigateData.segment.title = segment.text();
      navigateData.segment.class = segment.attr('class');
      navigateData.segment.href = segment.attr('href');

      // Get sub-segment data
      navigateData.segment.subSegment = [];
      navigate.find('.css-bfgk5q a').each(($subIndex, subSegment) => {
        
        const subSegmentData = {};
        subSegmentData.title = Cypress.$(subSegment).text();
        subSegmentData.id = Cypress.$(subSegment).attr('data-testid');
        subSegmentData.href = Cypress.$(subSegment).attr('href');
        subSegmentData.class = Cypress.$(subSegment).attr('class');
        navigateData.segment.subSegment.push(subSegmentData);
      });

      // Push navigate data to the catNavigates array
      catNavigates.push(navigateData);
    });

    cy.log(catNavigates)
    cy.writeFile('cypress/fixtures/test.json', catNavigates).wait(randomDelay())
  })
});