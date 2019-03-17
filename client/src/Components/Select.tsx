import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setMerchant, reset } from '../Actions/index'
import ButtonBases from './Select/ButtonBases'
import { Query } from 'react-apollo'
import { GET_MERCHANTS } from '../Queries/index'
import '../Styles/Feed.css'
import Loading from './Loading'
import {CreatorPanel} from './Feed/Create/CreatorPanel'

function mapDispatchToProps(dispatch) {
  return { setMerchant: merchant => dispatch(setMerchant(merchant)),
          reset: payload => dispatch(reset(payload))}
}

class ConnectedSelect extends Component<any, any> {
  state = {
    highlighted: null,
    open: false
  }


  nullify = this.props.setMerchant(null)
  
  redirector = (now,merchant) => {
    if (now==='now') {
      this.props.setMerchant(merchant)
      window.location.href = `/${merchant.name}`
    }
    else if (this.state.highlighted === merchant.id) {
      this.props.setMerchant(merchant)
      window.location.href = `/${merchant.name}`
    } else { this.setState({highlighted: merchant.id}) }
  }

  toggle = () => {
    this.setState(prevState => {open: !prevState.open})
  }


  render() {
    return(      
      <Query query={GET_MERCHANTS}>
        {({ loading, error, data}) => {
          if (loading) return <div className='background'><div className='padding'><Loading /></div></div>
          if (error) return `Error! ${error.message}`
          console.log(data.merchants)
        
          return (
            <div className='background'>
            <ButtonBases merchants={data.merchants}
                         redirector={this.redirector}/>
            <div onClick={()=>this.toggle()}><CreatorPanel open={this.state.open} merchants={true}/></div>
            </div>
          )
        }}
      </Query>
    )
  }
}

const Select = connect(null, mapDispatchToProps)(ConnectedSelect)

export default Select