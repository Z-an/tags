import React from 'react'
import { Query } from 'react-apollo'
import { GET_ACTIVE } from '../../Queries'
import ActiveUserIcon from './ActiveUserIcon'

export const ActiveUsers = (props) => {
  return (
    <Query query={GET_ACTIVE} variables={{merchantId: props.merchantID}}>
      {({ loading, error, data}) => {
        if (loading) return "Loading..."
        else if (error) return `Error! ${error.message}`
      return (
        <div className='active-container'>
          {data.activeUsers.map( user => 
            <ActiveUserIcon className='header-user-icon' user={user}
            />
          )}
        </div>
      )
      }}
    </Query>
  )
}