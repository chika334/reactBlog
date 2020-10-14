import React, { Component } from 'react';
import '../../../css/categories.scss';
import {createCatgory} from '../../../_actions/categories';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

export class Createcategories extends Component {
  state = {
    category: ''
  }

  static proptype = {
    createCatgory: PropTypes.func.isRequired
  }

  handleChange = e => {
    const {name, value} = e.target;
    this.setState({[name]: value})
  }

  handleSubmit = e => {
    e.preventDefault()
    const {category} = this.state;
    const cat = {
      category
    }
    // console.log(this.state.category)
    this.props.createCatgory(cat)
  }
  render() {
    return (
      <div className="category">
        <form onSubmit={this.handleSubmit}>
          <label>Create Category</label>
          <input 
            onChange={this.handleChange} 
            className="categoryinput" 
            type="text"
            name="category"
            placeholder="Enter Category name"
            value={this.state.category}
          />
          <button onSubmit={this.handleSubmit} className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default connect(null, {createCatgory})(Createcategories)
