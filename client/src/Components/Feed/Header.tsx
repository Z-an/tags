import React, {Fragment, useState} from 'react'
import { connect } from 'react-redux'
import Headroom from 'react-headroom'
import ActiveUsers from './ActiveUsers'
import Button from '@material-ui/core/Button'

import '../../Styles/Header.scss'

const mapStateToProps = (state) => {
  return {merchant: state.merchant}
}

import { ReactComponent as Search } from '../../Assets/search.svg'
import { ReactComponent as Filter } from '../../Assets/filter.svg'
import { ReactComponent as BackArrow } from '../../Assets/back-arrow.svg'
import { SocialHeader } from './SocialHeader'

const ConnectedHeader = (props) => {
  if (!props.docked) { return null }
  const [headerType,setHeader] = useState('none')
  return (
    <Fragment>
    <div className='header-base'>
      <div className='top-row'>
        <BackArrow className='back-arrow'/>
        <div className='to-top-button'>{props.merchant.name}</div>
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

const Header = connect(mapStateToProps)(ConnectedHeader)

export default Header