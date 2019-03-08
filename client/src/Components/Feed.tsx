import React, { Component, Fragment } from 'react'

import Wall from './Feed/Wall'
import CreatorButton from './Feed/CreateTag/CreateButton'
import CreatorForm from './Feed/CreateTag/CreateForm'
import Header from './Feed/Header'
import Splash from './Feed/Splash'

import '../Styles/Feed.scss'

export class Feed extends Component<any,any> {
  state = {
    formOpen: false,
    ucb: true,
    merchant: { id: this.props.match.params.id
              , name: this.props.match.params.name },
    rewards: {react: 0, create: 0, moderate: 0},
    active: [],
    tags: []
  }

  toggleForm = () => {
    this.setState(prevState => ({formOpen: !prevState.formOpen}))
  }
  toggleUcb = () => {
    this.setState(prevState => ({ucb: !prevState.ucb}))
  }
  addActive = (user) => {
    this.setState(prevState => ({active: prevState.active.concat(user)}))
  }

  render() {
    return (
      <Fragment>
        <Splash merchant={this.state.merchant} />
        <Wall />
        <CreatorButton toggle={this.toggleForm} />
        <CreatorForm toggle={this.toggleForm}
                      open={this.state.formOpen}
                      merchantID={this.state.merchant.id} />
      </Fragment>
    )
  }
}