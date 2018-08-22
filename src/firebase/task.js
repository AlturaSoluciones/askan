import { database } from './firebase';

const dbRef = database.ref();
const boardsRef = dbRef.child('boards');


// Create
// task.createTask('-LJQ17b4nttv10t30I55','-LKXUt3NjIzer6jrNQpl', 'This is new task')
export const createTask = (boardId, heapId, description) => {
  return new Promise((resolve, reject) => {
    const heapsRef = boardsRef.child(boardId).child('heaps');
    const tasksRef= heapsRef.child(heapId).child('tasks');
    if (tasksRef){
      tasksRef.push({
        description: description
      }).then(result => {
        resolve(true);
      }).catch(err => {
        reject(false);
      });
    } else {
      reject(false);
    }
  });
}

// List
// task.listTasks('-LJQ17b4nttv10t30I55','-LKXUt3NjIzer6jrNQpl').then(r => console.log(r));
export const listTasks = (boardId, heapId) => {
  return new Promise((resolve, reject) => {
    const tasksRef = boardsRef.child(boardId).child('heaps').child(
      heapId).child('tasks');
    var tasks = [];
    tasksRef.once('value', function (snapshot) {
      snapshot.forEach(function (child) {
        tasks.push({
          id: child.key,
          description: child.val().description
        });
      });
      resolve(tasks);
    });
  })
}

// Delete
// task.deleteTask('-LJQ17b4nttv10t30I55','-LKXUt3NjIzer6jrNQpl', '-LKXfkMZC3P9YiOnfac-').then(r => console.log(r));
export const deleteTask = (boardId, heapId, id) => {
  return new Promise((resolve, reject) => {
    const tasksRef = boardsRef.child(boardId).child('heaps').child(
      heapId).child('tasks');
    tasksRef.child(id).remove().then(result => {
      resolve(true);
    }).catch(err => {
      reject(false);
    });
  })
}

// Update
// task.updateTask('-LJQ17b4nttv10t30I55','-LKXUt3NjIzer6jrNQpl', '-LKXfkMZC3P9YiOnfac-', {description: 'This is other mesage'}).then(r => console.log(r));
export const updateTask = (boardId, heapId, id, task) => {
  return new Promise((resolve, reject) => {
    const tasksRef = boardsRef.child(boardId).child('heaps').child(
      heapId).child('tasks');
    tasksRef.child(id).update(task).then(result => {
      resolve(true);
    }).catch(err => {
      reject(false);
    });
  })
}
