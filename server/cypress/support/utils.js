export function login(email, password, accountType) {
    return new Cypress.Promise((resolve, reject) => {
        cy.visit("/")
            .get('[data-cy="login-button"]')
            .click()
            .get('[data-cy="login-account-type"]')
            .get(".ant-radio-input")
            .check(accountType)
            .get('[data-cy="login-email"]')
            .type(email)
            .get('[data-cy="login-password"]')
            .type(password)
            .get('[data-cy="do-login-button"]')
            .click()
            .window()
            .wait(1000)
            .then((win) => {
                const authToken = JSON.parse(win.localStorage.getItem("user"));
                if (authToken && authToken.token && authToken.id) {
                    resolve(authToken);
                } else {
                    reject("Não foi possível recuperar o token.");
                }
            });
    });
}
