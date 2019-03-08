import React, {useState, Fragment} from 'react'

import Emoji from './Emoji'

import { useQuery } from 'react-apollo-hooks'
import { GET_REACTORS } from '../../../Queries'
import { connect } from 'react-redux'

import '../../../Styles/TopReact.scss'

const mapStateToProps = (state,ownProps) => {
  let tagID = ownProps.tagID
  return {reactors: state.tags[tagID].reactors, reacts: state.tags[tagID].reacts }
}

const ConnectedTopReact = (props) => {
  let reactTotal = props.reactors.reduce(function(prev, cur) {
    return prev + cur.total
  }, 0)

  const compare = (a, b) => {
    const totalA = a.total
    const totalB = b.total

    let comparison = 0;
    if (totalA > totalB) {
      comparison = -1;
    } else {
      comparison = 1;
    }
    return comparison;
  }

  const[top, setTop] = useState(props.reactors.sort(compare)[0])
  const[total, setTotal] = useState(reactTotal)
  const[initialized,init] = useState(false)

  if (total > 0) {
    return (
      <Fragment>
        <Emoji emoji={top.react} style='top-react'/>
        <div className='top-react-container'>
          {Math.round((top.total/total)*100)}%
        </div>
      </Fragment>
    )
  } else return null
}

const TopReact = connect(mapStateToProps)(ConnectedTopReact)

export default TopReact