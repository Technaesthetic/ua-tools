import { EventEmitter } from 'events';
const axios = require('axios');

import dispatcher from '../dispatcher';

class TestStore extends EventEmitter {
  constructor() {
    super();
    this.list = [];
    this.fetch();
  }

  createItem(text) {
    const self = this;
    const _id = Date.now();
    const item = {
      _id,
      text,
      done: false
    };
    axios.post('/api/add', item).then(function(data){
      console.log(data, item);
      self.fetch();
    });
  }

  deleteItem(_id) {
    const self = this;
    axios.post('/api/del', { _id }).then(function(data) {
      console.log(data, _id);
      self.fetch();
    });
  }

  updateItem(_id, fields) {
    const self = this;
    axios.post('/api/upd', { _id, fields }).then(function(data) {
      console.log(data, _id, fields);
      self.fetch();
    });
  }

  fetch() {
    const self = this;
    axios.get('/api/get').then(function(data){
      self.list = data.data;
      self.emit('change');
    });
  }

  getAll() {
    return this.list;
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_ITEM": {
        this.createItem(action.text);
      }
      case "DELETE_ITEM": {
        this.deleteItem(action._id);
      }
      case "UPDATE_ITEM": {
        this.updateItem(action._id, action.fields);
      }
    }
  }
}

const testStore = new TestStore;
dispatcher.register(testStore.handleActions.bind(testStore));
window.dispatcher = dispatcher;
export default testStore;
