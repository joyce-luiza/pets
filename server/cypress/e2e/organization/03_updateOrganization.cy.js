describe("Organization Operations - Update", () => {
    before(() => {
        // Carrega as fixtures
        cy.fixture("organization").as("organizationData");
        cy.fixture("updatedOrganization").as("updatedOrganization");

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

    it("should update organization", () => {
        // Aguarda o token estar disponível
        cy.getLocalStorage("user")
            .should("exist")
            .then((token) => {
                // Verifica os dados do usuário na UI
                cy.contains(`Olá, ${token.firstName}`);
                cy.contains("Meus dados");

                cy.get("[data-cy=profile-sidebar-organization]").click();
                cy.get("[data-cy=update-organization-button]").click();

                // Atualiza as informações da organização
                cy.contains("Editar organização");
                cy.contains("Informações gerais");
                cy.contains("Endereço");
                // Recupera os dados atualizados da organização
                cy.get("@updatedOrganization").then((updatedOrganization) => {
                    const info = updatedOrganization.organization;
                    const address = updatedOrganization.address;

                    // Atualiza as informações da organização
                    cy.get('[data-cy="organization-name"]')
                        .clear()
                        .type(info.name);
                    cy.get("[data-cy=organization-cnpj]")
                        .clear()
                        .type(info.cnpj);
                    cy.get("[data-cy=organization-email]")
                        .clear()
                        .type(info.email);
                    cy.get("[data-cy=organization-phone-number]")
                        .clear()
                        .type(info.phoneNumber);
                    cy.get("[data-cy=organization-description]")
                        .clear()
                        .type(info.description);
                    // Clica no botão que atualiza as informações
                    cy.get(
                        "[data-cy=submit-update-organization-info-button]"
                    ).click();
                    // Verifica se a mensagem de sucesso foi exibida
                    cy.contains("Organização editada com sucesso!").should(
                        "be.visible"
                    );
                    cy.contains("Organização editada com sucesso!").should(
                        "not.exist"
                    );

                    // Atualiza o endereço da organização
                    cy.get("[data-cy=tab-organization-address]").click();
                    cy.get("[data-cy=organization-cep]")
                        .clear()
                        .type(address.cep);
                    cy.wait(1000);
                    cy.get("[data-cy=organization-number]")
                        .clear()
                        .type(address.number);
                    // Clica no botão que atualiza o endereço
                    cy.get(
                        "[data-cy=submit-update-organization-address-button]"
                    ).click();
                    // Verifica se a mensagem de sucesso foi exibida
                    cy.contains("Endereço editado com sucesso!").should(
                        "be.visible"
                    );
                    cy.contains("Endereço editado com sucesso!").should(
                        "not.exist"
                    );
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
