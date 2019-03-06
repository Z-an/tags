import React, {PureComponent} from 'react'
import { GET_USER } from '../../../Queries'
import { Query } from 'react-apollo'

class ReactorIcon extends PureComponent<any> {
  render() {
    if (this.props.id !== null) {
    return (
      <Query query={GET_USER} variables={{id: this.props.id}} pollInterval={100000}>
        {({ loading, error, data}) => { 
          if (loading) return null
          else if (error) return `Error! ${error.message}`
          return (
            <img className='header-user-icon' src={data.user.icon} alt={data.user.name}/>
          )
        }}
    </Query>
    )
  } else { return(null)}
  }
}

export default ReactorIcon