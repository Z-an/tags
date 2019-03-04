import React, { useState, Fragment } from 'react'
import { Subscription, Mutation } from 'react-apollo'
import EmojiSelect from './EmojiSelect'
import IsVisible from 'react-is-visible' 
import { REACT_SUBSCRIPTION } from '../Queries'

import '../Styles/Feed.scss'

const Reactor = (props) => {
  const [reactsTotal, setReacts] = useState(props.reacts)
  console.log(props.merchantID, props.tagID)

  return (
    <Subscription
      subscription={REACT_SUBSCRIPTION}
      variables={{tagId: props.tagID, userId: "61usaCJd3YBqpmFOdbS8"}}
      shouldResubscribe={true}
      onSubscriptionData={() => { setReacts(reactsTotal + 1) }}>
        {({data, loading }) => (
          <div className='dynamic-reaction'>{!loading && data.someoneReacted.user.name}</div>
        )}
    </Subscription> 
  )
}

export default Reactor