describe('Проверка работы модального окна', function() {
    beforeEach(function() {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
        cy.viewport(1300, 800);
        cy.visit('http://localhost:4000/');
    })

    it('Тест открытия модального окна', function () {
        cy.get('[data-cy=modal]').should('not.exist');
        cy.get('[data-cy=bun-ingredients]').contains('Ингредиент_1').click({force : true});
        cy.get('[data-cy=modal]').contains('Ингредиент_1').should('exist');
    });

    it('Тест закрытия модального окна по кнопке', function () {
        cy.get('[data-cy=bun-ingredients]').contains('Ингредиент_1').click({force : true});
        cy.get('[data-cy=button-close]').click({force : true});
        cy.get('[data-cy=modal]').should('not.exist');
    });

    it('Тест закрытия модального окна по оверлею', function () {
        cy.get('[data-cy=bun-ingredients]').contains('Ингредиент_1').click({force : true});
        cy.get('[data-cy=modal]').should('exist');
        cy.get('[data-cy=modal-overlay]').click('topLeft', {force : true});
        cy.get('[data-cy=modal]').should('not.exist');
    });
});