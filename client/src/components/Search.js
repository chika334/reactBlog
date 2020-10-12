import React, { Component } from 'react'
import Banner from './Banner';
import '../css/search.scss';
import {MdSearch} from 'react-icons/md'

export class Search extends Component {
  render() {
    return (
      <Banner>
        <input placeholder="search blog" className="searchText" type="text"/>
        <button className="button-blog"><MdSearch size={25} /></button>
      </Banner>
    )
  }
}

export default Search
