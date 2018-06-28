import { database } from './firebase';

const dbRef = database.ref();
const boardsRef = dbRef.child('boards');

// Create
export const createBoard = (ownerId, name) => {
  return new Promise((resolve, reject) => {
    boardsRef.push({
      ownerId: ownerId,
      name: name
    }).then(result => {
      resolve(true);
    }).catch(err => {
      reject(false);
    });
  });
}

// List
export const listBoards = () => {
  return new Promise((resolve, reject) => {
    var listBoards = [];
    boardsRef.once('value', function (snapshot) {
      snapshot.forEach(function (child) {
        listBoards.push({
          id: child.key,
          ownerId: child.val().ownerId,
          name: child.val().name
        });
      });
      resolve(listBoards);
    });
  })
}