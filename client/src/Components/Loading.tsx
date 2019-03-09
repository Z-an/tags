import React, {PureComponent} from 'react'

import { ReactComponent as Eclipse} from '../Assets/Eclipse.svg'

class Loading extends PureComponent<any> {
  style = this.props.style
  render() {
    return (<Eclipse className={this.style}/>)
  }
}

export default Loading