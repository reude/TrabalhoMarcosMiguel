describe('Sistema E-commerce - Fluxos Críticos', () => {
  const BASE_URL = 'http://localhost:3000';

  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('CT-01: Cadastro de Usuário com Sucesso', () => {
    cy.visit(`${BASE_URL}/cadastro`);
    cy.get('#signup-email').type('aluno@teste.com');
    cy.get('#signup-password').type('Senha123');
    cy.get('#signup-confirm-password').type('Senha123');
    cy.get('#signup-submit').click();
    cy.url().should('include', '/login');
  });

  it('CT-02: Validação de Senhas Diferentes', () => {
    cy.visit(`${BASE_URL}/cadastro`);
    cy.get('#signup-email').type('erro@teste.com');
    cy.get('#signup-password').type('123');
    cy.get('#signup-confirm-password').type('456');
    cy.get('#signup-submit').click();
    cy.contains('As senhas não coincidem').should('be.visible');
  });

  it('CT-03: Bloqueio de Email Duplicado', () => {
    cy.window().then((win) => {
      const users = [{ email: 'existente@teste.com', password: '123' }];
      win.localStorage.setItem('users', JSON.stringify(users));
    });
    cy.visit(`${BASE_URL}/cadastro`);
    cy.get('#signup-email').type('existente@teste.com');
    cy.get('#signup-password').type('123');
    cy.get('#signup-confirm-password').type('123');
    cy.get('#signup-submit').click();
    cy.contains('Este email já está cadastrado').should('be.visible');
  });

  it('CT-04: Login com Credenciais Inválidas', () => {
    cy.visit(`${BASE_URL}/login`);
    cy.get('#username').type('naoexiste@teste.com'); 
    cy.get('#password').type('123456');
    cy.get('#login-submit').click();
    cy.contains('Email ou senha incorretos').should('be.visible');
  });

  it('CT-05: Fluxo de Carrinho e Compra (Escopo Completo)', () => {
    cy.window().then((win) => {
      const users = [{ email: 'cliente@teste.com', password: '123' }];
      win.localStorage.setItem('users', JSON.stringify(users));
      win.localStorage.setItem('isLoggedIn', 'true');
      win.localStorage.setItem('currentUser', 'cliente@teste.com');
    });

    cy.visit(BASE_URL);
    
    cy.get('main button').first().click();
    cy.get('#cart-count').should('contain', '1');

    cy.get('header .lucide-shopping-cart').closest('button').click();
    cy.get('[data-testid^="remove-item-"]').first().click();
    cy.contains('Seu carrinho está vazio').should('be.visible');
    
    cy.get('.lucide-x').closest('button').click();
    cy.contains('Seu Carrinho').should('not.exist');

    cy.wait(500);
    cy.get('main button').first().click();
    
    cy.get('header .lucide-shopping-cart').closest('button').click();
    cy.get('#checkout-btn').click();

    cy.get('#order-success-msg').should('be.visible');
    
    cy.contains('button', 'Fechar').click();
    
    cy.wait(500);
    cy.get('header .lucide-shopping-cart').closest('button').click();
    
    cy.contains('Seu carrinho está vazio').should('be.visible');
  });

  it('CT-06: Funcionalidade de Busca de Produtos', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('isLoggedIn', 'true');
    });
    cy.visit(BASE_URL);

    cy.get('#search-input').type('Smartphone');
    cy.get('#search-btn').click();

    cy.contains('Smartphone Pro X').should('be.visible');
    cy.contains('Laptop Ultra').should('not.exist');
  });

  it('CT-07: Persistência do Carrinho ao Recarregar Página', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('isLoggedIn', 'true');
    });
    cy.visit(BASE_URL);

    cy.get('main button').first().click();
    cy.get('#cart-count').should('contain', '1');

    cy.reload();

    cy.get('#cart-count').should('contain', '1');
  });
});