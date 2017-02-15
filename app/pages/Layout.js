import React from 'react';
import { Link } from 'react-router';
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

import characterStore from '../stores/CharacterStore';


export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      characters: characterStore.getAll()
    };
  }

  componentWillMount() {
    characterStore.on('change', () => {
      this.setState({
        characters: characterStore.getAll()
      })
    })
  }
  render() {
    const isActive = this.props.history.isActive;
    const { characters } = this.state
    const chars = characters.map((item) => {
      return (
        <LinkContainer to={"character/" + item._id}>
          <MenuItem>{item.bio.firstName + ' ' + item.bio.lastName}</MenuItem>
        </LinkContainer>
      )
    });
    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">UA Tools</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavDropdown title="Characters" id="basic-nav-dropdown">
                {chars}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.props.children}
      </div>

    );
  }
}
