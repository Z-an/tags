import React, {PureComponent} from 'react'

import { ReactComponent as Eclipse} from '../Assets/Eclipse.svg'

class Loading extends PureComponent<any> {
  render() {
    return (<Eclipse />)
  }
}

export default Loading