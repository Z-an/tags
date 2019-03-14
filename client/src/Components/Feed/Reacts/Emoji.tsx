import React, { PureComponent } from 'react'

import { ReactComponent as Tongue } from '../../../Assets/Emoji/tongue.svg'
import { ReactComponent as Love } from '../../../Assets/Emoji/in-love.svg'
import { ReactComponent as Surprised } from '../../../Assets/Emoji/surprised.svg'
import { ReactComponent as Sleepy } from '../../../Assets/Emoji/sleepy.svg'
import { ReactComponent as Crying } from '../../../Assets/Emoji/crying.svg'
import { ReactComponent as Angry } from '../../../Assets/Emoji/angry.svg'
import { ReactComponent as Up } from '../../../Assets/Emoji/arrow-up.svg'

class Emoji extends PureComponent<any> {
    emoji = this.props.emoji
    style = this.props.style
    render() {
        console.log(this.emoji)
        if (this.emoji==='tongue') {
            return (<Tongue className={this.style}/>)
        } else if (this.emoji==='heart-eyes') {
            return (<Love className={this.style}/>)
        } else if (this.emoji==='shock') {
            return (<Surprised className={this.style}/>)
        } else if (this.emoji==='sleep') {
            return (<Sleepy className={this.style}/>)
        } else if (this.emoji==='cry') {
            return (<Crying className={this.style}/>)
        } else if (this.emoji==='angry') {
            return (<Angry className={this.style}/>)
        } else if (this.emoji==='up') {
            return (<Up className={this.style}/>)
        } else return null
    }
}

export default Emoji