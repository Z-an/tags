import React, { PureComponent } from 'react'
import '../Styles/Feed.scss'

class UserIcon extends PureComponent<any,any>{
    render() {
        return (
            <div onClick={() => alert(this.props.user.name)}>
                <img className= 'tag-user-icon' src={this.props.user.icon} alt={this.props.user.handle}/>
            </div>
        )
    }
}

export default UserIcon