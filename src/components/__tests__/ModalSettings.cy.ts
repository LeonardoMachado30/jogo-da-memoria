// cypress/component/ConfigModal.cy.ts
import ModalSettings from 'src/components/organisms/ModalSettings.vue'; // ajuste o caminho conforme seu projeto
import { mount } from 'cypress/vue';
import { Quasar } from 'quasar';
import ModalDefault from 'src/components/organisms/ModalDefault.vue';

describe('ModalSettings.vue', () => {
  it('renderiza o modal com botões de volume e tema', () => {
    mount(ModalSettings, {
      global: {
        plugins: [Quasar],
        components: { ModalDefault },
      },
      props: {
        modelValue: true,
      },
    });

    cy.contains('Configuraçõoes').should('exist');

    cy.get('.q-btn').should('have.length', 2);
  });
});
