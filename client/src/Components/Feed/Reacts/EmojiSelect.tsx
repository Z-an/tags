import React, {useState} from 'react'
import { useMutation } from 'react-apollo-hooks'
import { connect } from 'react-redux'
import { REACT } from '../../../Mutations/index'
import Emoji from './Emoji'
import {increment,decrement} from '../../../Actions/index'

import { ReactComponent as Add} from '../../../Assets/Emoji/react-add.svg'

import '../../../Styles/EmojiSelect.css'

const mapStateToProps = (state,ownProps) => {
  let reacts = state.tags[ownProps.tagID].reactors.map( doc => doc.reactors.includes(state.user.id)? doc.react:false)
  let filtered = reacts.filter(Boolean)
  let voted = filtered[0] as [string] || null
  console.log(voted)

  return { openModal: state.openModal
        , merchant: state.merchant
        , tagID: ownProps.tagID
        , userID: state.user.id
        , emojiList: [,'angry','cry','shock','heart-eyes','tongue','fire']
        , voted: voted
      }
}

function mapDispatchToProps(dispatch) {
  return { increment: tagID => { dispatch(increment(tagID))}
          , decrement: tagID => { dispatch(decrement(tagID))}}
}

const ConnectedEmojiSelect: React.FC<any> = ({openModal, voted, merchant, tagID, userID, emojiList, increment, decrement}) => {
  const[emoji,setEmoji] = useState('heart-eyes')
  const[open,toggleOpen] = useState(false)
  const[reacted,toggleReacted] = useState(voted===null? false:true)
  const[react,setReact] = useState(voted===null? '':voted)

  const clicker = () => {
    toggleOpen(false)
    toggleReacted(true)
    setReact(emoji)
    increment({tagID: tagID, age: merchant.age, rho: merchant.rho, reactor: {userId: userID, reactId: emoji}})
  }

  
  const toggleReact = useMutation(REACT, {variables: { userId: userID
                                , merchantId: merchant.id
                                , tagId: tagID
                                , reactId: emoji
                                , unreact: reacted }})

  const unclicker = () => {
    toggleReacted(false)
    decrement({tagID: tagID, age: merchant.age, rho: merchant.rho, reactor: {userId: userID, reactId: emoji}})
    setReact('')
  }

  if (open) {
    return (
      <div className='emoji-select-container' onClick={() => toggleReact()}>
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
  else if (reacted && (react!=='up' && react!=='')) {
    console.log('so confused')
      return(
        <div className='react-add-container' onClick={() => unclicker()}>
          <div onClick={()=>toggleReact()}>
            <Emoji style='emoji-selected' emoji={react} />
          </div>
        </div>)     
  }
  else {
    return (
      <div className='react-add-container' onClick={() => toggleOpen(true)}>
        <Add className='react-add' onClick={() => toggleOpen(true)}/>
      </div>
    )
  }
}


const EmojiSelect = connect(mapStateToProps)(ConnectedEmojiSelect)

export default EmojiSelect