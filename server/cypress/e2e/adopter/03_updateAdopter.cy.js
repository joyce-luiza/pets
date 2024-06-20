describe("Adopter Operations - Update", () => {
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
    it("should update adopter", () => {
        cy.getLocalStorage("user")
            .should("exist")
            .then((token) => {
                // Verifica os dados do usuário na UI
                cy.contains(`Olá, ${token.firstName}`);
                cy.contains("Meus dados");
            });

        cy.get("@updatedAdopter").then((updatedAdopter) => {
            const adopter = updatedAdopter.adopter;
            cy.get('[data-cy="adopter-fullname"]')
                .clear()
                .type(`${adopter.firstName} ${adopter.lastName}`);
            cy.get('[data-cy="adopter-email"]').clear().type(adopter.email);
            cy.get('[data-cy="adopter-phone-number"]')
                .clear()
                .type(adopter.phoneNumber);
            cy.get('[data-cy="adopter-birth-date"]')
                .clear()
                .type(adopter.birthDate);
        });
        cy.get('[data-cy="update-adopter-button"]').click();
        cy.contains("Dados editados com sucesso!");
    });

    after(() => {
        // Deleta o adotante
        cy.getLocalStorage("user").then((authToken) => {
            cy.deleteAdopter(authToken);
            cy.destroyLocalStorage("user");
        });
    });
});
