import React, {useState} from 'react'
import { TAG_SUBSCRIPTION } from '../../Subscriptions'
import { TAG } from '../../Queries'
import { useSubscription, useQuery } from 'react-apollo-hooks'
import { connect } from 'react-redux'
import { newTag } from '../../Actions/index'
import Loading from '../Loading'

function mapDispatchToProps(dispatch) {
  return { newTag: tag => dispatch(newTag(tag))}
}

const ConnectedNewTag = (props) => {
  console.log('okay okay')
  const { data, error, loading } = useQuery(TAG, {
    variables: {id: props.tagID}
  })
  if (loading) { return <Loading /> }
  else if (error) { return null }
  else {props.newTag(data.tag)}
  console.log(data)
  return null
}

export const TagListener = (props) => {
  const [fetching,setFetcher] = useState(false)
  const [tagID, setTagID] = useState('')
  const { data, error,loading } = useSubscription(TAG_SUBSCRIPTION, {
    variables: {merchantId: props.merchantID},
    onSubscriptionData: (({client,subscriptionData}) => {
      console.log(subscriptionData.data.tagCreated.id)
      setTagID(subscriptionData.data.tagCreated.id)
      setFetcher(true)
    })})
  if (fetching) {
    return <NewTag tagID={tagID} newTag={newTag}/>
  setFetcher(false)}
   else return null
}

const NewTag = connect(null,mapDispatchToProps)(ConnectedNewTag)