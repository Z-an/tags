import React, { Fragment, PureComponent } from 'react'

import { connect } from 'react-redux'

import EmojiSelect from './EmojiSelect'
import { Subscription } from 'react-apollo'
import { REACT_SUBSCRIPTION } from '../../../Queries'
import ReactsTotal from './ReactsTotal'
import IsVisible from 'react-is-visible'
import { Voter } from './Voter'

import '../../../Styles/Reactor.scss'

class Reactor extends PureComponent<any> {
  render() {
    return (
      <Fragment>
        <ReactsTotal tagID={this.props.tagID} />
        <EmojiSelect tagId={this.props.tagID} />
      </Fragment>
    )
  }
}

export default Reactor