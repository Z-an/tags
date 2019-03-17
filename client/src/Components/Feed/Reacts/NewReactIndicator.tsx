import React, { useState } from 'react'
import { connect } from 'react-redux'
import { REACT_SUBSCRIPTION } from '../../../Subscriptions/index'
import { useSubscription } from 'react-apollo-hooks'
import '../../../Styles/Tag.css'
import { NewReact } from './NewReact'

const mapStateToProps = (state,ownProps) => {
  return ({ tagID: ownProps.tagID, merchant: state.merchant, userID: state.user.id })
}

export const ConnectedNewReactIndicator = (props) => {
  const [render,toggleRender] = useState(false)
  const [reactData,setReact] = useState({reactId: '', userId: '', user: {icon: '',name:''}})
  const actionProps = {tagID: props.tagID, age: props.merchant.age, rho: props.merchant.rho, reactor: {}}
  const { data, error, loading } = useSubscription(REACT_SUBSCRIPTION, {
    variables: {tagId: props.tagID, userId: props.userID},
    onSubscriptionData: ({client,subscriptionData}) => {
      setReact(subscriptionData.data.someoneReacted)
      toggleRender(false)
      var reactor = {userId: subscriptionData.data.someoneReacted.userId, reactId: subscriptionData.data.someoneReacted.reactId}

      subscriptionData.data.someoneReacted.unreact? props.decrement({...actionProps, reactor: reactor}):props.increment({...actionProps, reactor: reactor})
      subscriptionData.data.someoneReacted.unreact? toggleRender(false):toggleRender(true)
    }
  })
if (render) {
  return ( <NewReact reactData={reactData} />)}
  else return null
}

export const NewReactIndicator = connect(mapStateToProps)(ConnectedNewReactIndicator)