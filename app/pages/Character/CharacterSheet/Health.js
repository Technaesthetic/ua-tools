import React from 'react';
import * as CharacterActions from '../../../actions/CharacterActions';
import { Label, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

import Injury from './Injury'

export default class Health extends React.Component {
  constructor() {
    super();
    this.state = {
      character: {}
    }
    this.addInjury = this.addInjury.bind(this)
  }

  componentWillMount() {
    this.setState({character: this.props.character})
  }
  componentWillReceiveProps(newP) {
    this.setState({character: newP.character})
  }

  addInjury() {
    const blank = [{amount:0, origin:'', n:true}]
    var newC = this.props.character
    newC.wounds.list = newC.wounds.list.concat(blank)
    this.setState({character: newC})
  }

  render() {
    const c = this.state.character
    var edit = false

    const woundTotal = () => {
      var a = 0;
      for (var w of c.wounds.list) {
        a += w.amount;
      }
      return a
    };
    const woundList = c.wounds.list.map((w, i) => {
      return <Injury amount={w.amount} origin={w.origin} injuryId={w._id} key={i} edit={w.n ? true : false} id={c._id}></Injury>
    });

    const getCondition = () => {
      const percent = ((c.wounds.threshold - woundTotal()) / c.wounds.threshold) * 100
      var condition = 'BLANK'
      if (percent > 75) {
        condition = 'Healthy'
      } else if (percent <= 75 && percent > 50) {
        condition = 'Okay'
      } else if (percent <= 50 && percent > 25) {
        condition = 'Hurt'
      } else if (percent <= 25 && percent > 10) {
        condition = 'Wounded'
      } else if (percent <= 10 && percent > 0) {
        condition = 'Critical'
      } else {
        condition = 'Dead'
      }
      return condition
    }

    return (
      <Panel collapsible defaultExpanded header="Physical Health">
        <p><strong>Wound Threshold:</strong> {c.wounds.threshold}</p>
        <p><strong>Current Condition: </strong> {getCondition()} <Label bsStyle="danger">{c.wounds.threshold - woundTotal()}</Label></p>
        <ListGroup>
          {woundList}
          <ListGroupItem><a onClick={this.addInjury}><i class="fa fa-plus"></i> <strong>Add Injury</strong></a></ListGroupItem>
        </ListGroup>
      </Panel>
    );
  }
}
