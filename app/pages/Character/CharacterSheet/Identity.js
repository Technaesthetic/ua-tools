import React from 'react';
import * as CharacterActions from '../../../actions/CharacterActions';
import { Label, Panel, ListGroup, ListGroupItem, Button, FormControl, Form, FormGroup, Radio } from 'react-bootstrap';

import IdentityFeature from './IdentityFeature'

export default class Identity extends React.Component {
  constructor() {
    super();
    this.state = {
      identity: {},
      edit: false,
      oldIdentity: {}
    }
    this.setEdit = this.setEdit.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangePercent = this.handleChangePercent.bind(this)
    this.handleChangeOfCourse = this.handleChangeOfCourse.bind(this)
    this.setNormal = this.setNormal.bind(this)
    this.setSupernatural = this.setSupernatural.bind(this)
    this.changeSubAbility = this.changeSubAbility.bind(this)
    this.changeSupernatural = this.changeSupernatural.bind(this)
    this.changeFeatureType = this.changeFeatureType.bind(this)
    this.changeFeatureValue = this.changeFeatureValue.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
    this.saveEdit = this.saveEdit.bind(this)
  }

  componentWillMount() {
    this.setState({id: this.props.identityId, charId: this.props.charId})
    var newIdentity = this.props.identity
    if (newIdentity.type === 'new') {
      newIdentity.type = 'normal'
      this.setState({edit: true})
    }
    this.setState({identity: newIdentity})
    if (this.props.edit) {
      this.setState({edit: this.props.edit})
    }
  }

  componentWillReceiveProps() {
    this.setState({identity: this.props.identity})
  }

  setEdit(v) {
    this.setState({edit: v})
  }

  cancelEdit() {
    CharacterActions.refresh()
    this.setState({edit: false})
  }

  saveEdit() {
    var identity = this.state.identity
    console.log(this.state.identity)
    CharacterActions.updateItem(this.state.charId, {'identities' : identity}, 'ArrPush')
    this.setEdit(false)
  }

  handleChangeName(e) {
    var newIdentity = this.state.identity
    newIdentity.name = e.target.value
    this.setState({identity: newIdentity})
  }
  handleChangePercent(e) {
    var newIdentity = this.state.identity
    newIdentity.percent = e.target.value
    this.setState({identity: newIdentity})
  }
  handleChangeOfCourse(e) {
    var newIdentity = this.state.identity
    newIdentity.ofCourse = e.target.value
    this.setState({identity: newIdentity})
  }

  setSupernatural() {
    var newIdentity = this.state.identity
    newIdentity.type = 'supernatural'
    newIdentity.features = [
      {
        type: 'Casts Rituals'
      },
      {
        type: 'Use Gutter Magick'
      }
    ]
    this.setState({identity: newIdentity})
  }
  setNormal() {
    var newIdentity = this.state.identity
    newIdentity.type = 'normal'
    this.setState({identity: newIdentity})
  }

  changeSubAbility(e) {
    var newIdentity = this.state.identity
    newIdentity.substitutes = e.target.value
    this.setState({identity: newIdentity})
  }
  changeSupernatural(e) {
    var newIdentity = this.state.identity
    newIdentity.grants = e.target.value
    this.setState({identity: newIdentity})
  }
  changeFeatureType(i, e) {
    var newIdentity = this.state.identity
    newIdentity.features[i].type = e.target.value
    this.setState({identity: newIdentity})
  }
  changeFeatureValue(i, e) {
    var newIdentity = this.state.identity
    newIdentity.features[i].value = e.target.value
    this.setState({identity: newIdentity})
    console.log(this.state.identity.features)
  }

