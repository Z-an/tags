import React, {Component} from 'react'
import { Mutation } from 'react-apollo'
import { REACT } from '../../../Queries'
import Emoji from './Emoji'

import { ReactComponent as Add} from '../../../Assets/Emoji/react-add.svg'

import '../../Styles/EmojiSelect.scss'

class EmojiSelect extends Component<any,any> {

  state = {
    emoji: '',
    open: false,
    reacted: false,
    react: '',
    emojiList: ['tongue','heart-eyes','shock','sleep','cry','angry']
  }

  setEmoji = (selected) => {this.setState({emoji: selected})}

  toggleOpen = (open) => {this.setState({open: open})}

  toggleReacted = (reacted) => {this.setState({reacted: reacted})}

  setReact = (react) => {
    this.setState({react: react})
  }

  clicker = () => {
    console.log('huh')
    this.toggleOpen(false)
    this.toggleReacted(true)
    this.setReact(this.state.emoji)
  }

  unclicker = () => {
    this.toggleReacted(false)
    this.setReact('')
  }

  mutationArgs = { userId: "61usaCJd3YBqpmFOdbS8"
  , merchantId: this.props.merchantId
  , tagId: this.props.tagId
  , reactId: this.state.emoji
  , unreact: this.state.reacted
  }

  render() {
    console.log(this.state)
    if (this.state.open) {
      return (
        <Mutation mutation={REACT}>
          { react =>
            <div className='emoji-select-container' onTouchEnd={() => react({variables: this.mutationArgs})} onClick={() => react({variables: this.mutationArgs})}>
              <div className='emoji-row' onMouseLeave={() => this.toggleOpen(false)}>
                {this.state.emojiList.map(emoji =>
                    <div onClick={() => this.clicker()} onMouseEnter={() => this.setEmoji(emoji)} onTouchStart={() => this.setEmoji(emoji)}><Emoji emoji={emoji} style='emoji'/></div>
                )}
              </div>
            </div>
          }
        </Mutation>
      )
    }

    else if (this.state.reacted) {
        return(<div className='react-add-container' onTouchStart={() => this.unclicker()} onClick={() => this.unclicker()}><Emoji style='emoji-selected' emoji={this.state.react}/></div>)     
    }

    else { 
      return (
        <div className='react-add-container' onClick={() => this.toggleOpen(true)} onMouseEnter={() => this.toggleOpen(true)} onTouchStart={() => this.toggleOpen(true)}>
          <Add className='react-add' />
        </div>
      )
    }
  }
}

export default EmojiSelect