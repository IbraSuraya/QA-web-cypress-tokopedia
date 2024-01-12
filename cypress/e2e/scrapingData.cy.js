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
  
  it.only('All Category', () => {
    // Mendefinisikan data hasil scraping
    let tempAll = []
    // Get button kategori
    cy.get('[data-testid="headerText"]').should('be.visible').trigger('mouseover');
    
    // Mengambil elemen semua kategori
    cy.get('[data-testid="allCategoryTab"]').within(() => {
      // Ambil data atribute tiap tag div
      cy.get('div').each((data) => {
        // const tempText = cy.get(`[data-testid="${data.attr('data-testid')}"] div`).invoke('text')
        let tempId = data.attr('data-testid')
        // let tempText = cy.get(`[data-testid="${tempId}"] div`).invoke('text')
        const temp = {
          testId: tempId,
          text: cy.get('div').invoke('text')
        };
        tempAll.push(temp)
      }).wait(randomDelay());
    });
    cy.log(tempAll)
    // cy.log(JSON.stringify(tempAll, null, 2));
    // cy.writeFile('cypress/fixtures/data_allCat.json', tempAll).wait(randomDelay())
  })

  it('All Sub Category Belanja', () => {
    // Get button kategori
    cy.get('[data-testid="headerText"]').should('be.visible').trigger('mouseover');


    // Mengambil elemen dengan data-testid "allCategories"
    cy.get('[data-testid="allCategories"]').within(() => {
      // Mengambil semua elemen <a> di dalamnya
      cy.get('a').each((link) => {
        // Mengambil data dari atribut yang diperlukan
        const categoryData = {
          href: link.attr('href'),
          subCategory: link.attr('data-testid'),
          text: link.text(),
        };

        // Menambahkan data ke array hasil scraping
        tempAll.push(categoryData);
      });
    });

    // Menampilkan hasil scraping di console
    cy.log(JSON.stringify(listSubCategory, null, 2));

    // Opsional: Simpan hasil scraping ke file jika diperlukan
    cy.writeFile('cypress/fixtures/data_subCategory.json', listSubCategory);
  });

  it('All sub Segment', () => {
    cy.get('[data-testid="headerText"]').should('be.visible').trigger('mouseover');
    cy.fixture('data_subCategory').then((subCategorys) => {
      subCategorys.forEach(_element => {
        console.log(_element.subCategory)
        cy.get(`[data-testid="${_element.subCategory}"]`).wait(randomDelay())
      });
    })
  })
});