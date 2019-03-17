import React, {Fragment} from 'react'
import { ReactComponent as Fire } from '../../Assets/Emoji/fire.svg'
import { ReactComponent as Search } from '../../Assets/search.svg'
import { ReactComponent as Filter } from '../../Assets/filter.svg'
import Button from '@material-ui/core/Button'
import { toggleLive, toggleUCB } from '../../Actions'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {live: state.live, ucb: state.ucb}
}

function mapDispatchToProps(dispatch) {
  return {toggleLive: payload => dispatch(toggleLive(payload)),
          toggleUCB: payload => dispatch(toggleUCB(payload))}
}
export const ConnectedWhatsHot = (props) => {
  if (props.live) {
  return (
  <Fragment>
  <div className='merchant-name-container'><div className='merchant-name'>{props.merchant.name}</div></div>
  <div className='live-container'>
  <div className='live-toggle' onClick={()=>props.toggleLive()}>Live: {props.live? 'ON':'OFF'} </div>
  <div className='whats-hot-container'>
    <div className='whats-hot'>{props.ucb? "What's hot":"What's top"}</div>
    <div className='button-container'>
      <Filter onClick={()=> props.toggleUCB()} className='filter-button'/>
      <Search className='search-button'/>
    </div>
  </div>
  </div>
  </Fragment>
  )
  }
}

export const WhatsHot = connect(mapStateToProps,mapDispatchToProps)(ConnectedWhatsHot)