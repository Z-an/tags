import React, { useState, Fragment } from "react"
import UserIcon from './TagUserIcon'
import TopReact from './Reacts/TopReact'
import { REACT_SUBSCRIPTION } from '../../Subscriptions/index'
import Reporter from './Reporter'
import ReactsTotal from './Reacts/ReactsTotal'
import EmojiSelect from './Reacts/EmojiSelect'
import {Voter} from './Reacts/Voter'
import { increment, decrement } from '../../Actions/index'
import { connect } from 'react-redux'

import '../../Styles/Tag.scss'

function mapDispatchToProps(dispatch) {
  return { increment: tagID => { dispatch(increment(tagID))}
        , decrement: tagID => { dispatch(decrement(tagID))}}
}

const ConnectedTag = (props) =>  {
  const id = props.tagID
  const color = props.color

  return(
    <div className='tag-container'>
      <div className='tag'>
        <div className={'tag-box '+color}>
          <div className={'tag-content '+color}>
            {props.content}
          </div>
          <Voter tagID={id} increment={props.increment} decrement={props.decrement}/>
          <ReactsTotal tagID={id} />
        </div>
        <UserIcon tagID={id} color={color}/>
        <Reporter tagID={id}/>
        <TopReact tagID={id} />
        <EmojiSelect tagID={id} />
      </div>
    </div>
  )
}

const Tag = connect(null,mapDispatchToProps)(ConnectedTag)

export default Tag
