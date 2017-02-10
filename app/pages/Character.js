import React from 'react';
import * as TestActions from '../actions/TestActions';
import characterStore from '../stores/CharacterStore';

import CharacterSheet from './Character/CharacterSheet';



export default class Character extends React.Component {
  constructor() {
    super();
    this.state = {
      characters: characterStore.getAll()
    };
    this.addItem = this.addItem.bind(this);
    this.setCharacter = this.setCharacter.bind(this);
  }

  componentWillMount() {
    characterStore.on('change', () => {
      this.setState({
        characters: characterStore.getAll()
      })
    })
  }

  deleteItem(_id) {
    TestActions.deleteItem(_id);
  }

  setCharacter(c) {
    this.setState({selected: c})
  }

  editItem(_id, text) {
    const newText = prompt('Enter new text', text);
    if (newText) {
      TestActions.updateItem(_id, { text : newText });
    }
  }

  addItem() {
    TestActions.createItem(this.state.newName)
    this.setState({
      newName: ''
    });
  }

  render() {
    const { params } = this.props
    const { query } = this.props.location
    const { characters } = this.state
    const chars = characters.map((item) => {
      return <li id={item._id} onClick={this.setCharacter.bind(this, item)}>{item.bio.firstName + ' ' + item.bio.lastName}</li>
    });
    // <input type="text" value={this.state.newName} onChange={this.handleChange}/>
    return (
      <div>
        <h1>Character</h1>
        <h3>{params.section}</h3>
        <h4>{query.thing}</h4>
        <ul>{chars}</ul>
        { this.state.selected ? <CharacterSheet character={this.state.selected}></CharacterSheet> : null}
        <button class="button" onClick={this.addItem.bind(this)}>+ Add</button>
      </div>
    );
  }
}
