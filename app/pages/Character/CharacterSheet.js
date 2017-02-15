import React from 'react';
import styles from './CharacterSheet/CharacterSheet.scss'
import { Panel, ListGroup, ListGroupItem, Grid, Row, Col } from 'react-bootstrap'

import ShockGauge from './CharacterSheet/ShockGauge'

export default class CharacterSheet extends React.Component {
  constructor() {
    super();
  }

  render() {
    const c = this.props.character
    const madness = c.bio.madness.map((m) => {
      return <li>{m.type + ' from ' + m.origin}</li>
    })
    const gauges = Object.keys(c.gauges).map((g) => {
      return <ShockGauge gauge={g} notches={c.gauges[g]}></ShockGauge>
    });
    const abilities = Object.keys(c.abilities).map((a) => {
      return <p>{a}: {c.abilities[a].base} {c.abilities[a].effective ? '(' + c.abilities[a].effective + ')' : null}</p>
    });
    const woundTotal = () => {
      var a = 0;
      for (var w of c.wounds.list) {
        a += w.amount;
      }
      return a
    };
    const woundList = c.wounds.list.map((w) => {
        return <ListGroupItem>Took <strong>{w.amount}</strong> wounds from <strong>{w.origin}</strong></ListGroupItem>
    });
    return (
      <div class="character-sheet">

        <Grid>
        <h1>{c.bio.lastName + ', ' + c.bio.firstName + (c.bio.middleName ? ' ' + c.bio.middleName : null)}</h1>
          <Row class="show-grid">
            <Col md={6}>
              <Panel collapsible defaultExpanded header="Biographical Information">
                <ListGroup fill>
                  <ListGroupItem><strong>Name: </strong>{c.bio.firstName + ' ' + (c.bio.middleName ? c.bio.middleName + ' ' : null) + c.bio.lastName}</ListGroupItem>
                  <ListGroupItem><strong>Characteristics: </strong>{c.bio.characteristics}</ListGroupItem>
                  <ListGroupItem><strong>Affiliation: </strong>{c.bio.cabal}</ListGroupItem>
                  <ListGroupItem><strong>Obsession: </strong>{c.bio.obsession}</ListGroupItem>
                  <ListGroupItem><strong>Fear Passion: </strong>{c.bio.passions.fear}</ListGroupItem>
                  <ListGroupItem><strong>Rage Passion: </strong>{c.bio.passions.rage}</ListGroupItem>
                  <ListGroupItem><strong>Noble Passion: </strong>{c.bio.passions.noble}</ListGroupItem>
                </ListGroup>
              </Panel>
            </Col>
            <Col md={6}>
              <Panel collapsible defaultExpanded header="Medical Records">
                <ListGroup fill>
                  <ListGroupItem>
                    <Panel collapsible defaultExpanded header="Physical Health">
                      <p><strong>Wound Threshold:</strong> {c.wounds.threshold}</p>
                      <p><strong>Current Condition: </strong> Below Average ({c.wounds.threshold - woundTotal()})</p>
                      <Panel collapsible defaultCollapsed header="Health Summary">
                        <ListGroup fill>
                          {woundList}
                          <ListGroupItem><strong>Wounds Taken: </strong>{woundTotal()}</ListGroupItem>
                        </ListGroup>
                      </Panel>
                    </Panel>
                  </ListGroupItem>
                </ListGroup>
              </Panel>
            </Col>
          </Row>
        </Grid>
        <p>Cabal: {c.bio.cabal}</p>
        <p>Objective: {c.bio.objective}</p>
        <p>Characteristics: {c.bio.characteristics}</p>
        <p>Obsession: {c.bio.obsession}</p>
        <p>Fear Passion: {c.bio.passions.fear}</p>
        <p>Rage Passion: {c.bio.passions.rage}</p>
        <p>Noble Passion: {c.bio.passions.noble}</p>
        <ul>{madness}</ul>
        {gauges}
        {abilities}
      </div>
    );
  }
}
