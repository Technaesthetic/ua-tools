import { EventEmitter } from 'events';
const axios = require('axios');

import dispatcher from '../dispatcher';

import Process from './CharacterStore/Process'

class CharacterStore extends EventEmitter {
  constructor() {
    super();
    this.list = [];
    this.fetchAll();
  }

  createItem(text) {
    const self = this;
    const _id = Date.now();
    const item = {
      _id,
      text,
      done: false
    };
    axios.post('/api/add/character', item).then(function(data){
      console.log(data, item);
      self.fetch();
    });
  }

  deleteItem(_id) {
    const self = this;
    axios.post('/api/del/character', { _id }).then(function(data) {
      console.log(data, _id);
      self.fetch();
    });
  }

  updateItem(_id, fields) {
    const self = this;
    axios.post('/api/upd/character', { _id, fields }).then(function(data) {
      console.log(data, _id, fields);
      self.fetch();
    });
  }

  fetchAll() {
    const self = this;
    axios.post('/api/get/character').then(function(data){
      for (var c of data.data) {
        self.list.push(Process(c))
      }
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

const characterStore = new CharacterStore;
dispatcher.register(characterStore.handleActions.bind(characterStore));
window.dispatcher = dispatcher;
export default characterStore;
