import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { REACT_SUBSCRIPTION } from '../../Subscriptions/index'
import { Subscription } from 'react-apollo'
import { useSubscription } from 'react-apollo-hooks'
import '../../Styles/Tag.scss'
import Emoji from './Reacts/Emoji'

export const NewReactIndicator = (props) => {
  const { data, error, loading } = useSubscription(REACT_SUBSCRIPTION, {
    variables: {tagId: props.tagID, userId: 'ahah'},
    onSubscriptionData: ({client,subscriptionData}) => {
      console.log(subscriptionData)
    }
  })
  return ( null ) /*
    <Fragment>
    <Subscription subscription={REACT_SUBSCRIPTION}
      variables={{tagId: props.tagID, userId: 'ahah'}}
      shouldResubscribe={true}>
      {({data,error,loading}) => {
        if (loading) return <div>listening</div>
        else if (error) return null
        else if (data.someoneReacted.unreact) { props.decrement; return null}
        else {
          return (
            <div className='react-notification'>
              <img className= 'react-notification-icon' src={data.someoneReacted.user.icon} alt={data.someoneReacted.user.name}/>
              <Emoji emoji={data.someoneReacted.reactId} style={'react-notification-emoji'}/>
            </div>
          )
      }}}
    </Subscription>
    <div className='invisble'>{props.react}</div>
    </Fragment>
  )*/
}