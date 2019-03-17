import React from 'react'
import { Query } from 'react-apollo'
import Loading from '../../Loading'
import { GET_USER } from '../../../Queries/index'
import { connect } from 'react-redux'

const mapStateToProps = (state,ownProps) => {
  return {reactors: state.tags[ownProps.tagID].recentReactors}
}

export const ConnectedReactorsList = (props) => (
  <div className='reactors-container'>
    <div>
      { props.reactors.map( reactDoc =>
        reactDoc.reactId===props.view? (
          <Query query={GET_USER} variables={{id: reactDoc.userId}}>
            {({ loading, error, data}) => {
              if (loading) {return <div className='reactor'><Loading style={'loading-reactor'}/></div>}
              else if (error) {return null}
              else { return (
                <div className='reactor'>
                  <img className='reactor-image' src={data.user.icon} alt={data.user.name}/>
                  <div className='reactor-name'>{data.user.name}</div> 
                </div>
              )
            }}}
          </Query>
        ):null 
      )}
    </div>
  </div>
)

export const ReactorsList = connect(mapStateToProps)(ConnectedReactorsList)