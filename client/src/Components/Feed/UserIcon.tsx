import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import '../../Styles/Feed.scss'

const mapStateToProps = (state,ownProps) => {
    let tagID: string = ownProps.tagID
    return {user: state.tags[tagID].user}
}

class ConnectedUserIcon extends PureComponent<any,any>{
    render() {
        return (
            <div onClick={() => alert(this.props.user.name)}>
                <img className={'tag-user-icon '+this.props.color} src={this.props.user.icon} alt={this.props.user.handle}/>
            </div>
        )
    }
}

const UserIcon = connect(mapStateToProps)(ConnectedUserIcon)

export default UserIcon