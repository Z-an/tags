import React, {useState} from 'react'
import ReactorIcon from './ReactorIcon'

import { Query } from 'react-apollo'
import { GET_REACTORS } from '../Queries'

export const Reactors = (props) => {
  const[top, setReactors] = useState({total: null, reactors: [null], react: null})
  console.log(top)

  let compare = (a, b) => {
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
  
  return (
    <Query query={GET_REACTORS} variables={{tagId: props.tagId}} pollInterval={100000}>
      {({ loading, error, data}) => { 
        if (loading) return null
        else if (error) return `Error! ${error.message}`
        else if (data.reactors===[]) return null
        setReactors((data.reactors.sort(compare)[0]))
     return (
      <div>{ top.reactors.map((reactor: any) => <ReactorIcon className='header-user-icon' id={reactor}/>)}</div>
      )
    }}
    </Query>
  )
}