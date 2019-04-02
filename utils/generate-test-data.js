
const { promisify } = require("util");
const fs = require("fs");
const prompt = require("prompt");
const { resolve } = require("path");

const get = promisify(prompt.get);
const readFile = promisify(fs.readFile);

const firebase = require('firebase/app');
const auth = require("firebase/auth");
require("firebase/firestore");


// Mapping from .env.local values to firebase configuration values
const configMapping = {
    REACT_APP_FIREBASE_API_KEY: 'apiKey',
    REACT_APP_FIREBASE_AUTH_DOMAIN: 'authDomain',
    REACT_APP_FIREBASE_DATABASE_URL: 'databaseURL',
    REACT_APP_FIREBASE_PROJECT_ID: 'projectId' ,
    REACT_APP_FIREBASE_STORAGE_BUCKET: 'storageBucket' ,
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID: 'messagingSenderId',
};

// Schema for values to gather with 'prompt'
const schema = {
    properties: {
        email: {
            required: true,
            message: 'Enter your email for signin',
        },
        password: {
            hidden: true,
            required: true,
        },
        organization_name: {
            required: true,
            message: 'Enter the name of your test organization',
        },
    }
};

const config = {};
var organization_id = null;
var profile_id = null;
var email = "testuser@boxwise.co";
var password = "password3";

function readConfig() {
    console.log("Reading local firebase configuration");
    const file = resolve(process.cwd(), `.env.local`);
    return readFile(file, 'utf8');
}

const parseConfig = (result) => {
        for(let line of result.split('\n')) {
            const [key, val] = line.split('=');
            const firebaseKey = configMapping[key];
            if(firebaseKey != null) {
                config[firebaseKey] = val;
            }
        }
        console.log(config);
        initFirebase();
};

// From Mozilla MDN
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

const initFirebase = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }

    firestore = firebase.firestore();
    firestore.settings({ });
};

const setupAuth = () => {
    return firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
};

const addOrganization = ({ name }) => {
    console.log("Creating organization " + name);
    
    return firestore.collection("organizations").add({
        name: name,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
};

const addBox = (product_id) => {
    const values = { quantity: getRandomInt(1, 20), comment: "test comment"};

    values.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    values.createdBy = firestore.doc("profiles/" + profile_id);
    values.organization = firestore.doc("organizations/" + organization_id);
    values.humanID = getRandomInt(10000, 100000);

    values.product = firestore.doc(product_id);
    
    return firestore
        .collection("boxes")
        .add(values);
};


const setProfile = (uid , data) => {
    // console.log("UID is: " + uid);
    // console.log("DATA is: " + data);
    
    return firestore
        .collection("profiles")
        .doc(uid)
        .set(data);
};

const createUserAndProfile = ({ email, password }, organization_id) => {
    const profile = {organization: firestore.doc('organizations/' + organization_id)};
    
    return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(({ user }) => setProfile(user.uid, profile));
};

const addProduct = (values, uid) => {

    // console.log("organizations/" + organization_id);
    // console.log("profiles/" + uid);
    
    values.organization = firestore.doc("organizations/" + organization_id); 

    values.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    values.createdBy = firestore.doc("profiles/" + uid); 
    values.isDeleted = false;
    
    return  firestore
        .collection("products")
        .add(values);
};

const generateProducts = (profile_id) => {

    console.log("Creating test products");
    const promises = [];

    const categories = ['Man', 'Woman', 'Adult', 'Boy', 'Girl', 'Child', 'Baby', 'Food', 'Hygiene', 'Other'];
    
    for(let i = 0; i < 10; i++) {
        let category_index = getRandomInt(0, categories.length);
        let product = {
            category: categories[category_index],
            name: "Test Product " + (i + 1),
        };

        promises.push(addProduct(product, profile_id));
    }
    
    return Promise.all(promises);
};

const generateBoxes = (products) => {
    console.log("Creating test boxes");
    
    const promises = [];
    
    for(let i = 0; i < 5; i++) {
        let product_index = getRandomInt(0, products.length);
        let product_id = products[product_index]._key.path.segments.join('/');
        
        promises.push(addBox(product_id));
    }
    
    return Promise.all(promises);
};

const logErrorAndExit = (err) => {
    console.log(err);
    process.exit();
};

readConfig()
    .then(parseConfig)
    .catch(logErrorAndExit)
    .then( () => { return get(schema); })
    .then( (result) => {
        email = result.email;
        password = result.password;
        
        return addOrganization({name: result.organization_name});
    })
    .then( (ref) => {
        organization_id = ref.id;
        return createUserAndProfile({ email: email, password: password }, ref.id);
    })
    .then(setupAuth)
    .catch(logErrorAndExit)
    .then( ({ user }) => {
        profile_id = user.uid;

        return generateProducts(profile_id);
    })
    .catch(logErrorAndExit)
    .then( (products) => generateBoxes(products) )
    .then( () => {  process.exit(); });
