import React from 'react'

import { ReactComponent as Cool } from './assets2/cool.svg'
import { ReactComponent as Tongue } from './assets2/tongue.svg'
import { ReactComponent as Cry } from './assets2/crying.svg'
import { ReactComponent as Sleepy } from './assets2/sleepy.svg'
import { ReactComponent as Surprised } from './assets2/surprised.svg'
import { ReactComponent as Love } from './assets2/in-love.svg'
import { ReactComponent as Angry} from './assets2/angry.svg'

function Emoji(props) {
  if (props.emoji==="angry") {
    return(<Angry onClick={func => props.reactor('angry')}/>)
  } else if (props.emoji==="cry") {
    return(<Cry onClick={func => props.reactor('cry')}/>)
  } else if (props.emoji==="sleep") {
    return(<Sleepy onClick={func => props.reactor('sleep')}/>)
  } else if (props.emoji==="shocked") {
    return(<Surprised onClick={func => props.reactor('shocked')}/>)
  } else if (props.emoji==="tongue") {
    return(<Tongue onClick={func => props.reactor('tongue')}/>)
  } else if (props.emoji==="cool") {
    return(<Cool onClick={func => props.reactor('cool')}/>)
  } else if (props.emoji==="love") {
    return(<Love onClick={func => props.reactor('love')}/>)
  }
}

export default Emoji
