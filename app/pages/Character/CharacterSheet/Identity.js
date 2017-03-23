import React from 'react';
import * as CharacterActions from '../../../actions/CharacterActions';
import { Label, Panel, ListGroup, ListGroupItem, Button, FormControl, Form, FormGroup, Radio } from 'react-bootstrap';

export default class Identity extends React.Component {
  constructor() {
    super();
    this.state = {
      identity: {},
      edit: false
    }
    this.setEdit = this.setEdit.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangePercent = this.handleChangePercent.bind(this)
    this.handleChangeOfCourse = this.handleChangeOfCourse.bind(this)
    this.setNormal = this.setNormal.bind(this)
    this.setSupernatural = this.setSupernatural.bind(this)
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
    this.setState({identity: newIdentity})
  }
  setNormal() {
    var newIdentity = this.state.identity
    newIdentity.type = 'normal'
    this.setState({identity: newIdentity})
  }

  componentWillMount() {
    this.setState({identity: this.props.identity})
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
            <ListGroupItem><strong>{identity.features[0].type} {identity.features[0].value}</strong></ListGroupItem>
            <ListGroupItem><strong>{identity.features[1].type} {identity.features[1].value}</strong></ListGroupItem>
          </ListGroup>
        </Panel>
      )
    }

    const editIdentity = () => {
      const s = (w) => {return {display:"inline-block", width:w}}
      const normalSelect = () => {
        return (
          <select class="form-control" style={s("auto")} componentClass="select" value={identity.substitutes}>
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
          </select>
        )
      }
      const supernaturalSelect = () => {
        return (
          <select class="form-control" style={s("auto")} componentClass="select" value={identity.grants}>
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
          </select>
        )
      }
      return (
          <Panel header={
            <span>
              <strong><big><input class="form-control" style={s(identity.name.length + 5 + "ex")} type="text" onChange={this.handleChangeName} value={identity.name}/></big></strong>
              &emsp;
              <Radio inline onClick={this.setNormal} checked={identity.type === 'normal' ? true : false}>Normal</Radio>
              <Radio inline onClick={this.setSupernatural} checked={identity.type === 'supernatural' ? true : false}>Supernatural</Radio>
              <big class="pull-right"><input class="form-control" style={s("9ex")} type="number" value={identity.percent} onChange={this.handleChangePercent} /></big>
            </span>
          }>
            <ListGroup>
              {identity.type === 'normal' ? <ListGroupItem>I'm a <strong>{identity.name}</strong>, of course I can <strong><FormControl style={s(identity.ofCourse.length + 2 + "ex")} type="text" onChange={this.handleChangeOfCourse} value={identity.ofCourse}/></strong></ListGroupItem> : null}
              <ListGroupItem>
                {identity.type == 'normal' ? 'Substitutes for' : 'Grants'}
                &emsp;
                {identity.type === 'normal' ? normalSelect() : null}
                {identity.type === 'supernatural' ? supernaturalSelect() : null}
              </ListGroupItem>
              <ListGroupItem><strong>{identity.features[0].type} {identity.features[0].value}</strong></ListGroupItem>
              <ListGroupItem><strong>{identity.features[1].type} {identity.features[1].value}</strong></ListGroupItem>
            </ListGroup>
            <Button bsStyle="success">Save</Button>
            <Button bsStyle="primary">Cancel</Button>
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
