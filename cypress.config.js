const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    HOST: 'http://192.168.0.100:3000/',
    ADMIN_ACCESS_TOKEN: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMjA3ZGE5Ny0wN2MyLTRmMmUtYmRjZC0xZDc3MWQzZTY0ZjEiLCJyb2xlcyI6WyJTVVBFUl9BRE1JTiJdLCJuYW1lIjoibHRxdWFuMjFAY2xjLmZpdHVzLmVkdS52biIsImVtYWlsYWRkcmVzcyI6Imx0cXVhbjIxQGNsYy5maXR1cy5lZHUudm4iLCJuYW1laWRlbnRpZmllciI6Imx0cXVhbjIxQGNsYy5maXR1cy5lZHUudm4iLCJpc3MiOiJNZW50b3JVUy1sb2NhbCIsImlhdCI6MTcyMjg3Mzg4MCwiZXhwIjoxNzIyOTYwMjgwfQ.aluGdUxZdcf5oy1aWrUcN20VgJILBAXE9t6ARtcq7sSzQMvGF1qet0VfE4-kVkmqgSj8xbt55eyvVGhcYVSPHQ',
    USER_ACCESS_TOKEN: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNzRhNTk1Yy05NTdkLTQ3MDYtOWU2MC1hYjhhYjRmYjAzM2UiLCJyb2xlcyI6WyJVU0VSIl0sIm5hbWUiOiJsYWN2dW9uZy50cmluaEBnbWFpbC5jb20iLCJlbWFpbGFkZHJlc3MiOiJsYWN2dW9uZy50cmluaEBnbWFpbC5jb20iLCJuYW1laWRlbnRpZmllciI6ImxhY3Z1b25nLnRyaW5oQGdtYWlsLmNvbSIsImlzcyI6Ik1lbnRvclVTLWxvY2FsIiwiaWF0IjoxNzIzNDc0ODkxLCJleHAiOjE3MjM1NjEyOTF9.So66ymKzm1UwfdU6tYU7mZyh9dTZ-XhUoypW-X1TTTyoSgst8pVXKlN0EPSxMedQsIG_u9x9fg7VOGQy_BWaVw'
  },
});