/* eslint-disable import/prefer-default-export */

export const getTestConfig = () => {
  const testUser = Cypress.env("testUser");
  const testUserMail = Cypress.env("testUserMail");
  const testPwd = Cypress.env("testPwd");
  const newPwd = Cypress.env("newPwd");
  return { testUser, testUserMail, testPwd, newPwd };
};
