import dispatcher from '../dispatcher';


export function createItem(text) {
  dispatcher.dispatch({
    type: 'CREATE_ITEM',
    text,
  });
}

export function deleteItem(_id) {
  dispatcher.dispatch({
    type: 'DELETE_ITEM',
    _id,
  });
}

export function updateItem(_id, fields) {
  dispatcher.dispatch({
    type: 'UPDATE_ITEM',
    _id, fields
  });
}
