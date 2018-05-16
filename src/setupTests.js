jest.mock("./firebase", () => {
  const firebasemock = require("firebase-mock");

  const mockauth = new firebasemock.MockAuthentication();
  const mockfirestore = new firebasemock.MockFirestore();

  const mocksdk = firebasemock.MockFirebaseSdk(
    null,
    () => {
      return mockauth;
    },
    () => {
      return mockfirestore;
    }
  );
  const firebase = mocksdk.initializeApp();
  return firebase;
});
