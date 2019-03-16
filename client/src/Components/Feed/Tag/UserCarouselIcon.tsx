import React, { PureComponent } from 'react'
import { GET_USER } from '../../../Queries/index'
import { Query } from 'react-apollo'
import Loading from '../../Loading'
import '../../../Styles/Tag.css'

class UserCarouselIcon extends PureComponent<any>{
    render() {
        if (this.props.user===[null] || this.props.user===null) { return null }
        console.log(this.props.style)
        return (
            <Query query={GET_USER} variables={{id: this.props.user.userId}}>
                {({ loading, error, data}) => {
                    if (loading) return <Loading style={'reactor-loading'}/>
                    else if (error) return null
                    else return (
                        <div> 
                            <img className={this.props.style} src={data.user.icon} alt={data.user.name}/>
                        </div>
                    )
                }}  
            </Query>
        )
    }
}

export default UserCarouselIcon