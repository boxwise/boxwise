// GENERATE & IMPORT RANDOM 8000 BOXES AND 100 PRODUCTS INTO FIRESTORE

/*
Note: Import via UI worked for Firebase Realtime Database, but for firestore, the only way is to write own script

1) Upgrade your firebase plan to "pay as you go" Blaze plan (import isn't supported for free version)
  - https://firebase.google.com/pricing/

2) Set limit on amount you can get charged (https://firebase.google.com/docs/firestore/quotas#manage_spending)
   - I've imported cca 150k items and done looooot of reads and still didn't use more than what's free

3) Install Firebase Admin SDK: 'npm install firebase-admin'

4) Download Firebase Admin SDK private key
  4.1: navigate to In the Firebase Console click on the settings wheel next to the Overview section 
       and choose Service accounts tab -> select Node.js
  
  4.2: Copy-paste the code you see to the beginning of this script (replace the same looking code on lines 30-36)

  4.3: Click "Generate new private key" which downloads your key in JSON file. 
       Place this json file to same folder as this script

5) If you haven't done that yet, sign up into Boxwise (create organization and your user) and create one product
  
6) Set value of USER_EMAIL, PRODUCT_REFERENCE and ORGANIZATION_REFERENCE
   - there should be a way how to retrieve the already existing products but just copying reference
     from firestore UI was faster
*/

var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://boxwise-development-f603b.firebaseio.com"
});

 // email you used as a login for the user
let USER_EMAIL = "<FILL>"  
/* ID of organization document in the Firestore, if not sure which organization you should choose
this value is also shown in details of each user as organization reference - choose the one in your user */
let ORGANIZATION_REFERENCE = "<FILL>"
/*ID of product you've created with your user, find it in Firebase console in products collection
or in ChromeDevtools network tab while creating it */
let PRODUCT_REFERENCE = "<FILL>"

let categories = ["Man", "Woman", "Adult", "Boy", "Girl", "Child", "Baby", "Food", "Hygiene", "Other"]

admin.auth().listUsers(100)
    .then(function(listUsersResult) {
      let selectedUser = listUsersResult.users.filter(usr => usr.email.toLocaleLowerCase() == USER_EMAIL.toLocaleLowerCase())[0]

      for (var i = 0; i < 100; i++) {   
        //always create a new productItem object, otherwise all items are imported with the last generated random name    
        let productItem = {
          isDeleted: false,
          organization: admin.firestore().doc('organizations/' + ORGANIZATION_REFERENCE),
          createdBy: admin.firestore().doc('profiles/' + selectedUser.uid),
          createdAt: Date().toLocaleString()
        };

        productItem.category = categories[Math.floor(Math.random() * categories.length)];
        productItem.name = makeRandomName(10)

        admin.firestore().collection("products").add(productItem)
        console.log("product " + i)
      }

      for (var i = 0; i < 8000; i++) {   
        let boxItem = {
          organization: admin.firestore().doc('organizations/' + ORGANIZATION_REFERENCE),
          createdBy: admin.firestore().doc('profiles/' + selectedUser.uid),
          createdAt: Date().toLocaleString(),
          product: admin.firestore().doc('products/' + PRODUCT_REFERENCE),
        };

        boxItem.comment = makeRandomName(10)
        boxItem.quantity = Math.floor(Math.random() * 100)
        boxItem.humanID = Math.floor(Math.random() * 999999)

        // save once ready
        admin.firestore().collection("boxes").add(boxItem)
        console.log("box " + i)
      }
  })

function makeRandomName(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}


// THIS IMPORTS THE DATA FROM ANY JSON FILE
/*const data = require("./data.json");

data && Object.keys(data).forEach(key => {
    const nestedContent = data[key];

    if (typeof nestedContent === "object") {
        Object.keys(nestedContent).forEach(docTitle => {
            admin.firestore()
                .collection(key)
                .doc(docTitle)
                .set(nestedContent[docTitle])
                .then((res) => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        });
    }
});*/