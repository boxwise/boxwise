import "jest-enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

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
  firebase.auth().autoFlush(true);
  firebase.firestore().autoFlush(true);
  return firebase;
});
