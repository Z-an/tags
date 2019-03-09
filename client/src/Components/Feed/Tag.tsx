import React, { useState, Fragment } from "react"
import UserIcon from './UserIcon'
import TopReact from './Reacts/TopReact'
import { REACT_SUBSCRIPTION } from '../../Subscriptions/index'
import Reporter from './Reporter'
import ReactsTotal from './Reacts/ReactsTotal'
import EmojiSelect from './Reacts/EmojiSelect'

import '../../Styles/Tag.scss'

interface ITagProps {
  tagID: string,
  color: string,
  content: string,
}

const Tag = (props: ITagProps) =>  {
  const id = props.tagID
  const color = props.color

  return(
    <div className='tag-container'>
      <div className='tag'>
        <div className={'tag-box '+color}>
          <div className={'tag-content '+color}>
            {props.content}
          </div>
        </div>
        <UserIcon tagID={id} color={color}/>
        <Reporter tagID={id}/>
        <TopReact tagID={id} />
        <ReactsTotal tagID={id} />
        <EmojiSelect tagID={id} />
      </div>
    </div>
    )
}

export default Tag
