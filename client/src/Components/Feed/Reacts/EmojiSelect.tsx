import React, {Component} from 'react'
import { Mutation } from 'react-apollo'
import { REACT } from '../../../Queries'
import Emoji from './Emoji'

import { ReactComponent as Tongue } from '../../../Assets/Emoji/tongue.svg'
import { ReactComponent as Love } from '../../../Assets/Emoji/in-love.svg'
import { ReactComponent as Surprised } from '../../../Assets/Emoji/surprised.svg'
import { ReactComponent as Sleepy } from '../../../Assets/Emoji/sleepy.svg'
import { ReactComponent as Crying } from '../../../Assets/Emoji/crying.svg'
import { ReactComponent as Angry } from '../../../Assets/Emoji/angry.svg'
import { ReactComponent as Add} from '../../../Assets/Emoji/react-add.svg'

import '../../Styles/EmojiSelect.scss'

class EmojiSelect extends Component<any,any> {

  state = {
    emoji: '',
    open: false,
    reacted: false,
    react: '',
    emojiList: ['tongue','heart-eyes','shocked','sleep','cry','angry']
  }

  setEmoji = (selected) => {this.setState({emoji: selected})}

  toggleOpen = (open) => {this.setState({open: open})}

  toggleReacted = (reacted) => {this.setState({reacted: reacted})}

  setReact = (react) => {
    this.setState({react: react})
  }

  clicker = () => {
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
    if (this.state.open) {
      return (
        <Mutation mutation={REACT}>
          { react =>
            <div className='emoji-select-container' onTouchEnd={() => react({variables: this.mutationArgs})} onClick={() => react({variables: this.mutationArgs})}>
              <div className='emoji-row' onMouseLeave={() => this.toggleOpen(false)}>
                <Tongue className='emoji' onClick={() => this.clicker()} onMouseEnter={() => this.setEmoji('tongue')} onTouchStart={() => this.setEmoji('tongue')}/>
                <Love className='emoji' onClick={() => this.clicker()} onMouseEnter=  {() => this.setEmoji('heart-eyes')} onTouchStart={() => this.setEmoji('heart-eyes')}/>  
                <Surprised className='emoji' onClick={() => this.clicker()} onMouseEnter={() => this.setEmoji('shock')} onTouchStart={() => this.setEmoji('shock')}/>
                <Sleepy className='emoji' onClick={() => this.clicker()} onMouseEnter={() => this.setEmoji('sleep')} onTouchStart={() => this.setEmoji('sleep')}/>
                <Crying className='emoji' onClick={() => this.clicker()} onMouseEnter={() => this.setEmoji('cry')} onTouchStart={() => this.setEmoji('cry')}/>
                <Angry className='emoji' onClick={() => this.clicker()} onMouseEnter={() => this.setEmoji('angry')} onTouchStart={() => this.setEmoji('angry')}/>
              </div>
            </div>
          }
        </Mutation>
      )
    }

    else if (this.state.reacted) {
        return(<div className='react-add-container' ><Emoji className='emoji-selected' emoji={this.state.react} onTouchStart={() => this.unclicker()} onClick={() => this.unclicker()}/></div>)     
    }

    else { 
      return (
        <div className='react-add-container'>
          <Add className='react-add' onClick={() => this.toggleOpen(true)} onMouseEnter={() => this.toggleOpen(true)} onTouchStart={() => this.toggleOpen(true)}/>
        </div>
      )
    }
  }
}

export default EmojiSelect