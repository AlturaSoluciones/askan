import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyD7jl619qdLTDMsF-OHSv55GNJgDaAxhyY",
  authDomain: "askan-6ccad.firebaseapp.com",
  databaseURL: "https://askan-6ccad.firebaseio.com",
  projectId: "askan-6ccad",
  storageBucket: "askan-6ccad.appspot.com",
  messagingSenderId: "799773169786",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const database = firebase.database();

export {
  auth,
  database
};
