import React, { Component } from 'react'
import {logout} from '../_actions/user_actions'
import {connect} from 'react-redux'
import{NavItem, NavLink} from 'reactstrap'
import PropTypes from 'prop-types'

export class Logout extends Component {
  static propType = {
    logout: PropTypes.func.isRequired
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <NavItem>
          <NavLink onClick={this.props.logout} href="/signin">Signout</NavLink>
        </NavItem>
      </div>
    )
  }
}

export default connect(null, {logout})(Logout)
