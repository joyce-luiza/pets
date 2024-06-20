describe("Adopter Operations - Create", () => {
    before(() => {
        // Carrega as fixtures
        cy.fixture("adopter").as("adopterData");

        Cypress.Promise.all([cy.get("@adopterData")]).then(([adopterData]) => {
            let adopter = adopterData.adopter;
            // Verifica se o adotante já existe
            cy.checkAdopterExistence(adopter.email).then((exists) => {
                if (exists) {
                    // Realiza o login
                    cy.login(adopter.email, adopter.password, "ADOPTER").then(
                        (token) => {
                            // Deleta o adotante
                            cy.deleteAdopter(token);
                            cy.destroyLocalStorage("user");
                        }
                    );
                }
            });
        });
    });

    it("should create a new adopter", () => {
        // Vai para a home
        cy.visit("/");
        // Clica no botão "Criar conta"
        cy.get('[data-cy="create-account-button"]').click();
        cy.url().should("include", "/register");
        // Escolhe o tipo de conta de adotante
        cy.contains("Criar conta");
        cy.get('[data-cy="adopter-account-option"]').click();
        // Preenche o formulário de adotante
        cy.get("@adopterData").then((adopterData) => {
            const adopter = adopterData.adopter;
            cy.get('[data-cy="adopter-fullname"]').type(
                `${adopter.firstName} ${adopter.lastName}`
            );
            cy.get('[data-cy="adopter-email"]').type(adopter.email);
            cy.get('[data-cy="adopter-phone-number"]').type(
                adopter.phoneNumber
            );
            cy.get('[data-cy="adopter-birth-date"]').type(adopter.birthDate);
            cy.get('[data-cy="adopter-password"]').type(adopter.password);
        });
        // Clica no botão "Criar conta"
        cy.get('[data-cy="create-adopter-account-button"]').click();
        // Clica no botão de responder perguntas complementares
        cy.contains("Queremos saber mais sobre você!");
        cy.url().should("include", "/user/complement");
        cy.get('[data-cy="answers-lifestyle-questions-button"]').click();
        // Preenche o formulário de endereço do adotante
        cy.contains("Conte-nos sobre você");
        cy.get("@adopterData").then((adopterData) => {
            const address = adopterData.address;
            cy.get('[data-cy="adopter-residence-type"]').click();
            cy.get(
                `[data-cy="adopter-residence-type-${address.residenceType}"]`
            ).click();
            cy.get('[data-cy="adopter-cep"]').type(address.cep);
            cy.wait(1000);
            cy.get('[data-cy="adopter-number"]').type(address.number);
        });
        cy.get('[data-cy="next-step-button"]').click();
        // Preenche o formulário de preferências do adotante
        cy.contains("Preferências");
        cy.get("@adopterData").then((adopterData) => {
            const preferences = adopterData.preferences;
            cy.get('[data-cy="adopter-animal-types"]')
                .find(".ant-checkbox-input")
                .check(preferences.animalTypes);
            cy.get('[data-cy="adopter-animal-age"]')
                .find(".ant-checkbox-input")
                .check(preferences.animalAgeGroups);
            cy.get('[data-cy="adopter-animal-sizes"]')
                .find(".ant-checkbox-input")
                .check(preferences.animalSizes);
            cy.get('[data-cy="adopter-animal-sex"]')
                .find(".ant-checkbox-input")
                .check(preferences.animalSexes);
            cy.get('[data-cy="adopter-animal-colors"]')
                .find(".ant-checkbox-input")
                .check(preferences.animalColors);
        });
        cy.get('[data-cy="next-step-button"]').click();
        // Preenche o formulário de estilo de vida do adotante
        cy.contains("Estilo de vida");
        cy.get("@adopterData").then((adopterData) => {
            const lifestyle = adopterData.lifestyle;
            cy.get('[data-cy="adopter-others-pets"]')
                .find(".ant-radio-input")
                .check(lifestyle.petsQuantity);
            cy.get('[data-cy="adopter-routine"]')
                .find(".ant-radio-input")
                .check(lifestyle.routine);
            cy.get('[data-cy="adopter-travel-frequency"]')
                .find(".ant-radio-input")
                .check(lifestyle.travelFrequency);
        });
        cy.get('[data-cy="finish-button"]').click();
        // Verifica a página de finalização do formulário
        cy.contains("Tudo pronto para o match perfeito!");
    });

    after(() => {
        // Deleta o adotante
        cy.getLocalStorage("user").then((authToken) => {
            cy.deleteAdopter(authToken);
            cy.destroyLocalStorage("user");
        });
    });
});
