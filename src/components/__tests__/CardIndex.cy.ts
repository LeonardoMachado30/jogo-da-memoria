// cypress/component/CardIndex.cy.ts
import CardIndex from 'src/components/molecules/CardIndex.vue';
import { mount } from 'cypress/vue';

describe('CardIndex.vue', () => {
  const mockCard = {
    src: 'fruits/banana.png',
    alt: 'Banana',
  };

  beforeEach(() => {
    cy.clock(); // congela o tempo para controlar animações
  });

  it('vira para cima ao clicar, respeitando a animação', () => {
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

    cy.tick(600); // tempo da transição CSS

    cy.get('.card-container').should('have.class', 'flip-up');
  });

  it('emite evento flip com index e alt ao clicar', () => {
    mount(CardIndex, {
      props: {
        card: mockCard,
        index: 1,
        flippedExternally: false,
        locked: false,
        onFlip: cy.spy().as('flipSpy'),
      },
    });

    cy.get('.card-container').click();
    cy.tick(600);

    cy.get('@flipSpy').should('have.been.calledWith', {
      index: 1,
      alt: 'Banana',
    });
  });

  it('não vira se estiver locked', () => {
    mount(CardIndex, {
      props: {
        card: mockCard,
        index: 0,
        flippedExternally: false,
        locked: true,
      },
    });

    cy.get('.card-container').should('have.class', 'flip-down');
    cy.get('.card-container').click();

    cy.tick(600);

    cy.get('.card-container').should('have.class', 'flip-down');
  });

  it('vira automaticamente se flippedExternally for true', () => {
    mount(CardIndex, {
      props: {
        card: mockCard,
        index: 0,
        flippedExternally: true,
        locked: false,
      },
    });

    cy.tick(600);

    cy.get('.card-container').should('have.class', 'flip-up');
  });

  it('volta para baixo se flippedExternally mudar para false', () => {
    cy.mount(CardIndex, {
      props: {
        card: mockCard,
        index: 0,
        flippedExternally: true,
        locked: false,
      },
    }).then(({ wrapper }) => {
      // Cypress vai ficar tentando até encontrar flip-up
      cy.get('.card-container').should('have.class', 'flip-up');

      // troca a prop
      wrapper.setProps({ flippedExternally: false });
      cy.get('.card-container').should('have.class', 'flip-down');
    });
  });
});
