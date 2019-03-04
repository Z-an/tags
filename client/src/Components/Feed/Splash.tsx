import React, { PureComponent, Fragment } from 'react'
import '../Styles/Feed.scss'

const preludes = ['Have your say...','What would you tell your friends...','What resonated most...']

class Splash extends PureComponent<any> {
  render() {
    return (
      <div className='splash'>
        <div className='merchant-name'>{this.props.merchant.name}</div>
      </div>
    )
  }
}

export default Splash 