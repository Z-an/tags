import React, { useState, Fragment } from "react"
import UserIcon from './TagUserIcon'
import TopReact from './Reacts/TopReact'
import Reporter from './Reporter'
import ReactsTotal from './Reacts/ReactsTotal'
import EmojiSelect from './Reacts/EmojiSelect'
import {Voter} from './Reacts/Voter'
import { increment, decrement, openModal } from '../../Actions/index'
import { connect } from 'react-redux'
import { NewReactIndicator } from './NewReactIndicator'

import '../../Styles/Tag.scss'

const mapStateToProps = (state,ownProps) => {
  return { user: state.user }
}

function mapDispatchToProps(dispatch) {
  return { increment: tagID => { dispatch(increment(tagID))}
        , decrement: tagID => { dispatch(decrement(tagID))}
        , openModal: payload => { dispatch(openModal(payload))}}
}

const ConnectedTag: React.FC<any> = (props) =>  {
  const id = props.tagID
  const color = props.color
  const topReact = true

  return(
    <Fragment>
      <div className='tag-container'>
        <div className='tag'>
          <div className={'tag-box '+color} onClick={() => props.openModal({tagID: id, type: 'tagview'})}>
            <div className={'tag-content '+color}>
              {props.content}
            </div>
            <Voter tagID={id} increment={props.increment} decrement={props.decrement}/>
            <ReactsTotal tagID={id} />
          </div>
          <UserIcon tagID={id} color={color}/>
          <Reporter tagID={id}/>
          {topReact && <TopReact tagID={id} />}
          <EmojiSelect tagID={id} increment={props.increment} decrement={props.decrement}/>
          <NewReactIndicator userID={props.user.id} tagID={id}/>
        </div>
      </div>
    </Fragment>
  )
}

const Tag = connect(mapStateToProps,mapDispatchToProps)(ConnectedTag)

export default Tag
