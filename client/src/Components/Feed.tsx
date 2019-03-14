import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'

import Wall from './Feed/Wall'
import Header from './Feed/Header'
import Splash from './Feed/Splash'
import { WhatsHot } from './Feed/WhatsHot'
import { TagView } from './Feed/TagView'

import { Waypoint } from 'react-waypoint';

import CreatorButton from './Feed/CreatorButton'
import { CreatorPanel } from './Feed/CreatorPanel'
import { Reporter } from './Feed/Reporter'

import '../Styles/Feed.css'

const mapStateToProps = (state,ownProps) => {
  return {merchant: {name: ownProps.match.params.name} }
}

const ConnectedFeed: React.FC<any> = (props) => {
  const[docked,toggleDocked] = useState(false)
  return (
    <Fragment>
      <Header docked={docked}/>
      <CreatorPanel docked={true}/>
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

const Feed = connect(mapStateToProps)(ConnectedFeed)

export default Feed