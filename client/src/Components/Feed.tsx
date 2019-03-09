import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'

import Wall from './Feed/Wall'
import Header from './Feed/Header'
import Splash from './Feed/Splash'
import { WhatsHot } from './Feed/WhatsHot'

import { Waypoint } from 'react-waypoint';

import '../Styles/Feed.scss'

const mapStateToProps = (state,ownProps) => {
  return {merchant: {name: ownProps.match.params.name} }
}

const ConnectedFeed: React.FC<any> = (props) => {
  const[docked,toggleHeader] = useState(false)
  return (
    <Fragment>
      <Header docked={docked}/>
      <Waypoint onEnter={() => toggleHeader(false)} onLeave={() => toggleHeader(true)}>
      <div><Splash/></div>
      </Waypoint>
      <div className='background'>
        <WhatsHot merchant={props.merchant} />
        <Wall />
      </div>
    </Fragment>
  )
}

const Feed = connect(mapStateToProps)(ConnectedFeed)

export default Feed