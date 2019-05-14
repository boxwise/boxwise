/* eslint-disable import/prefer-default-export */

export const getTestConfig = () => {
  const testUser = Cypress.env("testUser");
  const testUserMail = Cypress.env("testUserMail");
  const testPwd = Cypress.env("testPwd");
  return { testUser, testUserMail, testPwd };
};
