import React from 'react';

export default class ShockGauge extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <p>{this.props.gauge}: {this.props.notches.hardened} / {this.props.notches.failed}</p>
    );
  }
}
