import React, { Component } from 'react'
import '../css/signin.scss';
import {connect} from 'react-redux' 
import {signup} from '../_actions/user_actions';
import PropTypes from 'prop-types';
import {clearErrors} from '../_actions/error_action'
import {Alert} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

export class Signup extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      name: '',
      email: '',
      password: '',
      msg: null,
      redirect: false,
      formErrors: {
        name: '',
        email: '',
        password: ''
      }
    }
  }

  static propType = {
    auth: PropTypes.object.isRequired,
    signup: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const {error, isAuthenticated} = this.props
    if (error !== prevProps.error) {
      // check for register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({msg: error.msg.msg})
      } else {
        this.setState({msg: null})
      }
    }

    // if authenticated redirect
    if(isAuthenticated) {
      this.setState({redirect: true})
      this.sendRedirect();
    }
  }

  sendRedirect = () => {
    this.props.clearErrors()
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {name, email, password} = this.state

    const user = {
      name,
      email, 
      password
    }
    // console.log(user)
    this.props.signup(user)
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    let formErrors = {...this.state.formErrors}

    switch (name) {
      case "name":
        formErrors.name =
        value.length < 6 ? "minimum of 6 characters required" : ""
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
        ? "" 
        : "invalid email address";
        break;
      case "password":
        formErrors.password = 
        value.length < 6 ? "minimum of 6 characters required" : ""
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value })
  }
  
  render() {
    const {formErrors} = this.state;
    if (this.state.redirect) {
      return <Redirect to="/profile" />
    }
    return (
      <div>
        <div className="forms" onSubmit={this.handleSubmit}>
          <h2 className="header">Signup</h2>
          {this.state.msg ? <Alert variant="danger">{this.state.msg}</Alert> : null}
          
          <div className="forms-form-group">
            <label>Name</label>
            <input 
              type="text" 
              className="name" 
              value={this.state.name}
              name="name"
              placeholder="Enter Username"
              onChange={this.handleChange}
            />
            {formErrors.name.length > 0 && (
              <span className="errorMessage">{formErrors.name}</span>
            )}
          </div>

          <div className="forms-form-group">
              <label>Email</label>
              <input 
                type="email" 
                className="email" 
                value={this.state.email}
                name="email"
                placeholder="Enter Email"
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>

            <div className="forms-form-group">
              <label>Password</label>
              <input 
                type="password" 
                className="password" 
                value={this.state.password}
                name="password"
                placeholder="Enter Password"
                onChange={this.handleChange}
                />
                {formErrors.password.length > 0 && (
                  <span className="errorMessage">{formErrors.password}</span>
                )}
            </div>

          <div className="createAccount">
            <button 
              onClick={this.handleSubmit}
              type="button" 
              className="submit">Submit</button>
            {/* <small className="small">Don't have an account?? <a href="/signup">Signup</a></small> */}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  error: state.error
})

export default connect(mapStateToProps, {signup, clearErrors})(Signup)
