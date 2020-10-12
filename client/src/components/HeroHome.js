import React, { Component } from 'react'
import Search from './Search'
import Hero from './Hero'

export class RightsideHome extends Component {
  render() {
    return (
      <Hero>
        <Search />
      </Hero>
    )
  }
}

export default RightsideHome
