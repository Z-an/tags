import React from 'react'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import { GET_ACTIVE } from '../../../Queries'
import UserCarouselIcon from './UserCarouselIcon'
import Loading from '../../Loading'
import '../../../Styles/Tag.css'

const mapStateToProps = (state,ownProps) => {
  const recentReactors = state.tags[ownProps.tagID].recentReactors
  return {recentReactors: recentReactors===[]? [null]:(recentReactors.length>7? recentReactors.slice(recentReactors.length-7,recentReactors.length):recentReactors)}
}

export const ConnectedUsersCarousel = (props) => {
  const style = props.style
  return (
    <div className={'carousel-container'}>
      {props.recentReactors.map( reactor => 
        <UserCarouselIcon user={reactor} style={style} />
      )}
    </div>
  )
}

export const UsersCarousel = connect(mapStateToProps)(ConnectedUsersCarousel)