import React from 'react';
import * as TestActions from '../actions/TestActions';
import characterStore from '../stores/CharacterStore';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
require('bootstrap/dist/js/bootstrap.js');

import CharacterSheet from './Character/CharacterSheet';



export default class Character extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentWillMount() {
    characterStore.on('change', () => {
      this.setState({
        character: characterStore.getOne(this.props.params.characterId)
      })
    })
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      character: characterStore.getOne(newProps.params.characterId)
    })
  }

  render() {
    const { params } = this.props
    const { query } = this.props.location
    const { character } = this.state
    // <input type="text" value={this.state.newName} onChange={this.handleChange}/>
    return (
      <div>
        { this.state.character ? <CharacterSheet character={this.state.character}></CharacterSheet> : null}

      </div>
    );
  }
}
