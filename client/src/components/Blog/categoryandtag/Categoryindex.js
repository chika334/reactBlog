import React, { Component } from 'react'
import Createcategories from './Createcategories'
import Createtag from './Createtag'
import '../../../css/categoryIndex.scss'

export class CategoryIndex extends Component {
  render() {
    return (
      <div className="categorynew">
        <Createcategories />
        <Createtag />
      </div>
    )
  }
}

export default CategoryIndex
