import dispatcher from '../dispatcher';


export function createItem(text) {
  dispatcher.dispatch({
    type: 'CREATE_ITEM',
    text,
  });
}

export function refresh() {
  dispatcher.dispatch({
    type: 'REFRESH'
  });
}

export function deleteItem(_id) {
  dispatcher.dispatch({
    type: 'DELETE_ITEM',
    _id,
  });
}

export function updateItem(_id, fields, opType='normal', extra={}) {
  dispatcher.dispatch({
    type: 'UPDATE_ITEM',
    _id, fields, opType, extra
  });
}
