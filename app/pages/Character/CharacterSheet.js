import React from 'react';
import styles from './CharacterSheet/CharacterSheet.scss'
import { Panel, ListGroup, ListGroupItem, Grid, Row, Col, Label } from 'react-bootstrap'

import Bio from './CharacterSheet/Bio'
import Health from './CharacterSheet/Health'
import Mental from './CharacterSheet/Mental'
import ShockGauge from './CharacterSheet/ShockGauge'
import Identity from './CharacterSheet/Identity'

export default class CharacterSheet extends React.Component {
  constructor() {
    super();
    this.state = {
      character: {}
    }
    this.addIdentity = this.addIdentity.bind(this)
  }

  componentWillMount() {
    this.setState({character: this.props.character})
  }
  componentWillReceiveProps(newP) {
    this.setState({character: newP.character})
  }

  addIdentity() {
    var template = {
        name : '',
        percent : 0,
        description : '',
        ofCourse : '',
        substitutes : '',
        features : [
          {
            type: '',
            value: '',
            notes: ''
          },
          {
            type: '',
            value: '',
            notes: ''
          }
        ]
    }
    var newC = this.state.character
    newC.identities.push(template)
    this.setState({character: newC})
  }

  render() {
    const c = this.state.character
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
          <Identity identity={identity}></Identity>
        </Col>
      );
    });
    const characterImage = () => {
      return (
        <img style={{
          maxWidth: '100%',
          marginBottom:'18px',
          boxShadow: '3px 3px 1px 0px #999',
          borderRadius: '20px',
          border: '1px solid #ccc'
        }}src={require(`../../../src/img/characters/${c.image}`)}/>
      )
    }
    return (
      <div class="character-sheet">

        <Grid>
        <h1>{c.bio.name}</h1>
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
                        <Mental character={c}></Mental>
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
            <Panel header={
              <span>
                <span>Known Identities</span>
                <a class="text-primary" onClick={this.addIdentity}><span class="pull-right"><i class="fa fa-plus"></i> Add</span></a>
              </span>
            }>
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
