import CardIndex from 'src/components/molecules/CardIndex.vue';
import { mount } from 'cypress/vue';

describe('CardIndex.vue', () => {
  const mockCard = {
    src: 'fruits/banana.png',
    alt: 'Banana',
  };

  beforeEach(() => {
    // Força o clock do Cypress para controlar o tempo das animações
    cy.clock();
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

    // Aguarda o tempo da animação CSS (~600ms) para garantir que a classe flip-up seja aplicada
    cy.tick(650);

    cy.get('.card-container').should('have.class', 'flip-up');
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

    // Aguarda o tempo da animação para garantir que não mudou
    cy.tick(650);

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

    // Aguarda o tempo da animação para garantir que a classe foi aplicada
    cy.tick(650);

    cy.get('.card-container').should('have.class', 'flip-up');
  });

  it('volta para baixo se flippedExternally mudar para false', () => {
    mount(CardIndex, {
      props: {
        card: mockCard,
        index: 0,
        flippedExternally: true,
        locked: false,
      },
    });

    cy.tick(650);
    cy.get('.card-container').should('have.class', 'flip-up');

    // Atualiza a prop flippedExternally para false
    cy.then(() => {
      Cypress.vueWrapper.setProps({ flippedExternally: false });
    });

    cy.tick(650);
    cy.get('.card-container').should('have.class', 'flip-down');
  });
});
