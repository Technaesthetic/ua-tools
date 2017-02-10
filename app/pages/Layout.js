import React from 'react';
import { Link } from 'react-router';


export default class Layout extends React.Component {

  render() {
    const isActive = this.props.history.isActive;
    return (
      <div>
        <h1>Unknown Armies Character Tools</h1>
        <Link to=""><button class={isActive("", true) ? "button success" : "button"}>Home</button></Link>
        <Link to="settings"><button class={isActive("settings") ? "button success" : "button"}>Settings</button></Link>
        <Link to="character"><button class={isActive("character") ? "button success" : "button"}>Character</button></Link>
        {this.props.children}
      </div>
    );
  }
}
