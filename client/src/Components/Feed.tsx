import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'

import Wall from './Feed/Wall'
import Header from './Feed/Header'
import Splash from './Feed/Splash'
import { WhatsHot } from './Feed/WhatsHot'
import { TagView } from './Feed/TagView/TagView'

import { Waypoint } from 'react-waypoint';

import CreatorButton from './Feed/Create/CreatorButton'
import { CreatorPanel } from './Feed/Create/CreatorPanel'
import { Reporter } from './Feed/Report/Reporter'
import { reset } from '../Actions'

import '../Styles/Feed.css'

const mapStateToProps = (state,ownProps) => {
  return {merchant: state.merchant, user: state.user }
}

function mapDispatchToProps(dispatch) {
  return { reset: payload => dispatch(reset(payload))}
}

const ConnectedFeed: React.FC<any> = (props) => {
  const[docked,toggleDocked] = useState(false)
  const[reset,toggleReset] = useState(true)
  const[open,setOpen] = useState(false)
  if (reset) {props.reset({merchant: props.merchant, user: props.user}), toggleReset(false)}

  return (
    <Fragment>
      <Header docked={docked}/>
      <div onClick={()=> setOpen(!open)}><CreatorPanel merchants={false} open={open}/></div>
      <Waypoint onEnter={() => toggleDocked(false)} onLeave={() => toggleDocked(true)}>
        <div><Splash/></div>
      </Waypoint>
      <div className='background-tags'>
        <WhatsHot merchant={props.merchant} />
        <Wall />
        <br></br>
      </div>
      <TagView />
      <Reporter />
    </Fragment>
  )
}

const Feed = connect(mapStateToProps, mapDispatchToProps)(ConnectedFeed)

export default Feed