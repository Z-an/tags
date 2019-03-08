import React, { useState, Fragment } from "react"
import UserIcon from './UserIcon'
import Reactor from './Reacts/Reactor'
import { Subscription } from 'react-apollo'
import TopReact from './Reacts/TopReact'
import { REACT_SUBSCRIPTION } from '../../Queries'
import IsVisible from 'react-is-visible' 
import EmojiSelect from './Reacts/EmojiSelect'
import {Reporter} from './Reporter'

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
        <Reactor tagID={id} color={color} />
        <Reporter />
        <TopReact tagID={id} />
      </div>
    </div>
    )
}

export default Tag
