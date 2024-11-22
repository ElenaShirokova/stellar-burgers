describe('Проверка работы страницы конструктора', function() {
    beforeEach(function() {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
        cy.viewport(1300, 800);
        cy.visit('http://localhost:4000/');
    })
    it('Тест добавления булки', function () {
        cy.get('[data-cy=constructor-bun-1]').contains('Ингредиент-1').should('not.exist');
        cy.get('[data-cy=constructor-bun-2]').contains('Ингредиент_1').should('not.exist');
        cy.get('[data-cy=bun-ingredients]').contains('Добавить').click({force : true});
        cy.get('[data-cy=constructor-bun-1]').contains('Ингредиент_1').should('exist');
        cy.get('[data-cy=constructor-bun-2]').contains('Ингредиент_1').should('exist');
    });
    it('Тест добавления ингредиентов', function () {
        cy.get('[data-cy=constructor-ingredients]').contains('Ингредиент_2').should('not.exist');
        cy.get('[data-cy=constructor-ingredients]').contains('Ингредиент_4').should('not.exist');
        cy.get('[data-cy=filling-ingredients]').contains('Добавить').click({force : true});
        cy.get('[data-cy=souce-ingredients]').contains('Добавить').click({force : true});
        cy.get('[data-cy=constructor-ingredients]').contains('Ингредиент_2').should('exist');
        cy.get('[data-cy=constructor-ingredients]').contains('Ингридиент_4').should('exist');
    });
});