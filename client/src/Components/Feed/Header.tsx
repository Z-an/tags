import React from 'react'
import { connect } from 'react-redux'
import Headroom from 'react-headroom'
import ActiveUsers from './ActiveUsers'
import Button from '@material-ui/core/Button'

import '../../Styles/Header.scss'

const mapStateToProps = (state) => {
  return {merchant: state.merchant}
}

const ConnectedHeader = (props) => {
  if (!props.docked) { return null }
  return (
    <div className='header-base'>
      <div className='to-top-button'>{props.merchant.name}</div>
      <ActiveUsers />
    </div>
  )
}

const Header = connect(mapStateToProps)(ConnectedHeader)

export default Header