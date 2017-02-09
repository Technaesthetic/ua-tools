import React from 'react';

export default class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
    this.onEnter = this.onEnter.bind(this);
  }

  changeValue(e) {
    const title = e.target.value;
    this.props.handleChange(title);
  }

  onEnter(e) {
    if (e.which === 13) {
      this.props.onEnter()
    }
  }

  render() {
    return (
      <div>
        { this.props.edit == false ? <p>{this.props.copy}</p> : null}
        { this.props.edit == true ? <input type="text" value={this.props.copy} onChange={this.changeValue.bind(this)} onKeyDown={this.onEnter}/> : null}
      </div>
    );
  }
}
