import React, { PureComponent } from 'react'

import { ReactComponent as Tongue } from '../../../Assets/Emoji/tongue.svg'
import { ReactComponent as Love } from '../../../Assets/Emoji/in-love.svg'
import { ReactComponent as Surprised } from '../../../Assets/Emoji/surprised.svg'
import { ReactComponent as Sleepy } from '../../../Assets/Emoji/sleepy.svg'
import { ReactComponent as Crying } from '../../../Assets/Emoji/crying.svg'
import { ReactComponent as Angry } from '../../../Assets/Emoji/angry.svg'

interface Props {
    emoji: string
}

class Emoji extends PureComponent<any> {
    emoji = this.props.emoji
    render() {
        if (this.emoji==='tongue') {
            return (<Tongue />)
        } else if (this.emoji==='heart-eyes') {
            return (<Love />)
        } else if (this.emoji==='shocked') {
            return (<Surprised />)
        } else if (this.emoji==='sleep') {
            return (<Sleepy />)
        } else if (this.emoji==='cry') {
            return (<Crying />)
        } else if (this.emoji==='angry') {
            return (<Angry />)
        } else return null
    }
}

export default Emoji