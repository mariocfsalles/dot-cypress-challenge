class ProductPage {

  getProductCards() {
    return cy.get('div.card'); // Cypress já lida com o timeout automaticamente
  }

  getFirstProduct() {
    return this.getProductCards().first(); // retorna o comando Cypress
  }

  getProductTitle() {
    return cy.get('h5.card-title'); // retorna o comando Cypress
  }

  getProductSubtitle() {
    return cy.get('h6.card-subtitle.mb-2.text-muted'); // retorna o comando Cypress
  }

  clickAddToListButton() {
    return cy.get('[data-testid="adicionarNaLista"]').first().click(); // retorna o comando Cypress
  }

  getShoppingCartProductName() {
    return cy.get('div[data-testid="shopping-cart-product-name"]').first(); // retorna o comando Cypress
  }

  getShoppingCartProductQuantity() {
    return cy.get('div[data-testid="shopping-cart-product-quantity"]').first(); // retorna o comando Cypress
  }

  clickIncreaseQuantity() {
    return cy.get('[data-testid="product-increase-quantity"]').first().click(); // retorna o comando Cypress
  }

  clickDecreaseQuantity() {
    return cy.get('[data-testid="product-decrease-quantity"]').first().click(); // retorna o comando Cypress
  }

  getProductDetailLink() {
    return cy.get('[data-testid="product-detail-link"]').first(); // retorna o comando Cypress
  }

  goToProductDetailPage() {
    return this.getProductDetailLink().click(); // retorna o comando Cypress
  }



  verifyProductListIsVisible() {
    return cy.contains('h4', 'Produtos').should('be.visible'); // retorna o comando Cypress
  }

  verifyProductSessionIsVisible() {
    return cy.get('section.row.espacamento').should('be.visible'); // retorna o comando Cypress
  }
}

export default ProductPage;
