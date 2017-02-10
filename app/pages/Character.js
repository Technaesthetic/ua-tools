import React from 'react';
import * as TestActions from '../actions/TestActions';
import testStore from '../stores/testStore';

import Item from './About/Item';



export default class Character extends React.Component {
  constructor() {
    super();
    this.state = {
      testList: testStore.getAll(),
      newName: ''
    };
    this.addItem = this.addItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    testStore.on('change', () => {
      this.setState({
        testList: testStore.getAll()
      })
    })
  }

  handleChange(e) {
    const text = e.target.value;
    this.setState({
      newName: text
    });
  }

  deleteItem(_id) {
    TestActions.deleteItem(_id);
  }

  editItem(_id, text) {
    const newText = prompt('Enter new text', text);
    if (newText) {
      TestActions.updateItem(_id, { text : newText });
    }
  }

  addItem() {
    TestActions.createItem(this.state.newName)
    this.setState({
      newName: ''
    });
  }

  render() {
    const { params } = this.props
    const { query } = this.props.location
    const { testList } = this.state
    const testComponents = testList.map((item) => {
      return <li id={item._id}>{item.bio.firstName + ' ' + item.bio.lastName}</li>
    });
    return (
      <div>
        <h1>Character</h1>
        <h3>{params.section}</h3>
        <h4>{query.thing}</h4>
        <ul>{testComponents}</ul>
        <input type="text" value={this.state.newName} onChange={this.handleChange}/>
        <button class="button" onClick={this.addItem.bind(this)}>+ Add</button>
      </div>
    );
  }
}
