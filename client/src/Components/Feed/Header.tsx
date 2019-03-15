import React, {Fragment, useState} from 'react'
import { connect } from 'react-redux'
import ActiveUsers from './Header/ActiveUsers'
import Button from '@material-ui/core/Button'
import Headroom from 'react-headroom'
import {signOut} from '../../Actions/index'

import '../../Styles/Header.css'

const mapStateToProps = (state) => {
  return {merchant: state.merchant}
}

function mapDispatchToProps(dipatch) {
  return { signOut: () => dipatch(signOut(null)) }
}

import { ReactComponent as Search } from '../../Assets/search.svg'
import { ReactComponent as Filter } from '../../Assets/filter.svg'
import { ReactComponent as BackArrow } from '../../Assets/back-arrow.svg'

const ConnectedHeader = (props) => {
  const signOut = () => {
    props.signOut()
    window.location.href = `/`
  }
  if (!props.docked) { return null }
  const [headerType,setHeader] = useState('none')
  return (
    <Fragment>
      <div className='header-base'>
        <div className='top-row'>
          <BackArrow className='back-arrow' onClick={() => signOut()}/>
          <div className='to-top-button' onClick={() => window.scrollTo(0, 0)}>{props.merchant.name}</div>
          <div className='toggle-header' 
            onClick={() => (headerType==='none')? setHeader('social'):((headerType==='social')? setHeader('score'):setHeader('none'))}>
            {headerType==='social' && 'See score' || headerType==='score' && 'See none' || headerType==='none' && 'See social'}
          </div>
          <div className='search-filter-container'>
          <Filter className='filter-button'/>
          <Search className='search-button'/>
          </div>
        </div>
        
        <div className='second-row'>
          { headerType==='social' && 
            <div className='social-header'>
              <div className='social'>Friends who have eaten here</div>
              <ActiveUsers />
            </div>
          } { headerType==='score' &&
            <div className='score-header'>
              yare yare daze
            </div>
          }
        </div>
      </div>
    </Fragment>
  )
}

const Header = connect(mapStateToProps,mapDispatchToProps)(ConnectedHeader)

export default Header