// Mendefinisikan data hasil scraping
let listSubCategory = [];

describe('Scraping Data', () => {
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

  it.only('All Sub Category', () => {
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
        listSubCategory.push(categoryData);
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
        cy.get(`[data-testid="${_element.subCategory}"]`).wait(randomDelay)
      });
    })
  })
});