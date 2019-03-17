import React, {Fragment, useState} from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Headroom from 'react-headroom'
import {signOut, toggleLive, toggleUCB} from '../../Actions/index'

import '../../Styles/Header.css'

const mapStateToProps = (state) => {
  return {merchant: state.merchant, live: state.live}
}

function mapDispatchToProps(dispatch) {
  return { signOut: () => dispatch(signOut(null)),
            toggleLive: payload => dispatch(toggleLive(payload)),
            toggleUCB: payload => dispatch(toggleUCB(payload)) }
}

import { ReactComponent as Search } from '../../Assets/search.svg'
import { ReactComponent as Filter } from '../../Assets/filter.svg'
import { ReactComponent as BackArrow } from '../../Assets/back-arrow.svg'

const ConnectedHeader = (props) => {
  const signOut = () => {
    window.location.href = `/`
  }
  if (!props.docked) { return null }
  return (
    <Fragment>
      <div className='header-base'>
        <div className='top-row'>
          <BackArrow className='back-arrow' onClick={() => signOut()}/>
          <div className='to-top-button' onClick={() => window.scrollTo(0, 0)}>{props.merchant.name}</div>
          <div className='toggle-header' 
            onClick={() => props.toggleLive(false)}>
            {props.live? 'live: ON':'live: OFF'}
          </div>
          <div className='search-filter-container'>
          <Filter onClick={() => props.toggleUCB()} className='filter-button'/>
          <Search className='search-button'/>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

const Header = connect(mapStateToProps,mapDispatchToProps)(ConnectedHeader)

export default Header