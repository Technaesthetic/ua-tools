import React from 'react';
import * as CharacterActions from '../../../actions/CharacterActions';
import { Label, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

export default class Injury extends React.Component {
  constructor() {
    super();
    this.state = {
      edit: false
    }
    this.setEdit = this.setEdit.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
    this.saveEdit = this.saveEdit.bind(this)
    this.removeInjury = this.removeInjury.bind(this)
    this.handleChangeAmount = this.handleChangeAmount.bind(this)
    this.handleChangeOrigin = this.handleChangeOrigin.bind(this)
    this.onEnter = this.onEnter.bind(this)
  }

  componentWillMount() {
    this.setState({amount: this.props.amount, origin: this.props.origin, id: this.props.injuryId, charId: this.props.id})
    if (this.props.edit) {
      this.setState({edit: this.props.edit})
    }
  }

  componentWillReceiveProps() {
    this.setState({amount: this.props.amount, origin: this.props.origin, id: this.props.injuryId, charId: this.props.id})
  }

  handleChangeAmount(e) {
    this.setState({amount: parseInt(e.target.value)})
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

  removeInjury() {
    var f = {
      _id: this.state.id
    }
    CharacterActions.updateItem(this.state.charId, {'wounds.list' : f}, 'ArrPull')
    this.setEdit(false)
  }

  saveEdit() {
    var f = {
      amount: this.state.amount,
      origin: this.state.origin
    }
    CharacterActions.updateItem(this.state.charId, {'wounds.list' : f}, 'ArrPush')
    this.setEdit(false)
  }

  render() {
    const { amount, origin } = this.props
    const { edit } = this.state

    const element = () => {
      if (edit === true) {
        return (
          <ListGroupItem>
            Took
            <input class="form-control"
              style={{display:'inline-block', width:'10ex'}}
              type="number"
              value={this.state.amount}
              onChange={this.handleChangeAmount}
              onKeyDown={this.onEnter}
            />
             wounds from
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
            Took <strong>{amount}</strong> wounds from <strong>{origin}</strong>
            <i class="fa fa-trash pull-right fa-lg text-danger" onClick={this.removeInjury}></i>
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
