import React, { useState, Fragment } from "react"
import UserIcon from './UserIcon'
import Reactor from './Reacts/Reactor'
import { Subscription } from 'react-apollo'
import { TopReact } from './Reacts/TopReact'
import { REACT_SUBSCRIPTION } from '../../Queries'
import IsVisible from 'react-is-visible' 
import EmojiSelect from './Reacts/EmojiSelect'
import {Reporter} from './Reporter'
import { ReactsTotal } from './Reacts/ReactsTotal'

import '../../Styles/Tag.scss'

interface ITagProps {
  tag: {
    id: string
    content: string
    reacts: number
    user: {
      id: string
      icon: string
      handle: string
    }
  }
  color: string
}

const Tag = (props: ITagProps) =>  {
  const {id, content, reacts, user} = props.tag
  const[totalReacts,setReacts] = useState(reacts)
  const color = props.color
  console.log(props)
    return(
      <Fragment>
        <div className='tag-container'>
          <div className='tag'>
            <div className={'tag-box '+color}>
              <div className={'tag-content '+color}>
                {content}
              </div>
            </div>
            <UserIcon color={color} user={user} />
            <Reactor reacts={reacts} tagID={id} color={color} />
            <Reporter />
            <TopReact tagId={id} reactsTotal={reacts} />
          </div>
        </div>
          <Subscription
            subscription={REACT_SUBSCRIPTION}
            variables={{tagId: id, userId: "haha"}}
            shouldResubscribe={true}
            onSubscriptionData={() => { setReacts(totalReacts+1)}}>
              {({data, loading }) => (
                <div className='dynamic-reaction'>{!loading && data.someoneReacted.user.name}</div>
              )}
          </Subscription> 
        </Fragment>
    )
}

export default Tag
