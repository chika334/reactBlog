import React, { Component } from 'react'
import '../../../css/categories.scss'
import {createTag} from '../../../_actions/categories'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export class Createtag extends Component {
  state = {
    tag: ''
  }

  static proptype = {
    createTag: PropTypes.func.isRequired
  }

  handleChange = e => {
    const {name, value} = e.target;
    this.setState({[name]: value})
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log(this.state.tag)
  }
  render() {
    return (
      <div className="tag">
        <form onSubmit={this.handleSubmit} noValidate>
          <label>Create Tag</label>
          <input 
            className="categoryinput" 
            type="text"
            name="tag"
            onChange={this.handleChange}
            placeholder="Enter Tag name"
            value={this.state.tag}
          />
          <button onSubmit={this.handleSubmit} className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default connect(null, {createTag})(Createtag)
