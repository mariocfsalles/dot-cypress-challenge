/// <reference types="cypress" />
import ProductPage from '../support/pageObjects/ProductPage';

describe('Testes de gerenciamento de produtos na lista de compras', () => {
  const productPage = new ProductPage();

  beforeEach(() => {
    cy.login('sicrano1@qa.com.br', 'teste');
    cy.visit('/home');
  });

  it('Deve visualizar a lista de produtos na página', () => {
    productPage.verifyProductListIsVisible(); // Cypress lida com as esperas automaticamente
    productPage.verifyProductSessionIsVisible(); // Cypress lida com as esperas automaticamente

    productPage.getProductCards().should('have.length.greaterThan', 0); // Cypress espera automaticamente que o elemento apareça

    productPage.getFirstProduct().within(() => {
      productPage.getProductTitle().should('be.visible');
      productPage.getProductSubtitle().contains('Preço').should('be.visible');
      cy.get('button[data-testid="adicionarNaLista"]').should('be.visible')
    });
  });

  it('Deve visualizar os detalhes de um produto', () => {
    productPage.goToProductDetailPage(); // Cypress já lida com esperas
    cy.url().should('include', '/detalhesProduto');
  });

  it('Deve adicionar um produto à lista e verificar nome, preço, quantidade, total e botões', () => {
    let selectedProductName = '';
    let selectedProductPrice = '';
    let productQuantity = 1;

    productPage.verifyProductListIsVisible();

    productPage.getFirstProduct().within(() => {
      productPage.getProductTitle().invoke('text').then((productName) => {
        selectedProductName = productName.trim();
      });
      productPage.getProductSubtitle().last().invoke('text').then((productPrice) => {
        selectedProductPrice = parseFloat(productPrice.trim().replace('$ ', ''));
      });
      productPage.clickAddToListButton();
    });

    cy.contains('h1', 'Lista de Compras').should('be.visible');
    productPage.getShoppingCartProductName().should('contain', selectedProductName);
    productPage.getShoppingCartProductName().parent().within(() => {
      cy.get('p').first().invoke('text').then((cartProductPrice) => {
        const cartPrice = parseFloat(cartProductPrice.trim().replace('Preço R$', ''));
        expect(cartPrice).to.equal(selectedProductPrice);
      });
    });
    productPage.getShoppingCartProductQuantity().should('contain', `Total: ${productQuantity}`);
    cy.get('button[data-testid="paginaInicial"]').should('be.visible').and('contain', 'Página Inicial');
  });

  it('Deve incrementar e remover produtos a lista corretamente', () => {
    let selectedProductName = '';
    let selectedProductPrice = '';
    let initialQuantity = 1;
    let incrementCount = 2;
    let decrementCount = 1;

    productPage.verifyProductListIsVisible();

    productPage.getFirstProduct().within(() => {
      productPage.getProductTitle().invoke('text').then((productName) => {
        selectedProductName = productName.trim();
      });
      productPage.getProductSubtitle().last().invoke('text').then((productPrice) => {
        selectedProductPrice = parseFloat(productPrice.trim().replace('$ ', ''));
      });
      productPage.clickAddToListButton();
    });

    cy.contains('h1', 'Lista de Compras').should('be.visible');
    productPage.getShoppingCartProductName().should('contain', selectedProductName);

    for (let i = 0; i < incrementCount; i++) {
      productPage.clickIncreaseQuantity();
    }

    productPage.getShoppingCartProductQuantity().should('contain', `Total: ${initialQuantity + incrementCount}`);

    for (let i = 0; i < decrementCount; i++) {
      productPage.clickDecreaseQuantity();
    }

    let expectedQuantity = initialQuantity + incrementCount - decrementCount;
    productPage.getShoppingCartProductQuantity().should('contain', `Total: ${expectedQuantity}`);

    productPage.getShoppingCartProductName().parent().within(() => {
      cy.get('p').first().invoke('text').then((cartProductPrice) => {
        const cartPrice = parseFloat(cartProductPrice.trim().replace('Preço R$', ''));
        expect(cartPrice).to.equal(selectedProductPrice * expectedQuantity);
      });
    });

    cy.get('button[data-testid="paginaInicial"]').should('be.visible').and('contain', 'Página Inicial');
  });

  it('Deve impedir decremento abaixo de 1 unidade e desabilitar botão', () => {
    productPage.clickAddToListButton();
    cy.get('[data-testid="product-decrease-quantity"]').should('be.disabled');
  });
});
