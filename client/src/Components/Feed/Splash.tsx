import React, { PureComponent, Fragment } from 'react'
import '../../Styles/Splash.scss'
import { connect } from 'react-redux'
const preludes = ['Have your say...','What would you tell your friends...','What resonated most...']

import { ReactComponent as BackArrow } from '../../Assets/back-arrow.svg'
import { ReactComponent as Leaderboard } from '../../Assets/leaderboard.svg'

const mapStateToProps = (state) => {
  return {merchant: state.merchant}
}

class ConnectedSplash extends PureComponent<any> {
  render() {
    return (
      <Fragment>
      <div className='icons-container'>
        <BackArrow className='left-arrow' onClick={() => {window.location.href = "/select"}}/>
        <Leaderboard className='leaderboard-icon'/>
      </div>
      <div className='img-container'>
          {this.props.merchant.splash.map(url => <img className='splash-img' src={url}/>)}
      </div>
      </Fragment>
    )
  }
}

const Splash = connect(mapStateToProps)(ConnectedSplash)

export default Splash 