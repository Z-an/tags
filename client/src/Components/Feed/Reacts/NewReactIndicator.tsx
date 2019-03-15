import React, { useState } from 'react'
import { connect } from 'react-redux'
import { REACT_SUBSCRIPTION } from '../../../Subscriptions/index'
import { useSubscription } from 'react-apollo-hooks'
import '../../../Styles/Tag.css'
import { NewReact } from './NewReact'

const mapStateToProps = (state,ownProps) => {
  return ({ tagID: ownProps.tagID, merchant: state.merchant})
}

export const ConnectedNewReactIndicator = (props) => {
  const [render,toggleRender] = useState(false)
  const [reactData,setReact] = useState({reactId: '', user: {icon: '',name:''}})
  const actionProps = {tagID: props.tagID, age: props.merchant.age, rho: props.merchant.rho}
  const { data, error, loading } = useSubscription(REACT_SUBSCRIPTION, {
    variables: {tagId: props.tagID, userId: 'ahah'},
    onSubscriptionData: ({client,subscriptionData}) => {
      setReact(subscriptionData.data.someoneReacted)
      subscriptionData.data.someoneReacted.unreact? props.decrement(actionProps):props.increment(actionProps)
      toggleRender(true)
    }
  })
if (render) {return <NewReact reactData={reactData} /> }
  else return null
}

export const NewReactIndicator = connect(mapStateToProps)(ConnectedNewReactIndicator)