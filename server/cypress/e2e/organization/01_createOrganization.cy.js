describe("Organization Operations - Create", () => {
    before(() => {
        // Carrega as fixtures e define os aliases
        cy.fixture("organization").as("organizationData");

        Cypress.Promise.all([cy.get("@organizationData")]).then(
            ([organizationData]) => {
                // Verifica se a organização existe
                cy.checkOrganizationExistence(
                    organizationData.organization.cnpj
                ).then((exists) => {
                    if (exists) {
                        // Realiza login para obter o token de autenticação
                        cy.login(
                            organizationData.organizationMember.email,
                            organizationData.organizationMember.password,
                            organizationData.organizationMember.type
                        ).then((token) => {
                            // Deleta a organização
                            cy.deleteOrganization(token);
                            cy.destroyLocalStorage("user");
                        });
                    }
                });
            }
        );
    });

    it("should create a new organization", () => {
        // Vai para a home
        cy.visit("/");
        // Clica no botão "Criar conta"
        cy.get('[data-cy="create-account-button"]').click();
        cy.url().should("include", "/register");
        // Escolhe o tipo de conta de organização
        cy.contains("Criar conta");
        cy.get('[data-cy="organization-account-option"]').click();
        // Preenche o formulário de administrador
        cy.contains("Administrador");
        cy.get("@organizationData").then((organizationData) => {
            const member = organizationData.organizationMember;

            cy.get('[data-cy="admin-fullname"]').type(
                `${member.firstName} ${member.lastName}`
            );
            cy.get('[data-cy="admin-email"]').type(member.email);
            cy.get('[data-cy="admin-phone-number"]').type(member.phoneNumber);
            cy.get('[data-cy="admin-birth-date"]').type(member.birthDate);
            cy.get('[data-cy="admin-password"]').type(member.password);
        });
        cy.get('[data-cy="next-step-button"]').click();
        // Preenche o formulário de informações sobre a organização
        cy.contains("Informações gerais");
        cy.get("@organizationData").then((organizationData) => {
            const info = organizationData.organization;

            cy.get('[data-cy="organization-name"]').type(info.name);
            cy.get('[data-cy="organization-cnpj"]').type(info.cnpj);
            cy.get('[data-cy="organization-email"]').type(info.email);
            cy.get('[data-cy="organization-phone-number"]').type(
                info.phoneNumber
            );
            cy.get('[data-cy="organization-description"]').type(
                info.description
            );
            // Clica no botão de próximo passo
            cy.get('[data-cy="next-step-button"]').click();
        });
        // Preenche o formulário de endereço da organização
        cy.contains("Endereço");
        cy.get("@organizationData").then((organizationData) => {
            const address = organizationData.address;
            cy.get('[data-cy="organization-cep"]').type(address.cep);
            cy.wait(1000);
            cy.get('[data-cy="organization-number"]').type(address.number);
            // Clica no botão de próximo passo
            cy.get('[data-cy="next-step-button"]').click();
        });

        // Preenche o formulário de instalações da organização
        cy.contains("Instalações");
        cy.get("@organizationData").then((organizationData) => {
            const installations = organizationData.installations;
            cy.get('[data-cy="organization-dog-qty"]').type(
                installations.dogQty
            );
            cy.get('[data-cy="organization-operating-days"]')
                .get(".ant-checkbox-input")
                .check(installations.operatingDays);
            cy.get('[data-cy="organization-opening-time"]')
                .click()
                .type(installations.openingTime);
            cy.get(".ant-picker-ok button").eq(0).click();

            cy.get('[data-cy="organization-closing-time"]')
                .click()
                .type(installations.closingTime);
            cy.get(".ant-picker-ok button").eq(1).click();
            // Clica no botão de próximo passo
            cy.get('[data-cy="next-step-button"]').click();
        });
        // Preenche o formulário de emails a serem convidados
        cy.get("@organizationData").then((organizationData) => {
            const invites = organizationData.invites;
            cy.get('[data-cy="add-email-button"]').click();
            cy.get('[data-cy="organization-invite-0"]').type(invites[0]);
            cy.get('[data-cy="organization-invite-1"]').type(invites[1]);
            // Clica no botão que finaliza o formulário
            cy.get('[data-cy="submit-button"]').click();
        });
        // Verifica a página de perfil da organização
        cy.contains("ONG Acolhendo Bichinhos");
        cy.contains("Dashboard");
        // Verifica dados básicos da organização
        cy.get("@organizationData").then((organizationData) => {
            const info = organizationData.organization;
            cy.get("[data-cy=profile-sidebar-organization]").click();
            cy.contains(info.name);
            cy.contains(info.cnpj);
        });
    });

    after(() => {
        cy.getLocalStorage("user").then((authToken) => {
            cy.deleteOrganization(authToken);
            cy.destroyLocalStorage("user");
        });
    });
});
