import React, { Component } from 'react'
import ButtonBases from './ButtonBases'
import Button from "@material-ui/core/Button"
import Modal from './Modal'
import './MerchantSelect.css'
import getFirebaseData from './getData'
import { ReactComponent as Twitter} from './twitter.svg'
import Headroom from "react-headroom"
import ScrollToTop from "react-scroll-up"

class MerchantSelect extends Component {
  state = {
    userId: this.props.match.params.userId,
    merchants: [],
    modal: false,
    highlighted: ''
  }

  async componentDidMount() {
    console.log("firing in CDM")
    getFirebaseData("/merchants")
    .then(merchants => (merchants.json())
    .then(val => this.setState({merchants: val})))
    .catch(err => console.log(err))
  }

  toggleCreator = (props) => {
    this.setState({creator: false})
  }

  gameRedirect = (props) => {
    console.log(this.state.highlighted)
    if (this.state.highlighted === props.id) {
      window.location.href = "/game/"+props.id+'/'+props.name+'/'+this.state.userId
    } else {this.setState({highlighted: props.id})}
  }

  addMerchant = (props) => {
    console.log('adding merchant',props)
    fetch('/addMerchant',{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        creatorId: this.state.userId,
        content: props
      })
    })
    .then(newmerchant => newmerchant.json())
    .then(val => this.setState({merchants: [val].concat(this.state.merchants)}))
    .catch(err => console.log(err))

    this.setState({creator: false})
  }

  render() {
    console.log('state: ',this.state.creator)
    return (
      <div>
      <Headroom upTolerance={75} style={{
          background: 'white',
          border: "thin outset",
        }}>
        <div className='navbar-game'>
          <Button
            onClick={() => {window.location.href = "/"}}
          >
            ⟵
          </Button>
          <ScrollToTop showUnder={20} style={
            { position: 'relative',
              top: "6px",
              right: "0",
              height: "100px",
              transitionDuration: '0.5s',
              transitionTimingFunction: 'linear',
              transitionDelay: '0s'
            }}>
              <Button color={"secondary"}>
                top
              </Button>
          </ScrollToTop>
          <Button
            onClick={() => {this.onRefresh()}}
          >
            ⟳
          </Button>
        </div>
      </Headroom>
        <div>
          <ButtonBases
            merchants = {this.state.merchants}
            userId = {this.state.userId}
            redirector={this.gameRedirect}
          />
        </div>
        <div className="bottom">
          <div className="circle" onClick={()=> this.setState({creator: true})}>
            <div className="creator">
              <Twitter/>
            </div>
          </div>
        </div>
        <div>
        <Modal adder={this.addMerchant}
                open={this.state.creator}
                placeholder={""}
                toggler={this.toggleCreator}
/>
        </div>
      </div>
  )}
}

export default MerchantSelect;
