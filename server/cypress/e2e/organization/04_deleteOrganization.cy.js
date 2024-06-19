before(() => {
    // Carrega as fixtures e define os aliases
    cy.fixture("organization").as("organizationData");

    Cypress.Promise.all([cy.get("@organizationData")]).then(
        ([organizationData]) => {
            // Verifica se a organização existe
            cy.checkOrganizationExistence(organizationData.organization.cnpj)
                .then((exists) => {
                    if (!exists) {
                        // Cria a organização
                        return cy.createOrganization(organizationData);
                    }
                })
                .then(() => {
                    // Realiza login para obter o token de autenticação
                    cy.login(
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

describe("Organization Operations - Delete", () => {
    it("should delete organization", () => {
        cy.getLocalStorage("user")
            .should("exist")
            .then(() => {
                cy.get("[data-cy=profile-sidebar-organization]").click();

                cy.get('[data-cy="delete-organization-button"]').click();
                cy.contains("Deletar organização?");
                cy.get("@organizationData").then((organizationData) => {
                    const info = organizationData.organization;
                    cy.get('[data-cy="confirm-organization-name"]').type(
                        info.name
                    );
                });
                cy.get('[data-cy="modal-submit-button"]').click();
                cy.url().should("include", "/");
                cy.contains("Encontre seu novo melhor amigo");
            });
    });

    after(() => {
        // Verifica se a organização foi deletada
        cy.get("@organizationData").then((organizationData) => {
            const info = organizationData.organization;
            if (!cy.checkOrganizationExistence(info.cnpj)) {
                return true;
            }
        });
    });
});
