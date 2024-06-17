Cypress.Commands.add("login", (email, password, accountType) => {
    return cy
        .request({
            method: "POST",
            url: `${Cypress.env("apiUrl")}/auth/login`,
            body: {
                email: email,
                password: password,
                type: accountType,
            },
        })
        .then((response) => {
            return response.body;
        });
});

Cypress.Commands.add("setLocalStorage", (key, value) => {
    cy.window().then((win) => {
        win.localStorage.setItem(key, JSON.stringify(value));
    });
});

Cypress.Commands.add("getLocalStorage", (key) => {
    return cy.window().then((win) => {
        return JSON.parse(win.localStorage.getItem(key));
    });
});

Cypress.Commands.add("destroyLocalStorage", (key) => {
    cy.window().then((win) => {
        win.localStorage.removeItem(key);
    });
});

Cypress.Commands.add("checkOrganizationExistence", (cnpj) => {
    return cy
        .request({
            method: "GET",
            url: `${Cypress.env(
                "apiUrl"
            )}/organization/cnpj/${encodeURIComponent(cnpj)}`,
            failOnStatusCode: false,
        })
        .then((response) => {
            if (response.status === 200) {
                return false;
            } else if (response.status === 400) {
                return true;
            }
        });
});

Cypress.Commands.add("createOrganization", (organization) => {
    return cy
        .request({
            method: "POST",
            url: `${Cypress.env("apiUrl")}/organization/`,
            body: organization,
        })
        .then((response) => response.body);
});

Cypress.Commands.add("deleteOrganization", (authToken) => {
    if (!authToken.organizationId) {
        throw new Error(
            "ID da organização não encontrado no token de autenticação."
        );
    }

    cy.request({
        method: "DELETE",
        url: `${Cypress.env("apiUrl")}/organization/${
            authToken.organizationId
        }`,
        headers: {
            Authorization: `Bearer ${authToken.token}`,
        },
    }).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200);
    });
});

Cypress.Commands.add("checkAdopterExistence", (email) => {
    return cy
        .request({
            method: "GET",
            url: `${Cypress.env("apiUrl")}/adopter/email/${encodeURIComponent(
                email
            )}`,
            failOnStatusCode: false,
        })
        .then((response) => {
            if (response.status === 200) {
                return false;
            } else if (response.status === 400) {
                return true;
            }
        });
});

Cypress.Commands.add("createAdopter", (adopter) => {
    return cy
        .request({
            method: "POST",
            url: `${Cypress.env("apiUrl")}/adopter/`,
            body: adopter,
        })
        .then((response) => response.body);
});

Cypress.Commands.add("deleteAdopter", (authToken) => {
    if (!authToken.id) {
        throw new Error(
            "ID do adotante não encontrado no token de autenticação."
        );
    }
    cy.request({
        method: "DELETE",
        url: `${Cypress.env("apiUrl")}/adopter/${authToken.id}`,
        headers: {
            Authorization: `Bearer ${authToken.token}`,
        },
    }).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200);
    });
});
