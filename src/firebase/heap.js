import { database } from './firebase';

const dbRef = database.ref();
const boardsRef = dbRef.child('boards');


// Create
// heap.createHeap('-LGbVoCSDxvaewPP9TYc', 'ListaNueva');
export const createHeap = (boardId, name) => {
  return new Promise((resolve, reject) => {
    const heapRef = boardsRef.child(boardId).child('heaps');
    heapRef.push({
      name: name
    }).then(result => {
      resolve(true);
    }).catch(err => {
      reject(false);
    });
  });
}

// List
// heap.listHeaps('-LGbVoCSDxvaewPP9TYc').then(r => console.log(r));
export const listHeaps = (boardId) => {
  return new Promise((resolve, reject) => {
    const heapRef = boardsRef.child(boardId).child('heaps');
    var heaps = [];
    heapRef.once('value', function (snapshot) {
      snapshot.forEach(function (child) {
        heaps.push({
          id: child.key,
          name: child.val().name
        });
      });
      resolve(heaps);
    });
  })
}

// Delete
// heap.deleteHeap('-LGbVoCSDxvaewPP9TYc', '-LGbWePPwQOxdSxRSeKC').then(r => console.log(r));
export const deleteHeap = (boardId, id) => {
  return new Promise((resolve, reject) => {
    const heapRef = boardsRef.child(boardId).child('heaps');
    heapRef.child(id).remove().then(result => {
      resolve(true);
    }).catch(err => {
      reject(false);
    });
  })
}

// Update
// heap.updateHeap('-LGbVoCSDxvaewPP9TYc', '-LGbWPmPI3R8Tm6lx_w-', {name: 'UpdatedHeap'}).then(r => console.log(r));
export const updateHeap = (boardId, id, heap) => {
  return new Promise((resolve, reject) => {
    const heapRef = boardsRef.child(boardId).child('heaps');
    heapRef.child(id).update(heap).then(result => {
      resolve(true);
    }).catch(err => {
      reject(false);
    });
  })
}