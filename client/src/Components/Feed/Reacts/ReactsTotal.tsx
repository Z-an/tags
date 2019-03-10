import React from 'react'
import { connect } from 'react-redux'

import '../../../Styles/Reactor.scss'

const mapStateToProps = (state,ownProps) => {
  let tagID = ownProps.tagID
  return {reacts: state.tags[tagID].reacts}
}

const ConnectedReactsTotal = (props) => (
  <div className='reacts-total'>
    <div className='reacts-total-container'>
    <div className='reacts-plus'>+  </div>
    <div>{props.reacts}</div>
  </div>
  </div>
)

const ReactsTotal = connect(mapStateToProps)(ConnectedReactsTotal)

export default ReactsTotal