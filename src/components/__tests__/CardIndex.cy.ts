import CardIndex from 'src/components/molecules/CardIndex.vue';
import { mount } from 'cypress/vue';

describe('CardIndex.vue', () => {
  const mockCard = {
    src: 'fruits/banana.png',
    alt: 'Banana',
  };

  it('vira para cima ao clicar', () => {
    mount(CardIndex, {
      props: {
        card: mockCard,
        index: 0,
        flippedExternally: false,
        locked: false,
      },
    });

    cy.get('.card-container').should('have.class', 'flip-down');

    cy.get('.card-container').click();
    cy.get('.card-container').should('have.class', 'flip-up');
  });
});
