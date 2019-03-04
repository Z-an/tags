import React, { Component } from 'react'
import ButtonBases from './Select/ButtonBases'
import { Query } from 'react-apollo'
import { GET_MERCHANTS } from './Queries'

class Select extends Component<any> {
  state = {
    highlighted: null
  }
  
  redirector = (props) => {
    if (this.state.highlighted === props.id) {
      window.location.href = `/${props.name}/${props.id}`
    } else { this.setState({highlighted: props.id}) }
  }

  render() {
    return(      
      <Query query={GET_MERCHANTS}>
        {({ loading, error, data}) => {
          if (loading) return "Loading..."
          if (error) return `Error! ${error.message}`
        
          return (
            <ButtonBases merchants={data.merchants}
                         redirector={this.redirector}/>
          )
        }}
      </Query>
    )
  }
}

export default Select