import React, { useState, Fragment } from 'react'

import EmojiSelect from './EmojiSelect'
import { Subscription } from 'react-apollo'
import { REACT_SUBSCRIPTION } from '../../../Queries'
import { ReactsTotal } from './ReactsTotal'
import IsVisible from 'react-is-visible'
import { Voter } from './Voter'
  
import '../../../Styles/Reactor.scss'

const Reactor: React.FC<any> = (props) => {
  const [reactsTotal, setReacts] = useState(props.reacts)

  const incrementReacts = () => {
    setReacts(reactsTotal+1)
  }

  const decrementReacts = () => {
    setReacts(reactsTotal-1)
  }

  return (
    <Fragment>
      <ReactsTotal total={reactsTotal}/>
      <EmojiSelect merchantId={props.merchantID} tagId={props.tagID} decrement={decrementReacts} increment={incrementReacts}/>
      <IsVisible>
      { isVisible => 
        isVisible?
          <Subscription
          subscription={REACT_SUBSCRIPTION}
          variables={{tagId: props.tagID, userId: "haha"}}
          shouldResubscribe={true}
          onSubscriptionData={() => { setReacts(reactsTotal + 1) }}>
            {({data, loading }) => (
              <div className='dynamic-reaction'>{!loading && data.someoneReacted.user.name}</div>
            )}
          </Subscription> 
          : null
        }
      </IsVisible>
    </Fragment>
  )
}

export default Reactor