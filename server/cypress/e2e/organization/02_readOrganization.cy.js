describe("Organization Operations - Read", () => {
    before(() => {
        // Carrega as fixtures
        cy.fixture("organization").as("organizationData");

        Cypress.Promise.all([cy.get("@organizationData")]).then(
            ([organizationData]) => {
                // Verifica se a organização existe
                cy.checkOrganizationExistence(
                    organizationData.organization.cnpj
                )
                    .then((exists) => {
                        if (!exists) {
                            // Cria a organização
                            return cy.createOrganization(organizationData);
                        }
                    })
                    .then(() => {
                        // Realiza o login do administrador
                        return cy.login(
                            organizationData.organizationMember.email,
                            organizationData.organizationMember.password,
                            "ORGANIZATION"
                        );
                    })
                    .then((response) => {
                        // Define o token de autenticação no localStorage
                        cy.setLocalStorage("user", response);
                        cy.visit("/profile");
                    });
            }
        );
    });

    it("should read organization", () => {
        cy.getLocalStorage("user")
            .should("exist")
            .then((token) => {
                // Verifica os dados do usuário na UI
                cy.contains(`Olá, ${token.firstName}`);
                cy.contains("Meus dados");
                // Verifica os dados da organização na UI
                cy.get("@organizationData").then((organizationData) => {
                    const info = organizationData.organization;
                    cy.get("[data-cy=profile-sidebar-organization]").click();
                    cy.contains(info.name);
                    cy.contains(info.cnpj);
                });
            });
    });

    after(() => {
        // Deleta a organização
        cy.getLocalStorage("user").then((authToken) => {
            cy.deleteOrganization(authToken);
            cy.destroyLocalStorage("user");
        });
    });
});
