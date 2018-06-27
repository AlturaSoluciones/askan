import { database } from './firebase';

// Create
export const createBoard = (boardId, ownerId, name) => {
  database.ref('boards/' + boardId).set({
    ownerId: ownerId,
    name: name
  });
}