import React from 'react'
import { Query } from 'react-apollo'
import Loading from '../Loading'
import { GET_USER } from '../../Queries/index'

export const ReactorsList = (props) => (
  <div className='reactors-container'>
    <div>
      { props.tag.reactors.map( reactDoc =>
        reactDoc.react===props.view? (reactDoc.reactors.map( userID => (
          <Query query={GET_USER} variables={{id: userID}}>
            {({ loading, error, data}) => {
              if (loading) {return <div className='reactor'><Loading style={'loading-reactor'}/></div>}
              else if (error) {return null}
              else { return (
                <div className='reactor'>
                <img className='reactor-image' src={data.user.icon} alt={data.user.name}/>
                <div className='name'>{data.user.name}</div> 
                </div>
              )
            }}}
          </Query>
        ))):null 
      )}
    </div>
  </div>
)