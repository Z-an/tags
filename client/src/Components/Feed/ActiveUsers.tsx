import React from 'react'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import { GET_ACTIVE } from '../../Queries'
import ActiveUserIcon from './ActiveUserIcon'
import Loading from '../Loading'
import '../../Styles/Header.scss'

const mapStateToProps = (state) => {
  return {merchantID: state.merchant.id}
}

export const ConnectedActiveUsers = (props) => {
  return (
    <Query query={GET_ACTIVE} variables={{merchantId: props.merchantID}}>
      {({ loading, error, data}) => {
        if (loading) return <div className='actives-container'><Loading style={'actives-loading'}/></div>
        else if (error) return `Error! ${error.message}`
      return (
        <div className='actives-container'>
          {data.activeUsers.map( user => 
            <ActiveUserIcon className='header-actives' user={user}
            />
          )}
        </div>
      )
      }}
    </Query>
  )
}

const ActiveUsers = connect(mapStateToProps)(ConnectedActiveUsers)

export default ActiveUsers