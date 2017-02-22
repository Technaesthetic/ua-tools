import React from 'react';
import * as CharacterActions from '../../../actions/CharacterActions';
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import TextInput from '../../../utils/TextInput'

export default class Field extends React.Component {
  constructor() {
    super();
    this.state = {edit:false, value:'', fieldName:''}
    this.setEdit = this.setEdit.bind(this)
    this.saveEdit = this.saveEdit.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onEnter = this.onEnter.bind(this)
  }

  componentWillMount() {
    this.setState({value: this.props.value, fieldName: this.props.fieldName})
  }

  componentWillReceiveProps(p) {
    this.setState({value: p.value})
  }

  setEdit(v) {
    this.setState({edit: v})
  }

  saveEdit() {
    var f = {}
    f[this.props.fieldName] = this.state.value
    CharacterActions.updateItem(this.props.id, f)
    this.setEdit(false)
  }

  cancelEdit() {
    this.setState({value: this.props.value})
    this.setEdit(false)
  }

  handleChange(e) {
    this.setState({value: e.target.value})
  }

  onEnter(e) {
    if (e.which === 13) {
      this.saveEdit()
    }
  }

  // const change = () => {
  //   var fields = {}
  //   fields[''] = ((c.gauges[gauge].hardened - 1) >= 1 ? c.gauges[gauge].hardened - 1 : 1)
  //   CharacterActions.updateItem(c._id, fields)
  // }

  render() {
    const { display, value, id, fieldName } = this.props
    const { edit } = this.state

    const getElement = () => {
      if (edit === true) {
        return (
          // <span>
          //   <TextInput copy={this.state.value} handleChange={this.handleChange.bind(this)} onEnter={this.onEnter.bind(this)}/>
          // </span>
          <div>
            <FormGroup controlId="formInlineName">
              <ControlLabel>{display}:&#160;</ControlLabel>
              <i class="fa fa-times pull-right fa-lg text-danger" onClick={this.cancelEdit.bind(this)}></i>
              <i class="fa fa-check pull-right fa-lg text-success" onClick={this.saveEdit.bind(this, fieldName, this.state.value)}></i>
              <FormControl type="text" value={this.state.value} onChange={this.handleChange.bind(this)} onKeyDown={this.onEnter} />

            </FormGroup>

          </div>
        )
      } else {
        return (
          <span>
            <strong>{display}:</strong> {this.state.value} <i class="fa fa-pencil pull-right fa-lg text-primary" onClick={this.setEdit.bind(this, true)}></i>
          </span>
        )
      }
    }

    return (
      <span>
        {getElement()}
      </span>
    );
  }
}
