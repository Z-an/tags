import React, { PureComponent } from 'react'
import '../../../Styles/Feed.css'

class ActiveUserIcon extends PureComponent<any,any>{
    render() {
        return (
            <div onClick={() => alert(this.props.user.name)}>
                <img className= 'header-actives' src={this.props.user.icon} alt={this.props.user.handle}/>
            </div>
        )
    }
}

export default ActiveUserIcon