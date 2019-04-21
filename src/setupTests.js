// ATTN: setupTests.js is called by convention for the create-react-app
// https://facebook.github.io/create-react-app/docs/running-tests#initializing-test-environment
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "jest-enzyme";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("firebase/app", () => {
  const firebasemock = require("firebase-mock");
  const mockauth = new firebasemock.MockAuthentication();
  const mockfirestore = new firebasemock.MockFirestore();
  const mocksdk = new firebasemock.MockFirebaseSdk(
    null, // RTDB
    () => mockauth,
    () => mockfirestore
  );
  const firebase = mocksdk.initializeApp();
  firebase.auth().autoFlush(true);
  firebase.firestore().autoFlush(true);
  return firebase;
});
