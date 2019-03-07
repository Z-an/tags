import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setMerchant } from '../Actions/index'
import ButtonBases from './Select/ButtonBases'
import { Query } from 'react-apollo'
import { GET_MERCHANTS } from '../Queries'

function mapDispatchToProps(dispatch) {
  return {
    setMerchant: merchant => dispatch(setMerchant(merchant))
  };
}

class ConnectedSelect extends Component<any> {
  state = {
    highlighted: null
  }
  
  redirector = (now,merchant) => {
    if (now==='now') {
      this.props.setMerchant(merchant)
      window.location.href = `/${merchant.name}/${merchant.id}`
    }
    else if (this.state.highlighted === merchant.id) {
      this.props.setMerchant(merchant)
      window.location.href = `/${merchant.name}/${merchant.id}`
    } else { this.setState({highlighted: merchant.id}) }
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

const Select = connect(null, mapDispatchToProps)(ConnectedSelect)

export default Select