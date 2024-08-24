const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  numTestsKeptInMemory: 0,
  env: {
    HOST: 'http://192.168.0.105:3000/',
    CURRENT_USER: 'Harry Potter',
    ADMIN_ACCESS_TOKEN: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMjA3ZGE5Ny0wN2MyLTRmMmUtYmRjZC0xZDc3MWQzZTY0ZjEiLCJyb2xlcyI6WyJTVVBFUl9BRE1JTiJdLCJuYW1lIjoibHRxdWFuMjFAY2xjLmZpdHVzLmVkdS52biIsImVtYWlsYWRkcmVzcyI6Imx0cXVhbjIxQGNsYy5maXR1cy5lZHUudm4iLCJuYW1laWRlbnRpZmllciI6Imx0cXVhbjIxQGNsYy5maXR1cy5lZHUudm4iLCJpc3MiOiJNZW50b3JVUy1sb2NhbCIsImlhdCI6MTcyMzgyMjEwOSwiZXhwIjoxNzIzOTA4NTA5fQ.8XJOEPb2LBKRT4AcknCzMBGfcvt37_9Shs-vJvyEpV_f50QHADj1EjtVJ5U153JLBEkrqxRdd3-BfvIUF_50MA',
    USER_ACCESS_TOKEN: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNzRhNTk1Yy05NTdkLTQ3MDYtOWU2MC1hYjhhYjRmYjAzM2UiLCJyb2xlcyI6WyJVU0VSIl0sIm5hbWUiOiJsYWN2dW9uZy50cmluaEBnbWFpbC5jb20iLCJlbWFpbGFkZHJlc3MiOiJsYWN2dW9uZy50cmluaEBnbWFpbC5jb20iLCJuYW1laWRlbnRpZmllciI6ImxhY3Z1b25nLnRyaW5oQGdtYWlsLmNvbSIsImlzcyI6Ik1lbnRvclVTLWxvY2FsIiwiaWF0IjoxNzIzODY1MjE5LCJleHAiOjE3MjM5NTE2MTl9.riC0fxUL-DW5rEsH7p_9uVOaHZc4wR9yaYtiPIOn68GSnYJEWCem0H8P7iWpBADeC2PusTXp3WdYNAh2PJF-wQ'
  },
});