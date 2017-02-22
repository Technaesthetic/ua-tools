import React from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

import Field from './Field'

export default class Bio extends React.Component {
  constructor() {
    super();
  }

  // const change = () => {
  //   var fields = {}
  //   fields[''] = ((c.gauges[gauge].hardened - 1) >= 1 ? c.gauges[gauge].hardened - 1 : 1)
  //   CharacterActions.updateItem(c._id, fields)
  // }

  render() {
    const c = this.props.character
    var edit = false

    return (
      <Panel collapsible defaultExpanded header="Biographical Information">
        <ListGroup>
          <ListGroupItem><strong>Name: </strong>{c.bio.firstName + ' ' + (c.bio.middleName ? c.bio.middleName + ' ' : null) + c.bio.lastName}</ListGroupItem>
          <ListGroupItem><Field display='Characteristics' value={c.bio.characteristics} id={c._id} fieldName='bio.characteristics'></Field></ListGroupItem>
          <ListGroupItem><Field display='Affiliation' value={c.bio.cabal} id={c._id} fieldName='bio.cabal'></Field></ListGroupItem>
          <ListGroupItem><Field display='Obsession' value={c.bio.obsession} id={c._id} fieldName='bio.obsession'></Field></ListGroupItem>
          <ListGroupItem><Field display='Fear Passion' value={c.bio.passions.fear} id={c._id} fieldName='bio.passions.fear'></Field></ListGroupItem>
          <ListGroupItem><Field display='Rage Passion' value={c.bio.passions.rage} id={c._id} fieldName='bio.passions.rage'></Field></ListGroupItem>
          <ListGroupItem><Field display='Noble Passion' value={c.bio.passions.noble} id={c._id} fieldName='bio.passions.noble'></Field></ListGroupItem>
        </ListGroup>
      </Panel>
    );
  }
}
