import React from 'react';
import * as CharacterActions from '../../../actions/CharacterActions';
import { Label, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

export default class Identity extends React.Component {
  constructor() {
    super();
    this.state = {
      identity: {}
    }
  }

  render() {
    const { identity } = this.props

    return(
      <Panel header={
        <span>
          <strong><big>{identity.name}</big></strong>
          <big class="pull-right">{identity.percent}</big>
        </span>
      }>
        <ListGroup>
          <ListGroupItem>{identity.description}</ListGroupItem>
          <ListGroupItem>I'm a <strong>{identity.name}</strong>, of course I can <strong>{identity.ofCourse}</strong></ListGroupItem>
          <ListGroupItem>Substitutes for <strong>{identity.substitutes}</strong></ListGroupItem>
          <ListGroupItem><strong>{identity.features[0].type} {identity.features[0].value}</strong></ListGroupItem>
          <ListGroupItem><strong>{identity.features[1].type} {identity.features[1].value}</strong></ListGroupItem>
        </ListGroup>
      </Panel>
    )
  }
}
