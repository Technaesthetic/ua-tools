import React from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';


export default class Layout extends React.Component {

  render() {
    const isActive = this.props.history.isActive;
    return (
      <div>
        <h1>Unknown Armies Character Tools</h1>
        <Link to=""><Button class={isActive("", true) ? "button success" : "button"}>Home</Button></Link>
        <Link to="character"><Button class={isActive("character") ? "button success" : "button"}>Character</Button></Link>
        {this.props.children}
      </div>
    );
  }
}
