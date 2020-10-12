import {Link} from 'react-router-dom'
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import Logout from '../components/Logout'

class NavBar extends Component {
  state = {
    isOpen: false
  }

 toggle = () => this.setState({isOpen: !this.state.isOpen});

  render () {
    const {user, isAuthenticated} = this.props.auth
    const users = (
      <>
        <NavItem>
          <NavLink href="/profile">{user === null ? '' : `Welcome ${user.name}`}</NavLink>
        </NavItem>
        <Logout />
      </>
    )

    const notUser = (
     <>
      <NavItem>
        <NavLink href="/signin">Signin</NavLink>
      </NavItem>
    </>
    )

    return (
      <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/blog">Blog</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/about/">About</NavLink>
          </NavItem>
            {isAuthenticated ? notUser && users : notUser}
          <NavItem>
            <Link to="/profile/createblog" className="btn btn-primary text-light">
              Write a blog
            </Link>
          </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(NavBar);