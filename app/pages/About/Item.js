import React from 'react';
import * as TestActions from '../../actions/TestActions';


export default class Item extends React.Component {
  constructor() {
    super();
  }

  render() {
      return <li>{this.props.text} <i class="fa fa-times" onClick={this.props.deleteItem.bind(null, this.props._id)}></i><i class="fa fa-pencil" onClick={this.props.editItem.bind(null, this.props._id, this.props.text)}></i></li>;

  }
}
