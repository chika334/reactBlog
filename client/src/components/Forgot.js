import React, { Component } from 'react'
import {connect} from 'react-redux'
import {forgot} from '../_actions/user_actions'
import PropTypes from 'prop-types'
import {Alert} from 'react-bootstrap';
import '../css/signin.scss'
import {clearErrors} from '../_actions/error_action'
import '../css/forgot.scss';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

export class Forgot extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      email: '',
      msg: '',
      error: '',
      formErrors: {
        email: ''
      }
    }
  }

  static propTypes = {
    forgot: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  }

  componentDidUpdate(prevProps) {
    // const {auth} = this.props;
    // if (auth.msg !== null) {
    //   this.setState({ msg: auth.msg })
    // } else {
    //   console.log("bad")
    // }
    const {error, isAuthenticated, auth} = this.props
    if (prevProps.auth.msg !== null) 
    {
      // check for register error
      if (auth !== null) {
        this.setState({msg: auth.msg})
      } else {
        this.setState({msg: null})
      }
    }
    console.log(prevProps)

    // if authenticated redirect
    // if(isAuthenticated) {
      // this.setState({redirect: true})
      // this.sendRedirect();
    // }
  }

  sendRedirect = () => {
    this.props.clearErrors()
  }

  handleSubmit = e => {
    e.preventDefault();
    const {email} = this.state;

    const user = {
      email
    }
    
    this.props.forgot(user)
  }

  handleChange = (e) => {
    const {name, value} =  e.target
    let formErrors = {...this.state.formErrors}

    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value)
        ? ""
        : "Invalid email address"
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value})
  }

  render() {
    const {formErrors} = this.state
    console.log(this.props)
    return (
      <div>
        <div className="forms-guide" onSubmit={this.handleSubmit}>
        <h2 className="header">Reset Password Link</h2>
        <div>
        <hr />
            <div >
              <label>Email</label>
              <input 
                type="email" 
                className="group" 
                value={this.state.email}
                name="email"
                placeholder="Enter Email"
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <button onSubmit={this.handleSubmit} type="button" className="btn btn-primary" onClick={this.forgot}>
              Send password reset Link
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {forgot, clearErrors})(Forgot)