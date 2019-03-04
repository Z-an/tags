import React from 'react'
import Headroom from 'react-headroom'
import { ActiveUsers } from './ActiveUsers'

const Header = (props) => (
  <Headroom upTolerance={25} style={{
    background: 'white',
    border: "thin outset",
  }}>
  <div className='header-feed'>
    <div className='btn'
      onClick={() => {window.location.href = "/select"}}
    >
      ⟵
    </div>
    <ActiveUsers merchantID={props.merchant.id}/>
  </div>
  </Headroom>
)

export default Header