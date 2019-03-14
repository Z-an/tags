import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { REACT_SUBSCRIPTION } from '../../Subscriptions/index'
import { Subscription } from 'react-apollo'
import { useSubscription } from 'react-apollo-hooks'
import '../../Styles/Tag.scss'
import Emoji from './Reacts/Emoji'
import { NewReact } from './NewReact'

export const NewReactIndicator = (props) => {
  const [render,toggleRender] = useState(false)
  const [reactData,setReact] = useState({reactId: '', user: {icon: '',name:''}})
  const { data, error, loading } = useSubscription(REACT_SUBSCRIPTION, {
    variables: {tagId: props.tagID, userId: 'ahah'},
    onSubscriptionData: ({client,subscriptionData}) => {
      console.log('hello')
      setReact(subscriptionData.data.someoneReacted)
      subscriptionData.data.someoneReacted.unreact? props.decrement(props.tagID):props.increment(props.tagID)
      toggleRender(true)
    }
  })
if (render) {return <NewReact reactData={reactData} /> }
  else return null
}

