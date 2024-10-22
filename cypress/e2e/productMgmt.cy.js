/// <reference types="cypress" />


describe('Testes de gerenciamento de produtos na lista de compras', () => {
  beforeEach(() => {
    cy.login('sicrano1@qa.com.br', 'teste');
    cy.visit('/home');
  });

  it('Deve visualizar a lista de produtos na página', () => {

    cy.contains('h4', 'Produtos').should('be.visible')
    cy.get('section.row.espacamento').should('be.visible')
    cy.get('div.card').should('have.length.greaterThan', 0)

    cy.get('div.card').first().within(() => {
      cy.get('h5.card-title').should('be.visible')
      cy.get('h6.card-subtitle').contains('Preço').should('be.visible')
      cy.get('button[data-testid="adicionarNaLista"]').should('be.visible')
    })
  })

  it('Deve visualizar os detalhes de um produto', () => {
    cy.get('[data-testid="product-detail-link"]').first().click();
    cy.url().should('include', '/detalhesProduto');
  });

  it('Deve adicionar um produto à lista e verificar nome, preço, quantidade, total e botões', () => {

    let selectedProductName = '';
    let selectedProductPrice = '';
    let productQuantity = 1;

    cy.contains('h4', 'Produtos').should('be.visible');

    cy.get('.card').first().within(() => {
      cy.get('h5.card-title').invoke('text').then((productName) => {
        selectedProductName = productName.trim();
      });
      cy.get('h6.card-subtitle.mb-2.text-muted').last().invoke('text').then((productPrice) => {
        selectedProductPrice = parseFloat(productPrice.trim().replace('$ ', ''));
      });
      cy.get('[data-testid="adicionarNaLista"]').click();
    });

    cy.contains('h1', 'Lista de Compras').should('be.visible');
    cy.get('button[data-testid="adicionar carrinho"]').should('be.visible');
    cy.get('div[data-testid="shopping-cart-product-name"]').first().should('contain', selectedProductName);
    cy.get('div[data-testid="shopping-cart-product-name"]').first().parent().within(() => {
      cy.get('p').first().invoke('text').then((cartProductPrice) => {
        const cartPrice = parseFloat(cartProductPrice.trim().replace('Preço R$', ''));
        expect(cartPrice).to.equal(selectedProductPrice);
      });
    });
    cy.get('div[data-testid="shopping-cart-product-quantity"]').first().should('contain', `Total: ${productQuantity}`);
    cy.get('button[data-testid="paginaInicial"]').should('be.visible').and('contain', 'Página Inicial');
  });

  it('Deve incrementar e remover produtos a lista corretamente', () => {
    let selectedProductName = '';
    let selectedProductPrice = '';
    let initialQuantity = 1;
    let incrementCount = 2;
    let decrementCount = 1;

    cy.contains('h4', 'Produtos').should('be.visible');

    cy.get('.card').first().within(() => {
      cy.get('h5.card-title').invoke('text').then((productName) => {
        selectedProductName = '' || productName.trim();
      });
      cy.get('h6.card-subtitle.mb-2.text-muted').last().invoke('text').then((productPrice) => {
        selectedProductPrice = parseFloat(productPrice.trim().replace('$ ', ''));
      });
      cy.get('[data-testid="adicionarNaLista"]').click();
    });

    cy.contains('h1', 'Lista de Compras').should('be.visible');
    cy.get('div[data-testid="shopping-cart-product-name"]').first().should('contain', selectedProductName);

    for (let i = 0; i < incrementCount; i++) {
      cy.get('[data-testid="product-increase-quantity"]').first().click();
    }

    cy.get('div[data-testid="shopping-cart-product-quantity"]').first().should('contain', `Total: ${initialQuantity + incrementCount}`);

    for (let i = 0; i < decrementCount; i++) {
      cy.get('[data-testid="product-decrease-quantity"]').first().click();
    }

    let expectedQuantity = initialQuantity + incrementCount - decrementCount;
    cy.get('div[data-testid="shopping-cart-product-quantity"]').first().should('contain', `Total: ${expectedQuantity}`);

    cy.get('div[data-testid="shopping-cart-product-name"]').first().parent().within(() => {
      cy.get('p').first().invoke('text').then((cartProductPrice) => {
        const cartPrice = parseFloat(cartProductPrice.trim().replace('Preço R$', ''));
        expect(cartPrice).to.equal(selectedProductPrice * expectedQuantity);
      });
    });

    cy.get('button[data-testid="paginaInicial"]').should('be.visible').and('contain', 'Página Inicial');
  });

  it('Deve impedir decremento abaixo de 1 unidade e desabilitar botão', () => {
    cy.get('[data-testid="adicionarNaLista"]').first().click();
    cy.get('[data-testid="product-decrease-quantity"]').should('be.disabled');
  });
});
