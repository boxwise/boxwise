// ATTN: setupTests.js is called by convention for the create-react-app
// https://facebook.github.io/create-react-app/docs/running-tests#initializing-test-environment
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "jest-enzyme";
import firebaseMock from "firebase-mock";

Enzyme.configure({ adapter: new Adapter() });
// jest/jsdom throws a not implemented exception for this
// instead, we just stub it out
global.scrollTo = jest.fn();

jest.doMock("firebaseFactory", () => {
  const mockAuth = new firebaseMock.MockAuthentication();
  const mockFirestore = new firebaseMock.MockFirestore();
  const mockSdk = new firebaseMock.MockFirebaseSdk(
    null, // RTDB
    () => mockAuth,
    () => mockFirestore
  );
  const firebase = mockSdk.initializeApp();
  firebase.auth().autoFlush(true);
  firebase.firestore().autoFlush(true);
  return { db: firebase.firestore(), firebase };
});
