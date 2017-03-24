import React from 'react';
import * as CharacterActions from '../../../actions/CharacterActions';
import {ListGroupItem} from 'react-bootstrap';

export default class IdentityFeature extends React.Component {
  constructor() {
    super();
    this.state = {
      feature: {},
      edit: false
    }
  }

  componentWillMount() {
    this.setState({edit: this.props.edit, feature: this.props.feature})
  }

  componentWillReceiveProps() {
    this.setState({edit: this.props.edit, feature: this.props.feature})
  }

  setEdit(v) {
    this.setState({edit: v})
  }

  render() {
    const { feature } = this.props

    const textFeature = () => {
      return (
          <ListGroupItem><strong>{feature.type} {feature.value}</strong></ListGroupItem>
      )
    }

    const editFeature = () => {
      const setWidth = function () {
        return {display:"inline-block", width: 'auto'}
      }
      const mainSelect = () => {
        return (
          <select class="form-control" style={setWidth()} componentClass="select" onChange={this.props.changeFeatureType.bind(this, this.props.index)} value={feature.type}>
            <optgroup label="Feature Type">
              <option value="Coerces a Meter">Coerces a Meter</option>
              <option value="Evaluates a Meter">Evaluates a Meter</option>
              <option value="Resist Shocks to Meter">Resist Shocks to Meter</option>
              <option value="Provides Firearm Attacks">Provides Firearm Attacks</option>
              <option value="Provides Wound Threshold">Provides Wound Threshold</option>
              <option value="Provides Initiative">Provides Initiative</option>
              <option value="Medical">Medical</option>
              <option value="Therapeutic">Therapeutic</option>
              <option value="Casts Rituals">Casts Rituals</option>
              <option value="Use Gutter Magick">Use Gutter Magick</option>
              <option value="Unique">Unique</option>
            </optgroup>
          </select>
        )
      }
      const meterList = ["Coerces a Meter", "Evaluates a Meter", "Resist Shocks to Meter"]
      const meterSelect = () => {
        return (
          <select class="form-control" style={setWidth()} componentClass="select" onChange={this.props.changeFeatureValue.bind(this, this.props.index)} value={feature.value}>
            <optgroup label="Meters">
              <option value="helplessness">Helplessness</option>
              <option value="isolation">Isolation</option>
              <option value="self">Self</option>
              <option value="unnatural">Unnatural</option>
              <option value="violence">Violence</option>
            </optgroup>
          </select>
        )
      }
      return (
          <ListGroupItem>{mainSelect()}&emsp;{meterList.indexOf(feature.type) != -1 ? meterSelect() : null}</ListGroupItem>
      )
    }

    if (!this.state.edit) {
      return textFeature()
    } else {
      return editFeature()
    }
  }
}
