import React, {useState} from 'react'
import { useMutation } from 'react-apollo-hooks'
import { connect } from 'react-redux'
import { REACT } from '../../../Mutations/index'
import Emoji from './Emoji'
import {increment,decrement} from '../../../Actions/index'

import { ReactComponent as Add} from '../../../Assets/Emoji/react-add.svg'

import '../../../Styles/EmojiSelect.scss'
import { stat } from 'fs';

const mapStateToProps = (state,ownProps) => {
  return {merchantID: state.merchant.id
        , tagID: ownProps.tagID
        , userID: state.user.id
        , emojiList: ['tongue','heart-eyes','shock','sleep','cry','angry']
      }
}

function mapDispatchToProps(dispatch) {
  return { increment: tagID => { dispatch(increment(tagID))}
          , decrement: tagID => { dispatch(decrement(tagID))}}
}

const ConnectedEmojiSelect: React.FC<any> = ({merchantID, tagID, userID, emojiList, increment, decrement}) => {
  const[emoji,setEmoji] = useState('heart-eyes')
  const[open,toggleOpen] = useState(false)
  const[reacted,toggleReacted] = useState(false)
  const[react,setReact] = useState('')

  const clicker = () => {
    toggleOpen(false)
    toggleReacted(true)
    setReact(emoji)
    increment(tagID)
  }
  
  const toggleReact = useMutation(REACT, {variables: { userId: userID
                                , merchantId: merchantID
                                , tagId: tagID
                                , reactId: emoji
                                , unreact: reacted }})

  const unclicker = () => {
    toggleReacted(false)
    decrement(tagID)
    setReact('')
  }

  if (open) {
    return (
      <div className='emoji-select-container' onTouchEnd={() => toggleReact()} onClick={() => toggleReact()}>
        <div className='emoji-row' onMouseLeave={() => toggleOpen(false)}>
          {emojiList.map(emoji =>
              <div key={emoji} onClick={() => clicker()} onMouseEnter={() => setEmoji(emoji)} onTouchStart={() => setEmoji(emoji)}>
                <Emoji emoji={emoji} style='emoji'/>
              </div>
          )}
        </div>
      </div>
    )
  }
  else if (reacted) {
      return(
      <div className='react-add-container' onTouchStart={() => unclicker()} onClick={() => unclicker()}>
        <Emoji style='emoji-selected' emoji={react}/>
      </div>)     
  }
  else {
    return (
      <div className='react-add-container' onClick={() => toggleOpen(true)}>
        <Add className='react-add' />
      </div>
    )
  }
}


const EmojiSelect = connect(mapStateToProps)(ConnectedEmojiSelect)

export default EmojiSelect