import * as admin from 'firebase-admin';

// Add here your api admin key.
const serviceAccount = require('askan-e266b-firebase-adminsdk-95765-d7b335165e.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://askan.firebaseio.com'
});

export const listAllUsers = nextPageToken => {
  // List batch of users, 1000 at a time.
  admin.auth().listUsers(1000, nextPageToken).then( listUsersResult => {
    listUsersResult.users.forEach(function(userRecord) {
      console.log("user", userRecord.toJSON());
    });
    if (listUsersResult.pageToken) {
      // List next batch of users.
      listAllUsers(listUsersResult.pageToken)
    }
  }).catch(error => {
    console.log("Error listing users:", error);
  });
}

listAllUsers();