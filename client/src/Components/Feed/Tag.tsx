import React, { useState, Fragment } from "react"
import UserIcon from './UserIcon'
import Reactor from './Reactor'
import { Subscription } from 'react-apollo'
import { Reactors } from './Reactors'
import { REACT_SUBSCRIPTION } from '../Queries'
import IsVisible from 'react-is-visible' 
import EmojiSelect from './EmojiSelect'

import '../Styles/Feed.scss'

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
  merchant: string
  color: string
}

const Tag = (props: ITagProps) =>  {
  const {id, content, reacts, user} = props.tag
  const merchantID = props.merchant
  const color = props.color

    return(
      <Fragment>
        <div className='tag-container'>
        <div className='tag'>
          <div className={'tag-content '+color}>{content}</div>
          <div className='tag-data'>
            <UserIcon user={user}/>
            <div className='reacts-total'>+{reacts}</div>
          </div>
          </div>
          <Reactor reacts={reacts} tagID={id} merchantID={merchantID} />
        </div>
        <EmojiSelect merchantId={merchantID} tagId={id} />
      </Fragment>
    )
}

export default Tag
