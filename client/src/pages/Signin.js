import React, { Component } from 'react'
import '../css/signin.scss';
// import '../css/signin.css';
import {connect} from 'react-redux' 
import {signin} from '../_actions/user_actions';
import PropTypes from 'prop-types';
import {clearErrors} from '../_actions/error_action'
import {Alert} from 'react-bootstrap'
import {Redirect, Link} from 'react-router-dom'
import { Row, Col } from 'reactstrap'; 

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

export class Signin extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      email: '',
      password: '',
      msg: null,
      redirect: false,
      formErrors: {
        email: '',
        password: ''
      }
    }
  }

  static propType = {
    auth: PropTypes.object.isRequired,
    signin: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const {error, isAuthenticated} = this.props
    if (error !== prevProps.error) {
      // check for register error
      if (error.id === 'LOGIN_FAIL') {
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
    const {email, password} = this.state

    const user = {
      email, 
      password
    }
    // console.log(user)
    this.props.signin(user)
  }

  handleForgot = (e) => {
    e.preventDefault()
    // console.log("Good")
    return <Redirect to="/forgot" />
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    let formErrors = {...this.state.formErrors}

    switch (name) {
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
      // alert("done");
      // console.log("done")
      return <Redirect to="/profile" />
    }
    return (
      <div>
        <div>
          <form className="forms" onSubmit={this.handleSubmit}>
            <h2 className="header">Signin</h2>
            {this.state.msg ? <Alert variant="danger">{this.state.msg}</Alert> : null}
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
            <div className="but">
              <button 
                onSubmit={this.handleSubmit}
                type="submit" 
                className="submit">
                Submit
              </button>
            </div>
          </form>
          <hr />
        </div>
          <div className="final-bottom">
            <small className="small">Or <a href="/signup">Signup</a></small>
            <Link to="/forgot" className="forgot">
              Forgot Password
            </Link>
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

export default connect(mapStateToProps, {signin, clearErrors})(Signin)
