import React from 'react';
import styles from './Home.css';

import TextInput from '../utils/TextInput';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit : false,
      copy: "Some Text"
    };
    this.changeEdit = this.changeEdit.bind(this);
  }

  handleChange(copy) {
    this.setState({copy});
  }

  changeEdit() {
    console.log('Changing State');
    this.setState({edit: !this.state.edit})
  }

  render() {
    return (
      <div>
        <TextInput edit={this.state.edit} copy={this.state.copy} handleChange={this.handleChange.bind(this)} onEnter={this.changeEdit}/>
        <button type="button" class="success button" onClick={this.changeEdit}>Change</button>
      </div>
    );
  }
}
