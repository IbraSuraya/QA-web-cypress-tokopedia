function randomDelay(){
  return Cypress._.random(100, 500)
}

describe('Scraping Data', () => {
  
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
    let tempAll = []
    cy.get('[data-testid="headerText"]').should('be.visible').trigger('mouseover').wait(randomDelay())
    
    cy.get('[data-testid="allCategoryTab"] > div').each(($categoryDiv, index) => {
      const categoryName = $categoryDiv.find('div').text().trim();

      tempAll.push({
        id: `btnHeaderCategory#${index + 1}`,
        name: categoryName,
      });
    }).wait(randomDelay())
    cy.log(tempAll)
    cy.log(JSON.stringify(tempAll, null, 2));
    cy.writeFile('cypress/fixtures/data_allCat.json', tempAll).wait(randomDelay())
  })

  it('All Sub Category from category Belanja', () => {
    let tempAll = []
    cy.get('[data-testid="headerText"]').should('be.visible').trigger('mouseover').click().wait(randomDelay())
    cy.get('[data-testid="btnHeaderCategory#1"] div').click().wait(randomDelay())
    cy.get('[data-testid="allCategories"] a').each(($categoryLink, index) => {
      const categoryName = $categoryLink.text().trim();
      const categoryHref = $categoryLink.attr('href');
    
      tempAll.push({
        id: `showHide#${index + 1}`,
        name: categoryName,
        href: categoryHref,
      })
    }).wait(randomDelay())
    cy.log(tempAll)
    cy.log(JSON.stringify(tempAll, null, 2));
    cy.writeFile('cypress/fixtures/data_allSubCat_Belanja.json', tempAll).wait(randomDelay())
  })

  it("All segment and sub segment from all sub category belanja", () => {
    let tempAll = []
    cy.get('[data-testid="headerText"]').should('be.visible').trigger('mouseover').click().wait(randomDelay())
    cy.get('[data-testid="btnHeaderCategory#1"] div').click().wait(randomDelay())
    cy.fixture('data_allSubCat_Belanja.json').then((subCats) => {
      subCats.forEach(element => {
        // cy.log(element)
        cy.get(`[data-testid="${element.id}"]`).trigger('mouseover')
        cy.get('.css-s0g7na').each(($category, index) => {
          const categoryName = $category.find('.css-1okvkby')
          // const testAJh = Object.children(categoryName)
          // const categoryName = $category.find('.css-1okvkby').text().trim().split(" ");
          cy.log(categoryName)
          
          const subTempAll = [];
          // $category.find('.css-bfgk5q a').each(($subcategory) => {

            // const subcategoryName = $subcategory.text().trim();
            // const subcategoryHref = $subcategory.attr('href');
            // const subcategoryId = $subcategory.attr('data-testid');
        
            // // Menambahkan data subkategori ke dalam array
            // subTempAll.push({
            //   id: subcategoryId,
            //   href: subcategoryHref,
            //   name: subcategoryName,
            // });
          // });

          // Menambahkan data kategori dan subkategori ke dalam objek
          // tempAll.push({
          //   category: categoryName,
          //   subcategories: subcategories,
          // });
        })
        // cy.log(JSON.stringify(tempAll, null, 2));
        // cy.writeFile('cypress/fixtures/data_allSubSeg_Belanja.json', tempAll);
      })
    }).wait(randomDelay())
  })

  it("Testing", () => {
    // get side card tiap sub category
    cy.get('.css-s0g7na').each(($value, $list) => {
      const subTempAll = []
      for(var subSegment of $value.find('.css-bfgk5q a')){
        cy.log(subSegment)
      }
      for (var segment of $value.find('.css-1okvkby')){
        tempAll.push({
          _name: segment.text,
          _href: segment.href
        })
      }
      
    })
  })
  
  it.only("Testing Ke-2", () => {
    // get btn kategori in menu bar
    cy.get(`[data-testid="headerText"]`).should('be.visible').trigger('mouseover').click().wait(randomDelay())
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