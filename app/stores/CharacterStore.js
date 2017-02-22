import { EventEmitter } from 'events';
const axios = require('axios');

import dispatcher from '../dispatcher';

import Process from './CharacterStore/Process'

class CharacterStore extends EventEmitter {
  constructor() {
    super();
    this.list = [];
    this.ind = {};
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

  updateItem(_id, fields, type, extra) {
    const self = this;
    var allowed = true
    if (type === 'normal') {
      fields = {$set: fields}
    } else if (type === 'ArrPush') {
      fields = {$push : fields}
    } else if (type === 'ArrPull') {
      fields = {$pull : fields}
    } else {
      allowed = false
    }
    if (allowed == true) {
      axios.post('/api/upd/character', { _id, fields }).then(function(data) {
        self.fetchAll();
      });
    }

  }

  fetchAll() {
    const self = this;
    axios.post('/api/get/character').then(function(data){
      var i = 0
      for (var c of data.data) {
        if (self.ind.hasOwnProperty(c._id)) {
          self.list[self.ind[c._id]] = Process(c)
        } else {
          self.ind[c._id] = i
          self.list[i] = Process(c)
        }
        i++

      }
      self.emit('change');
    });
  }

  getAll() {
    return this.list;
  }

  getOne(id) {
    return this.list.find((c) => {return c._id === id} )
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
        this.updateItem(action._id, action.fields, action.opType, action.extra);
      }
      case "REFRESH": {
        this.fetchAll()
      }
    }
  }
}

const characterStore = new CharacterStore;
dispatcher.register(characterStore.handleActions.bind(characterStore));
window.dispatcher = dispatcher;
export default characterStore;
