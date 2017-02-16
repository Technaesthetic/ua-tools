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
    const madnessListLong = c.madness.map((m) => {
      return <ListGroupItem><strong>{m.type}</strong> from <strong>{m.origin}</strong></ListGroupItem>
    })
    const madnessListShort = () => {
      var l = []
      for (var m of c.madness) {
        l.push(m.type)
      }
      return l.join(', ')
    };
    const gauges = Object.keys(c.gauges).map((g) => {
      return <ShockGauge gauge={g} character={c}></ShockGauge>
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
    const identityList = c.identities.map((i) => {
      return (
        <Col md={6}>
          <Panel>
            <ListGroup fill>
              <ListGroupItem bsStyle="info"><big><strong>{i.name}</strong></big><big class="pull-right">{i.percent}</big></ListGroupItem>
              <ListGroupItem>{i.description}</ListGroupItem>
              <ListGroupItem>I'm a <strong>{i.name}</strong>, of course I can <strong>{i.ofCourse}</strong></ListGroupItem>
              <ListGroupItem>Substitutes for <strong>{i.substitutes}</strong></ListGroupItem>
              <ListGroupItem><strong>{i.features[0].type} {i.features[0].value}</strong></ListGroupItem>
              <ListGroupItem><strong>{i.features[1].type} {i.features[1].value}</strong></ListGroupItem>
            </ListGroup>
          </Panel>
        </Col>
      );
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
          </Row>
          <Row>
            <Col md={12}>
              <Panel collapsible defaultExpanded header="Medical Records">
                <ListGroup fill>
                  <ListGroupItem>
                    <Row>
                      <Col md={6}>
                        <Panel collapsible defaultExpanded header="Physical Health">
                          <p><strong>Wound Threshold:</strong> {c.wounds.threshold}</p>
                          <p><strong>Current Condition: </strong> Below Average ({c.wounds.threshold - woundTotal()})</p>
                          <Panel collapsible defaultCollapsed header="Summary">
                            <ListGroup fill>
                              {woundList}
                              <ListGroupItem><strong>Wounds Taken: </strong>{woundTotal()}</ListGroupItem>
                            </ListGroup>
                          </Panel>
                        </Panel>
                      </Col>
                      <Col md={6}>
                        <Panel collapsible defaultExpanded header="Mental Health">
                          <p><strong>Current Condition: </strong> {c.madness.length > 0 ? madnessListShort() : 'Normitive'}</p>
                          <Panel collapsible defaultCollapsed header="Summary">
                            <ListGroup fill>
                              {madnessListLong}
                            </ListGroup>
                          </Panel>
                        </Panel>
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </Panel>
            </Col>
          </Row>
          <Row class="show-grid">
            <Col md={12}>
              <Panel collapsible defaultExpanded header="Combined Profile">
                {gauges}
              </Panel>
            </Col>
          </Row>
          <Row class="show-grid">
            <Col md={12}>
            <Panel collapsible defaultExpanded header="Known Identities">
              <Row class="show-grid">
                {identityList}
              </Row>
            </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
