import React, { useState, Fragment } from "react"
import UserIcon from './Tag/TagUserIcon'
import TopReact from './Reacts/TopReact'
import ReporterButton from './Report/ReporterButton'
import ReactsTotal from './Reacts/ReactsTotal'
import EmojiSelect from './Reacts/EmojiSelect'
import {Voter} from './Reacts/Voter'
import { increment, decrement, openModal } from '../../Actions/index'
import { connect } from 'react-redux'
import { NewReactIndicator } from './Reacts/NewReactIndicator'

import '../../Styles/Tag.css'

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
  const showTopReact = false
  const showUpVote = false

  return(
    <Fragment>
      <div className='tag-container'>
        <div className='tag'>
          <div className={'tag-box '+color} >
            <div className={'tag-content '+color} onClick={() => props.openModal({tagID: id, type: 'tagview'})}>
              {props.content}
            </div>
            { showUpVote && <Voter tagID={id}/>}
            <ReactsTotal tagID={id} openModal={props.openModal}/>
          </div>
          <UserIcon tagID={id} color={color}/>
          <ReporterButton tagID={id} toggleModal={props.openModal}/>
          { showTopReact && <TopReact tagID={id} openModal={props.openModal}/>}
          <EmojiSelect tagID={id} increment={props.increment} decrement={props.decrement} toggleModal={props.openModal}/>
          <NewReactIndicator tagID={id} decrement={props.decrement} increment={props.increment} />
        </div>
      </div>
    </Fragment>
  )
}

const Tag = connect(mapStateToProps,mapDispatchToProps)(ConnectedTag)

export default Tag
