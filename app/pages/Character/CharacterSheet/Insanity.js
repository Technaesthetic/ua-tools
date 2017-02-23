import React from 'react';
import * as CharacterActions from '../../../actions/CharacterActions';
import { Label, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

export default class Insanity extends React.Component {
  constructor() {
    super();
    this.state = {
      edit: false
    }
    this.setEdit = this.setEdit.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
    this.saveEdit = this.saveEdit.bind(this)
    this.removeInsanity = this.removeInsanity.bind(this)
    this.handleChangeType = this.handleChangeType.bind(this)
    this.handleChangeOrigin = this.handleChangeOrigin.bind(this)
    this.onEnter = this.onEnter.bind(this)
  }

  componentWillMount() {
    this.setState({type: this.props.type, origin: this.props.origin, id: this.props.insanityId, charId: this.props.id})
    if (this.props.edit) {
      this.setState({edit: this.props.edit})
    }
  }

  componentWillReceiveProps() {
    this.setState({type: this.props.type, origin: this.props.origin, id: this.props.insanityId, charId: this.props.id})
  }

  handleChangeType(e) {
    this.setState({type: e.target.value})
  }

  handleChangeOrigin(e) {
    this.setState({origin: e.target.value})
  }

  setEdit(v) {
    this.setState({edit: v})
  }

  cancelEdit() {
    CharacterActions.refresh()
  }

  onEnter(e) {
    if (e.which === 13) {
      this.saveEdit()
    }
  }

  removeInsanity() {
    var f = {
      _id: this.state.id
    }
    CharacterActions.updateItem(this.state.charId, {'madness' : f}, 'ArrPull')
    this.setEdit(false)
  }

  saveEdit() {
    var f = {
      type: this.state.type,
      origin: this.state.origin
    }
    CharacterActions.updateItem(this.state.charId, {'madness' : f}, 'ArrPush')
    this.setEdit(false)
  }

  render() {
    const { type, origin } = this.props
    const { edit } = this.state

    const element = () => {
      if (edit === true) {
        return (
          <ListGroupItem>
            <input class="form-control"
              style={{display:'inline-block', width:'auto'}}
              type="text"
              value={this.state.type}
              onChange={this.handleChangeType}
              onKeyDown={this.onEnter}
            />
            &#160;from&#160;
            <input class="form-control"
              style={{display:'inline-block', width:'auto'}}
              type="text"
              value={this.state.origin}
              onChange={this.handleChangeOrigin}
              onKeyDown={this.onEnter}
            />
            <i class="fa fa-times pull-right fa-lg text-danger" onClick={this.cancelEdit}></i>
            <i class="fa fa-check pull-right fa-lg text-success" onClick={this.saveEdit}></i>
          </ListGroupItem>
        )

      } else {
        return (
          <ListGroupItem>
            <strong>{type}</strong> from <strong>{origin}</strong>
            <i class="fa fa-trash pull-right fa-lg text-danger" onClick={this.removeInsanity}></i>
            <i class="fa fa-pencil pull-right fa-lg text-primary" onClick={this.setEdit.bind(this, true)}></i>
          </ListGroupItem>
        )

      }
    }

    return (
      element()
    );
  }
}
