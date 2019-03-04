import React, {Component} from 'react'
import { Mutation } from 'react-apollo'
import { useMutation } from 'react-apollo-hooks'

import { ReactComponent as Tongue } from '../../Assets/Emoji/tongue.svg'
import { ReactComponent as Love } from '../../Assets/Emoji/in-love.svg'
import { ReactComponent as Surprised } from '../../Assets/Emoji/surprised.svg'
import { ReactComponent as Sleepy } from '../../Assets/Emoji/sleepy.svg'
import { ReactComponent as Crying } from '../../Assets/Emoji/crying.svg'
import { ReactComponent as Angry } from '../../Assets/Emoji/angry.svg'
import { ReactComponent as Add} from '../../Assets/Emoji/react-add.svg'

import '../Styles/Feed.scss'

class EmojiSelect extends Component<any,any> {

  state = {
    emoji: '',
    open: false,
    reacted: false,
    react: ''
  }

  setEmoji = (selected) => {this.setState({emoji: selected})}

  toggle = (open) => {this.setState({open: open})}

  toggleReacted = (reacted) => (this.setState({reacted: reacted}))

  setReact = (react) => {
    this.setState(prevState => ({reacted: !prevState.reacted}))
    this.setState({react: react})
  }

  clicker = () => {
    this.toggle(false)
    this.toggleReacted(true)
    this.setReact(this.state.emoji)
  }

  unClicker = () => {
    this.toggleReacted(false)
    this.setReact('')
  }

  mutationArgs = { userId: "61usaCJd3YBqpmFOdbS8"
  , merchantId: this.props.merchantId
  , tagId: this.props.tagId
  , reactId: this.state.emoji
  }

  render() {
  console.log(this.state)
  if (this.state.open) {
    return (
      <Mutation mutation={REACT}>
        { react =>
          <div onMouseLeave={() => react({variables: this.mutationArgs})} onClick={() => react({variables: this.mutationArgs})}>
            <div className='emoji-row' onClick={() => this.clicker()} onMouseLeave={() => this.toggle(false)}>
              <Tongue className='emoji' onClick={() => this.clicker()} onMouseEnter={() => this.setEmoji('tongue')}/>
              <Love className='emoji' onClick={() => this.clicker()} onMouseEnter=  {() => this.setEmoji('heart-eyes')}/>  
              <Surprised className='emoji' onClick={() => this.clicker()} onMouseEnter={() => this.setEmoji('shock')}/>
              <Sleepy className='emoji' onClick={() => this.clicker()} onMouseEnter={() => this.setEmoji('sleep')}/>
              <Crying className='emoji' onClick={() => this.clicker()} onMouseEnter={() => this.setEmoji('cry')}/>
              <Angry className='emoji' onClick={() => this.clicker()} onMouseEnter={() => this.setEmoji('angry')}/>
            </div>
          </div>
        }
      </Mutation>
    )
  }

  else if (this.state.reacted) {
    if (this.state.react === 'tongue') {
      return(<Tongue className='emoji-selected' />)     
    } else if (this.state.react === 'heart-eyes') {
      return(<Love className='emoji-selected' />) 
    } else if (this.state.react === 'shock') {
      return(<Surprised className='emoji-selected' />)
    } else if (this.state.react === 'sleep') {
      return(<Sleepy className='emoji-selected' />)
    } else if (this.state.react === 'cry') {
      return(<Crying className='emoji-selected' />)
    } else if (this.state.react === 'angry') {
      return(<Angry className='emoji-selected' />)
    }
  }

  else { 
    return (
      <div className='emoji-container' onMouseEnter={() => this.toggle(true)}>
        <Add className='react-add' />
      </div>
    )
  }}
}

export default EmojiSelect