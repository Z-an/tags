import React, {useState, Fragment} from 'react'
import ReactorIcon from './ReactorIcon'

import Emoji from './Emoji'

import { Query } from 'react-apollo'
import { GET_REACTORS } from '../../../Queries'

import '../../Styles/TopReact.scss'

export const TopReact: React.FC<any> = (props) => {
  const[reacts, initReacts] = useState({react: 'tongue',total: 0})
  const[total, setTotal] = useState(props.reactTotal)

  let topReact = ''

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

  const init = (props) => {
    initReacts(props)
    var reactTotal = props.reduce(function(prev, cur) {
      return prev + cur.total
    }, 0)
    setTotal(reactTotal)
  }

  return (
    <Query query={GET_REACTORS} variables={{tagId: props.tagId}}>
      {({ loading, error, data}) => { 
        if (loading) return null
        else if (error) return `Error! ${error.message}`
        else if (data.reactors===[]) return null
        init(data.reactors.sort(compare))
        topReact = data.reactors.sort(compare)[0].react
        if (total == 0) return null
        else if (!(typeof topReact === 'undefined')) return (
          <Fragment>
            <Emoji emoji={topReact} style='top-react'/>
            <div className='top-react-container'>
              {Math.round((data.reactors.sort(compare)[0].total/total)*100)}%
            </div>
          </Fragment>
        )
        else return ( null )
      }}
    </Query>
  )
  return null
}