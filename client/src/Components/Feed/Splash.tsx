import React, { PureComponent, Fragment } from 'react'
import '../../Styles/Splash.css'
import { connect } from 'react-redux'

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
        <BackArrow className='left-arrow' onClick={() => {window.location.href = "/"}}/>
      </div>
      <div className='img-container'>
          {this.props.merchant.splash.map(url => <img key={url} className='splash-img' src={url}/>)}
      </div>
      </Fragment>
    )
  }
}

const Splash = connect(mapStateToProps)(ConnectedSplash)

export default Splash 