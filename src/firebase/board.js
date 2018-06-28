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

// Delete
export const deleteBoard = (id) => {
  return new Promise((resolve, reject) => {
    boardsRef.child(id).remove().then(result => {
      resolve(true);
    }).catch(err => {
      reject(false);
    });
  })
}

// Update
// board.updateBoard('-LG66Fp54ZNfyDhrb1j4', {name: 'UpdateName'}).then(r => console.log(r));
export const updateBoard = (id, board) => {
  return new Promise((resolve, reject) => {
    boardsRef.child(id).update(board).then(result => {
      resolve(true);
    }).catch(err => {
      reject(false);
    });
  })
}