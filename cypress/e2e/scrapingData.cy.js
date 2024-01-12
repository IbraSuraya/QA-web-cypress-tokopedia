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

  it.only("All segment and sub segment from all sub category belanja", () => {
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
});