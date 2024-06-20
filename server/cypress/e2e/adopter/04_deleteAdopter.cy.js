before(() => {
    // Carrega as fixtures
    cy.fixture("adopter").as("adopterData");
    cy.fixture("updatedAdopter").as("updatedAdopter");

    Cypress.Promise.all([cy.get("@adopterData")]).then(([adopterData]) => {
        let adopter = adopterData.adopter;
        // Verifica se o adotante já existe
        cy.checkAdopterExistence(adopter.email)
            .then((exists) => {
                if (!exists) {
                    // Cria o adotante
                    return cy.createAdopter(adopter);
                }
            })
            .then(() => {
                // Realiza o login do adotante
                return cy.login(adopter.email, adopter.password, "ADOPTER");
            })
            .then((response) => {
                // Define o token de autenticação no localStorage
                cy.setLocalStorage("user", response);
                cy.visit("/profile");
            });
    });
});

describe("Adopter Operations - Delete", () => {
    it("should delete adopter", () => {
        cy.getLocalStorage("user")
            .should("exist")
            .then((token) => {
                // Verifica os dados do usuário na UI
                cy.contains(`Olá, ${token.firstName}`);
                cy.contains("Meus dados");
            });

        cy.get('[data-cy="delete-adopter-button"]').click();
        cy.contains("Deletar conta?");

        cy.get("@adopterData").then((adopterData) => {
            const { adopter } = adopterData;
            cy.get("[data-cy=adopter-confirm-email]").type(adopter.email);
        });

        cy.get('[data-cy="modal-submit-button"]').click();
        cy.url().should("include", "/");
        cy.contains("Encontre seu novo melhor amigo");
        cy.wait(1000);
        cy.getLocalStorage("user").then((token) => {
            expect(token).to.be.empty;
        });
    });

    after(() => {
        // Verifica se o adotante foi deletado
        cy.get("@adopterData").then((adopterData) => {
            const { adopter } = adopterData;
            cy.checkAdopterExistence(adopter.email).then((exists) => {
                if (exists) {
                    throw new Error("Não foi possível deletar o adotante.");
                }
            });
        });
    });
});
