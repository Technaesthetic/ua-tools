import React from 'react';

export default class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(e) {
    const title = e.target.value;
    this.props.handleChange(title);
  }

  render() {
    return (
        <input class="form-control" type="text" value={this.props.copy} onChange={this.changeValue.bind(this)} onKeyDown={this.props.onEnter}/>
    );
  }
}
