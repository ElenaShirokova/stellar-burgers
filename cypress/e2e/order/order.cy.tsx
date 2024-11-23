describe('Проверка оформления заказа', function () {
    beforeEach(function() {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
        cy.intercept('GET', '/api/auth/user', {fixture: 'userData.json'});
        cy.intercept('POST', '/api/orders', {fixture: 'sucessOrder.json'});

        window.localStorage.setItem(
            'refreshToken',
            JSON.stringify('test-refreshToken')
        );
        cy.setCookie('accessToken', 'test-accessToken');
        cy.viewport(1300, 800);
        cy.visit('http://localhost:4000/');
    });

    afterEach(function () {
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('Тест создания заказа', function() {
        cy.get('[data-cy=bun-ingredients]').contains('Добавить').click({force : true});
        cy.get('[data-cy=filling-ingredients]').contains('Добавить').click({force : true});
        cy.get('[data-cy=souce-ingredients]').contains('Добавить').click({force : true});

        cy.get('[data-cy=button-order]').contains('Оформить заказ').should('exist').click({force : true});

        cy.get('[data-cy=order-number]').contains('2128506').should('exist');

        cy.get('[data-cy=button-close]').click();
        cy.get('[data-cy=modal]').should('not.exist');

        cy.get('[data-cy=burger-constructor]').should('not.contain', 'Ингридиент_1');
        cy.get('[data-cy=constructor-ingredients]').should('not.contain', 'Ингридиент_4');
        cy.get('[data-cy=constructor-ingredients]').should('not.contain', 'Ингридиент_2');
    });
});
