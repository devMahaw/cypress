/// <reference types="cypress" />

const info = (name, type) => {
    cy.get(`input[name='${name}']`).type(`${type}`);
};

describe("Testes para a página de candidatura", () => {
    beforeEach(() => {
        cy.visit("https://ebac-jobs-e2e.vercel.app/");
    });

    it("deve levar o usuário até o formulário de inscrição", () => {
        cy.get(".Vaga_vagaLink__DeFkk").first().click();
        cy.get("input").should("have.length", 7)
        cy.screenshot("tela-inscrição")
    });

    it("deve preencher o formulário de inscrição", () => {
        cy.get(".Vaga_vagaLink__DeFkk").first().click();
        info('nome-completo', 'Mahaw');
        info('email', 'mahaw@gmail.com');
        info('telefone', '11 12345678');
        info('endereco', 'rua jest, bairro cypress, são paulo SP');
        cy.get("#linux").check();
        cy.get("select[name='escolaridade']").select("outros");
        cy.get(".Aplicacao_button__tw2AE").click();
        cy.on("window:alert", (conteudo) => {
            expect(conteudo).contain("Obrigado pela candidatura!")
        })

        cy.screenshot("tela-inscrição-preenchido")
    })
});