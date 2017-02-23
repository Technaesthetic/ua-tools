import React from 'react';
import * as CharacterActions from '../../../actions/CharacterActions';
import { Label, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

import Insanity from './Insanity'

export default class Mental extends React.Component {
  constructor() {
    super();
    this.state = {
      character: {}
    }
    this.addInsanity = this.addInsanity.bind(this)
  }

  componentWillMount() {
    this.setState({character: this.props.character})
  }
  componentWillReceiveProps(newP) {
    this.setState({character: newP.character})
  }

  addInsanity() {
    const blank = [{type:'', origin:'', n:true}]
    var newC = this.props.character
    newC.madness = newC.madness.concat(blank)
    this.setState({character: newC})
  }

  render() {
    const c = this.state.character
    var edit = false

    const madnessListLong = c.madness.map((m, i) => {
      return <Insanity type={m.type} origin={m.origin} insanityId={m._id} key={i} edit={m.n ? true : false} id={c._id}></Insanity>
    });

    const madnessListShort = () => {
      var l = []
      for (var m of c.madness) {
        l.push(m.type)
      }
      c.features.forEach((f) => {
        if (f.type === 'sociopathic') {
          l.push('Sociopathic')
        }
      })
      return l.join(', ')
    };

    return (
      <Panel collapsible defaultExpanded header="Mental Health">
        <p><strong>Current Condition: </strong> {c.madness.length > 0 ? madnessListShort() : 'Normal'}</p>
        <ListGroup>
          {madnessListLong}
          <ListGroupItem><a onClick={this.addInsanity}><i class="fa fa-plus"></i> <strong>Add Insanity</strong></a></ListGroupItem>
        </ListGroup>

      </Panel>
    );
  }
}
