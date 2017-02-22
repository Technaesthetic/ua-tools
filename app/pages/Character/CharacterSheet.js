import React from 'react';
import styles from './CharacterSheet/CharacterSheet.scss'
import { Panel, ListGroup, ListGroupItem, Grid, Row, Col, Label } from 'react-bootstrap'

import Bio from './CharacterSheet/Bio'
import Health from './CharacterSheet/Health'
import ShockGauge from './CharacterSheet/ShockGauge'

export default class CharacterSheet extends React.Component {
  constructor() {
    super();
  }

  render() {
    const c = this.props.character
    const madnessListLong = c.madness.map((m, i) => {
      return <ListGroupItem key={i}><strong>{m.type}</strong> from <strong>{m.origin}</strong></ListGroupItem>
    })
    const madnessListShort = () => {
      var l = []
      for (var m of c.madness) {
        l.push(m.type)
      }
      return l.join(', ')
    };
    const gauges = Object.keys(c.gauges).map((g, i) => {
      return <ShockGauge gauge={g} character={c} key={i}></ShockGauge>
    });
    const abilities = Object.keys(c.abilities).map((a, i) => {
      return <p key={i}>{a}: {c.abilities[a].base} {c.abilities[a].effective ? '(' + c.abilities[a].effective + ')' : null}</p>
    });
    const identityList = c.identities.map((identity, i) => {
      return (
        <Col md={6} key={i}>
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
        </Col>
      );
    });
    const characterImage = () => {
      return (
        <img style={{
          maxWidth: '100%',
          marginBottom:'18px',
          boxShadow: '3px 3px 1px 0px #999',
          borderRadius: '20px'
        }}src={require(`../../../src/img/characters/${c.image}`)}/>
      )
    }
    return (
      <div class="character-sheet">

        <Grid>
        <h1>{c.bio.lastName + ', ' + c.bio.firstName + (c.bio.middleName ? ' ' + c.bio.middleName : null)}</h1>
          <Row class="show-grid">
            <Col md={6}>
              <Bio character={c}></Bio>
            </Col>
            <Col md={6}>
              {c.image ? characterImage() : null}
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Panel collapsible defaultExpanded header="Medical Records">
                <ListGroup fill>
                  <ListGroupItem>
                    <Row>
                      <Col md={6}>
                        <Health character={c}></Health>
                      </Col>
                      <Col md={6}>
                        <Panel collapsible defaultExpanded header="Mental Health">
                          <p><strong>Current Condition: </strong> {c.madness.length > 0 ? madnessListShort() : 'Normitive'}</p>
                          <ListGroup>
                            {madnessListLong}
                          </ListGroup>
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
