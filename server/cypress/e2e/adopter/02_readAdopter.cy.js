describe("Adopter Operations - Read", () => {
    before(() => {
        // Carrega as fixtures
        cy.fixture("adopter").as("adopterData");

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

    it("should read adopter", () => {
        cy.getLocalStorage("user")
            .should("exist")
            .then((token) => {
                // Verifica os dados do usuário na UI
                cy.contains(`Olá, ${token.firstName}`);
                cy.contains("Meus dados");
            });
    });

    after(() => {
        // Deleta o adotante
        cy.getLocalStorage("user").then((authToken) => {
            cy.deleteAdopter(authToken);
            cy.destroyLocalStorage("user");
        });
    });
});
