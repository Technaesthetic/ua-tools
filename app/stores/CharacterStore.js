import { EventEmitter } from 'events';
const axios = require('axios');

import dispatcher from '../dispatcher';

class CharacterStore extends EventEmitter {
  constructor() {
    super();
    this.list = [];
    this.fetchAll();
  }

  process(d) {
    const self = this;
    function upbeat (n) {
      return 65 - (n * 5)
    }
    function downbeat (n) {
      return 15 + (n * 5)
    }
    for (var c of d) {
      c.abilities = {
        fitness: upbeat(c.gauges.helplessness.hardened),
        dodge: downbeat(c.gauges.helplessness.hardened),
        status: upbeat(c.gauges.isolation.hardened),
        pursuit: downbeat(c.gauges.isolation.hardened),
        knowledge: upbeat(c.gauges.self.hardened),
        lie: downbeat(c.gauges.self.hardened),
        notice: upbeat(c.gauges.unnatural.hardened),
        secrecy: downbeat(c.gauges.unnatural.hardened),
        connect: upbeat(c.gauges.violence.hardened),
        struggle: downbeat(c.gauges.violence.hardened),
      }
    }
    self.list = d;
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
      self.process(data.data)
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
