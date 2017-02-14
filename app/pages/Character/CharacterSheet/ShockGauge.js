import React from 'react';

export default class ShockGauge extends React.Component {
  constructor() {
    super();
  }

  render() {
    const hardNotches = () => {
      var n = 1
      var s = ''
      while (n <= 9) {
        if (this.props.notches.hardened - n >= 0) {
          s = s + 'X'
        } else {
          s = s + 'O'
        }
        n++
      }
      return s
    }
    const failedNotches = () => {
      var n = 1
      var s = ''
      while (n <= 5) {
        if (this.props.notches.failed - n >= 0) {
          s = s + 'X'
        } else {
          s = s + 'O'
        }
        n++
      }
      return s
    }
    return (
      <p>{this.props.gauge}: {hardNotches()} | {failedNotches()}</p>
    );
  }
}
