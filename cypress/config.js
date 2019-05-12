export const getTestConfig = () => {
  const testUser = Cypress.env("testUser");
  const testUserMail = Cypress.env("testUserMail");
  const testPwd = Cypress.env("testPwd");
  return { testUser, testUserMail, testPwd };
};

export const getChangePwdConfig = () => {
  const changePwdUserMail = Cypress.env("changePwdUserMail");
  const changePwdPwd = Cypress.env("changePwdPwd");
  const newPwd = Cypress.env("newPwd");
  return { changePwdUserMail, changePwdPwd, newPwd };
};
