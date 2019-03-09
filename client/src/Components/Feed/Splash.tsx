import React, { PureComponent, Fragment } from 'react'
import '../../Styles/Feed.scss'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { connect } from 'react-redux'
const preludes = ['Have your say...','What would you tell your friends...','What resonated most...']

const mapStateToProps = (state) => {
  return {merchant: state.merchant}
}

class ConnectedSplash extends PureComponent<any> {
  render() {
    return (
      <div className='img-container'>
          {this.props.merchant.splash.map(url => <img className='splash-img' src={url}/>)}
      </div>
    )
  }
}

const Splash = connect(mapStateToProps)(ConnectedSplash)

export default Splash 