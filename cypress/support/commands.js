// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("adminLogin", () => {
  const accessToken = Cypress.env("ADMIN_ACCESS_TOKEN");
  window.localStorage.setItem("access_token", accessToken);
});

Cypress.Commands.add("userLogin", () => {
  const accessToken = Cypress.env("USER_ACCESS_TOKEN");
  window.localStorage.setItem("access_token", accessToken);
});

Cypress.Commands.add(
  "loginWithGoogle",
  (
    username = Cypress.env("adminUsername"),
    password = Cypress.env("adminPwd")
  ) => {
    cy.session(`gg-${username}`, () => {
      const log = Cypress.log({
        displayName: "Google Login",
        message: [`🔐 Authenticating | ${username}`],
        autoEnd: false,
      });
      log.snapshot("before");

      logIntoGoogle(username, password);

      log.snapshot("after");
      log.end();
    });
  }
);

const logIntoGoogle = (username, password) => {
  Cypress.on(
    "uncaught:exception",
    (err) =>
      !err.message.includes("ResizeObserver loop") &&
      !err.message.includes("Error in protected function")
  );
  cy.visit("http://192.168.0.100:3000/");
  //   cy.get("div:nth-of-type(2) > a").click();

  cy.contains("span", "menu").parent().click();
  cy.contains("a", "Đăng nhập").click();

  cy.contains("Đăng nhập bằng Google").click();

  cy.origin(
    "https://accounts.google.com",
    {
      args: {
        username,
        password,
      },
    },
    ({ username, password }) => {
      Cypress.on(
        "uncaught:exception",
        (err) =>
          !err.message.includes("ResizeObserver loop") &&
          !err.message.includes("Error in protected function")
      );

      cy.get('input[type="email"]').type(username, {
        log: false,
      });
      // NOTE: The element exists on the original form but is hidden and gets rerendered, which leads to intermittent detached DOM issues
      cy.get("#identifierNext").should("be.visible");
      cy.get("#identifierNext").click();
      cy.get('input[type="password"]').should("be.visible");
      cy.get('input[type="password"]').first().type(password, {
        log: false,
      });
      cy.get("#passwordNext").click();
    }
  );
};

Cypress.Commands.add("getDateString", (k = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + k);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
});

Cypress.Commands.add("getTimeString", (h = 0, m = 0) => {
  const date = new Date();
  date.setHours(date.getHours() + h, date.getMinutes() + m);

  const hour = date.getHours();
  const minute = String(date.getMinutes()).padStart(2, "0");
  const ampm = hour >= 12 ? "PM" : "AM";

  cy.log(`${Math.max(hour, hour - 12)}:${minute} ${ampm}`);

  return `${Math.max(hour, hour - 12)}:${minute} ${ampm}`;
});
