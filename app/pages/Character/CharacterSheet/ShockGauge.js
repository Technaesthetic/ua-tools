import React from 'react';
import { ProgressBar, Row, Col, Label } from 'react-bootstrap';

export default class ShockGauge extends React.Component {
  constructor() {
    super();
  }

  getUpbeat(gauge) {
    const list = {
      helplessness: 'Fitness',
      isolation: 'Status',
      self: 'Knowledge',
      unnatural: 'Notice',
      violence: 'Connect'
    }
    return list[gauge]
  }
  getDownbeat(gauge) {
    const list = {
      helplessness: 'Dodge',
      isolation: 'Pursuit',
      self: 'Lie',
      unnatural: 'Secrecy',
      violence: 'Struggle'
    }
    return list[gauge]
  }

  render() {
    const self = this
    const { gauge } = this.props
    const c = this.props.character
    const notches = c.gauges[gauge]
    const upbeat = self.getUpbeat(gauge)
    const downbeat = self.getDownbeat(gauge)
    const titleCase = (s) => {
      return s[0].toUpperCase() + s.substring(1)
    }
    return (
      <div>
        <Row>
          <Col md={2} sm={2} xs={4}>
            <p class="pull-right lead">{titleCase(gauge)}</p>
          </Col>
          <Col md={5} sm={5} xs={8}>
            <label>{upbeat}&#160;</label>
            <Label>{c.abilities[upbeat.toLowerCase()].base}</Label>
            <Label bsStyle="success">{c.abilities[upbeat.toLowerCase()].effective ? c.abilities[upbeat.toLowerCase()].effective : null}</Label>
          </Col>
          <Col md={5} sm={5} xs={8}>
            <label>{downbeat}&#160;</label>
            <Label>{c.abilities[downbeat.toLowerCase()].base}</Label>
          </Col>
          <Col md={2} sm={2} xs={4}></Col>
          <Col md={10} sm={10} xs={8}>
            <ProgressBar>
              <ProgressBar min={0} max={14} now={notches.hardened} label={notches.hardened} striped={notches.hardened >= 5 ? true : false} key={1} />
              <ProgressBar bsStyle="danger" min={0} max={14} now={notches.failed} label={notches.failed} striped={notches.failed >= 5 ? true : false} key={2}/>
            </ProgressBar>
          </Col>
        </Row>
      </div>
    );
  }
}