  render() {
    const { identity } = this.props

    const textIdentity = () => {
      return (
        <Panel header={
          <span>
            <strong><big>{identity.name}</big> <i onClick={this.setEdit.bind(this, true)} class="fa fa-pencil"></i></strong>
            <big class="pull-right">{identity.percent}</big>
          </span>
        }>
          <ListGroup>
            <ListGroupItem>I'm a <strong>{identity.name}</strong>, of course I can <strong>{identity.ofCourse}</strong></ListGroupItem>
            <ListGroupItem>Substitutes for <strong>{identity.substitutes}</strong></ListGroupItem>
            <IdentityFeature feature={identity.features[0]} edit={this.state.edit} index={0} changeFeatureType={this.changeFeatureType} changeFeatureValue={this.changeFeatureValue}></IdentityFeature>
            <IdentityFeature feature={identity.features[1]} edit={this.state.edit} index={1} changeFeatureType={this.changeFeatureType} changeFeatureValue={this.changeFeatureValue}></IdentityFeature>
          </ListGroup>
        </Panel>
      )
    }

    const editIdentity = () => {
      const setWidth = function (w = '1ex', s = '', p = '') {
        if (!w) {
          if (s) {
            w = s.length + 5 + 'ex'
          } else if (p) {
            w = p.length + 5 + 'ex'
          }
        }
        return {display:"inline-block", width:w}
      }
      const normalSelect = () => {
        return (
          <select class="form-control" style={setWidth("auto")} componentClass="select" onChange={this.changeSubAbility} value={identity.substitutes}>
            <optgroup label="Abilities">
              <option value="Fitness">Fitness</option>
              <option value="Dodge">Dodge</option>
              <option value="Status">Status</option>
              <option value="Pursuit">Pursuit</option>
              <option value="Knowledge">Knowledge</option>
              <option value="Lie">Lie</option>
              <option value="Notice">Notice</option>
              <option value="Secrecy">Secrecy</option>
              <option value="Connect">Connect</option>
              <option value="Struggle">Struggle</option>
            </optgroup>
          </select>
        )
      }
      const supernaturalSelect = () => {
        return (
          <select class="form-control" style={setWidth("auto")} componentClass="select" onChange={this.changeSupernatural} value={identity.grants}>
            <optgroup label="Supernatural Abilities">
              <option value="Avatar Archetype">Avatar</option>
              <option value="Adept School">Adept</option>
              <option value="VagueInformation">Vague Information</option>
              <option value="SpecificInformation">Specific Information</option>
              <option value="VagueProtection">Vague Protection</option>
              <option value="SpecificProtection">Specific Protection</option>
              <option value="VagueHarm">Vague Harm</option>
              <option value="SpecificHarm">Specific Harm</option>
              <option value="Influence">Influence</option>
              <option value="Versatility">Versatility</option>
            </optgroup>
          </select>
        )
      }
      return (
          <Panel header={
            <span>
              <strong><big><input class="form-control" style={setWidth('', identity.name, 'Identity Name')} placeholder="Identity Name" type="text" onChange={this.handleChangeName} value={identity.name}/></big></strong>
              &emsp;
              <Radio inline onChange={this.setNormal} checked={identity.type === 'normal' ? true : false}>Normal</Radio>
              <Radio inline onChange={this.setSupernatural} checked={identity.type === 'supernatural' ? true : false}>Supernatural</Radio>
              <big class="pull-right"><input class="form-control" placeholder="%" style={setWidth("9ex")} type="number" value={identity.percent} onChange={this.handleChangePercent} /></big>
            </span>
          }>
            <ListGroup>
              {identity.type === 'normal' ? <ListGroupItem>I'm a <strong>{identity.name}</strong>, of course I can <strong><FormControl style={setWidth('', identity.ofCourse, 'do what stuff?')} placeholder="do what stuff?" type="text" onChange={this.handleChangeOfCourse} value={identity.ofCourse}/></strong></ListGroupItem> : null}
              <ListGroupItem>
                {identity.type == 'normal' ? 'Substitutes for' : 'Grants'}
                &emsp;
                {identity.type === 'normal' ? normalSelect() : null}
                {identity.type === 'supernatural' ? supernaturalSelect() : null}
              </ListGroupItem>
              <IdentityFeature feature={identity.features[0]} edit={this.state.edit} index={0} changeFeatureType={this.changeFeatureType} changeFeatureValue={this.changeFeatureValue}></IdentityFeature>
              <IdentityFeature feature={identity.features[1]} edit={this.state.edit} index={1} changeFeatureType={this.changeFeatureType} changeFeatureValue={this.changeFeatureValue}></IdentityFeature>
            </ListGroup>
            <Button bsStyle="success" onClick={this.saveEdit}>Save</Button>
            <Button bsStyle="primary" onClick={this.cancelEdit}>Cancel</Button>
            <Button bsStyle="danger">Delete</Button>
          </Panel>
      )
    }

    if (!this.state.edit) {
      return textIdentity()
    } else {
      return editIdentity()
    }
  }
}
